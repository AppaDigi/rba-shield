import type {
  PortalRole,
  RequestCategory,
  RequestStatus,
  SenderType,
} from "@/lib/supabase/database.types";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type RequestListItem = {
  id: string;
  category: RequestCategory;
  description: string;
  status: RequestStatus;
  created_at: string;
  updated_at: string;
  supporting_links: string[];
  claimed_attorney_id: string | null;
  member: {
    id: string;
    name: string;
    username: string;
  };
  claimedAttorney: {
    id: string;
    name: string;
  } | null;
  attachmentCount: number;
  lastPublicMessageAt: string | null;
};

export type RequestAttachment = {
  id: string;
  request_id: string;
  message_id: string | null;
  file_name: string;
  file_type: string | null;
  uploaded_by_role: SenderType;
  created_at: string;
};

export type RequestMessage = {
  id: string;
  request_id: string;
  sender_type: SenderType;
  sender_id: string | null;
  message: string;
  is_internal_note: boolean;
  created_at: string;
  sender_name: string;
};

export type RequestDetail = {
  request: RequestListItem;
  attachments: RequestAttachment[];
  messages: RequestMessage[];
};

type AidRequestRow = {
  id: string;
  category: RequestCategory;
  description: string;
  status: RequestStatus;
  created_at: string;
  updated_at: string;
  supporting_links: string[];
  claimed_attorney_id: string | null;
  members: { id: string; name: string; username: string } | null;
  attorneys: { id: string; name: string } | null;
};

function dedupe(values: Array<string | null | undefined>) {
  return Array.from(new Set(values.filter(Boolean))) as string[];
}

async function mapMessageSenderNames(messages: Array<{
  sender_id: string | null;
  sender_type: SenderType;
}>) {
  const memberIds = dedupe(
    messages
      .filter((message) => message.sender_type === "member")
      .map((message) => message.sender_id),
  );
  const attorneyIds = dedupe(
    messages
      .filter((message) => message.sender_type === "attorney")
      .map((message) => message.sender_id),
  );

  const supabase = await createServerSupabaseClient();
  const [memberResult, attorneyResult] = await Promise.all([
    memberIds.length
      ? supabase.from("members").select("id, name").in("id", memberIds)
      : Promise.resolve({ data: [] as Array<{ id: string; name: string }> }),
    attorneyIds.length
      ? supabase.from("attorneys").select("id, name").in("id", attorneyIds)
      : Promise.resolve({ data: [] as Array<{ id: string; name: string }> }),
  ]);

  const memberMap = new Map(
    (memberResult.data ?? []).map((member) => [member.id, member.name]),
  );
  const attorneyMap = new Map(
    (attorneyResult.data ?? []).map((attorney) => [attorney.id, attorney.name]),
  );

  return {
    memberMap,
    attorneyMap,
  };
}

async function fetchAttachmentsByRequestIds(requestIds: string[]) {
  if (!requestIds.length) {
    return new Map<string, RequestAttachment[]>();
  }

  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("request_attachments")
    .select(
      "id, request_id, message_id, file_name, file_type, uploaded_by_role, created_at",
    )
    .in("request_id", requestIds)
    .order("created_at", { ascending: false });

  const grouped = new Map<string, RequestAttachment[]>();

  for (const attachment of (data ?? []) as RequestAttachment[]) {
    const existing = grouped.get(attachment.request_id) ?? [];
    existing.push(attachment);
    grouped.set(attachment.request_id, existing);
  }

  return grouped;
}

async function fetchMessagesByRequestIds(
  requestIds: string[],
  includeInternalNotes: boolean,
) {
  if (!requestIds.length) {
    return new Map<string, RequestMessage[]>();
  }

  const supabase = await createServerSupabaseClient();
  let query = supabase
    .from("request_messages")
    .select(
      "id, request_id, sender_type, sender_id, message, is_internal_note, created_at",
    )
    .in("request_id", requestIds)
    .order("created_at", { ascending: true });

  if (!includeInternalNotes) {
    query = query.eq("is_internal_note", false);
  }

  const { data } = await query;
  const rows = (data ?? []) as Array<Omit<RequestMessage, "sender_name">>;
  const senderMaps = await mapMessageSenderNames(rows);
  const grouped = new Map<string, RequestMessage[]>();

  for (const row of rows) {
    const senderName =
      row.sender_type === "member"
        ? senderMaps.memberMap.get(row.sender_id ?? "") ?? "Member"
        : row.sender_type === "attorney"
          ? senderMaps.attorneyMap.get(row.sender_id ?? "") ?? "Shield Attorney"
          : "System";

    const existing = grouped.get(row.request_id) ?? [];
    existing.push({ ...row, sender_name: senderName });
    grouped.set(row.request_id, existing);
  }

  return grouped;
}

async function fetchRequestsBase(selectOwnOnly: boolean, userId?: string) {
  const supabase = await createServerSupabaseClient();
  let query = supabase
    .from("aid_requests")
    .select(
      "id, category, description, status, created_at, updated_at, supporting_links, claimed_attorney_id, members!aid_requests_member_id_fkey(id, name, username), attorneys!aid_requests_claimed_attorney_id_fkey(id, name)",
    )
    .order("created_at", { ascending: false });

  if (selectOwnOnly && userId) {
    query = query.eq("member_id", userId);
  }

  const { data } = await query;
  return (data ?? []) as unknown as AidRequestRow[];
}

export async function getMemberDashboardRequests(userId: string) {
  const requests = await fetchRequestsBase(true, userId);
  const requestIds = requests.map((request) => request.id);
  const [attachmentsByRequestId, messagesByRequestId] = await Promise.all([
    fetchAttachmentsByRequestIds(requestIds),
    fetchMessagesByRequestIds(requestIds, false),
  ]);

  return requests.map((request) => ({
    id: request.id,
    category: request.category,
    description: request.description,
    status: request.status,
    created_at: request.created_at,
    updated_at: request.updated_at,
    supporting_links: request.supporting_links ?? [],
    claimed_attorney_id: request.claimed_attorney_id,
    member: request.members ?? { id: userId, name: "Member", username: "member" },
    claimedAttorney: request.attorneys,
    attachmentCount: attachmentsByRequestId.get(request.id)?.length ?? 0,
    lastPublicMessageAt:
      messagesByRequestId.get(request.id)?.at(-1)?.created_at ?? null,
  })) satisfies RequestListItem[];
}

export async function getAttorneyDashboardRequests() {
  const requests = await fetchRequestsBase(false);
  const requestIds = requests.map((request) => request.id);
  const [attachmentsByRequestId, messagesByRequestId] = await Promise.all([
    fetchAttachmentsByRequestIds(requestIds),
    fetchMessagesByRequestIds(requestIds, true),
  ]);

  return requests.map((request) => ({
    id: request.id,
    category: request.category,
    description: request.description,
    status: request.status,
    created_at: request.created_at,
    updated_at: request.updated_at,
    supporting_links: request.supporting_links ?? [],
    claimed_attorney_id: request.claimed_attorney_id,
    member: request.members ?? { id: "", name: "Member", username: "" },
    claimedAttorney: request.attorneys,
    attachmentCount: attachmentsByRequestId.get(request.id)?.length ?? 0,
    lastPublicMessageAt:
      messagesByRequestId.get(request.id)?.at(-1)?.created_at ?? null,
  })) satisfies RequestListItem[];
}

export async function getRequestDetail(
  requestId: string,
  role: PortalRole,
): Promise<RequestDetail | null> {
  const supabase = await createServerSupabaseClient();
  const { data: request } = await supabase
    .from("aid_requests")
    .select(
      "id, category, description, status, created_at, updated_at, supporting_links, claimed_attorney_id, members!aid_requests_member_id_fkey(id, name, username), attorneys!aid_requests_claimed_attorney_id_fkey(id, name)",
    )
    .eq("id", requestId)
    .single();

  const typedRequest = request as unknown as AidRequestRow | null;

  if (!typedRequest) {
    return null;
  }

  const [attachmentsByRequestId, messagesByRequestId] = await Promise.all([
    fetchAttachmentsByRequestIds([requestId]),
    fetchMessagesByRequestIds([requestId], role !== "member"),
  ]);

  return {
    request: {
      id: typedRequest.id,
      category: typedRequest.category,
      description: typedRequest.description,
      status: typedRequest.status,
      created_at: typedRequest.created_at,
      updated_at: typedRequest.updated_at,
      supporting_links: typedRequest.supporting_links ?? [],
      claimed_attorney_id: typedRequest.claimed_attorney_id,
      member: typedRequest.members ?? { id: "", name: "Member", username: "" },
      claimedAttorney: typedRequest.attorneys,
      attachmentCount: attachmentsByRequestId.get(requestId)?.length ?? 0,
      lastPublicMessageAt:
        messagesByRequestId.get(requestId)?.at(-1)?.created_at ?? null,
    },
    attachments: attachmentsByRequestId.get(requestId) ?? [],
    messages: messagesByRequestId.get(requestId) ?? [],
  };
}
