"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  REQUEST_CATEGORY_OPTIONS,
  REQUEST_STATUS_OPTIONS,
} from "@/lib/portal/constants";
import { getPortalContext } from "@/lib/portal/auth";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type {
  RequestCategory,
  RequestStatus,
  SenderType,
} from "@/lib/supabase/database.types";

const STORAGE_BUCKET = "request-attachments";

function parseLinks(rawValue: FormDataEntryValue | null) {
  if (typeof rawValue !== "string") {
    return [];
  }

  return rawValue
    .split("\n")
    .map((value) => value.trim())
    .filter(Boolean);
}

function isAllowedCategory(value: string): value is RequestCategory {
  return REQUEST_CATEGORY_OPTIONS.some((option) => option.value === value);
}

function isAllowedStatus(value: string): value is RequestStatus {
  return REQUEST_STATUS_OPTIONS.some((option) => option.value === value);
}

async function uploadRequestFiles(params: {
  requestId: string;
  files: File[];
  uploadedBy: string;
  uploadedByRole: SenderType;
  messageId?: string;
}) {
  if (!params.files.length) {
    return;
  }

  const admin = createAdminSupabaseClient();
  const attachmentRows = [];

  for (const file of params.files) {
    if (!file.size) {
      continue;
    }

    const safeName = file.name.replaceAll(/[^a-zA-Z0-9._-]/g, "-");
    const storagePath = `${params.requestId}/${crypto.randomUUID()}-${safeName}`;
    const { error: uploadError } = await admin.storage
      .from(STORAGE_BUCKET)
      .upload(storagePath, file, {
        contentType: file.type || undefined,
        upsert: false,
      });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    attachmentRows.push({
      request_id: params.requestId,
      message_id: params.messageId ?? null,
      file_name: file.name,
      file_path: storagePath,
      file_url: null,
      file_type: file.type || null,
      uploaded_by: params.uploadedBy,
      uploaded_by_role: params.uploadedByRole,
    });
  }

  if (attachmentRows.length) {
    const { error: insertError } = await admin
      .from("request_attachments")
      .insert(attachmentRows);

    if (insertError) {
      throw new Error(insertError.message);
    }
  }
}

async function ensureOwnedMemberRequest(requestId: string, memberId: string) {
  const supabase = await createServerSupabaseClient();
  const { data: request } = await supabase
    .from("aid_requests")
    .select("id, member_id, status, claimed_attorney_id")
    .eq("id", requestId)
    .eq("member_id", memberId)
    .single();

  if (!request) {
    throw new Error("Request not found.");
  }

  return request;
}

async function ensureAttorneyManageableRequest(
  requestId: string,
  attorneyId: string,
) {
  const supabase = await createServerSupabaseClient();
  const { data: request } = await supabase
    .from("aid_requests")
    .select("id, claimed_attorney_id, status")
    .eq("id", requestId)
    .single();

  if (!request) {
    throw new Error("Request not found.");
  }

  if (request.claimed_attorney_id && request.claimed_attorney_id !== attorneyId) {
    throw new Error("This request is already claimed by another attorney.");
  }

  return request;
}

export async function createAidRequestAction(formData: FormData) {
  const context = await getPortalContext("member");
  const category = formData.get("category");
  const description = formData.get("description");
  const supportingLinks = parseLinks(formData.get("supporting_links"));
  const files = formData
    .getAll("attachments")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  if (typeof category !== "string" || !isAllowedCategory(category)) {
    throw new Error("Choose a request category.");
  }

  if (typeof description !== "string" || description.trim().length < 20) {
    throw new Error("Please give a fuller description of the legal need.");
  }

  const supabase = await createServerSupabaseClient();
  const { data: createdRequest, error } = await supabase
    .from("aid_requests")
    .insert({
      member_id: context.userId,
      category,
      description: description.trim(),
      supporting_links: supportingLinks,
    })
    .select("id")
    .single();

  if (error || !createdRequest) {
    throw new Error(error?.message ?? "Unable to create the request.");
  }

  await uploadRequestFiles({
    requestId: createdRequest.id,
    files,
    uploadedBy: context.userId,
    uploadedByRole: "member",
  });

  revalidatePath("/dashboard/member");
  revalidatePath(`/dashboard/member/requests/${createdRequest.id}`);
  redirect(`/dashboard/member/requests/${createdRequest.id}`);
}

export async function postMemberMessageAction(formData: FormData) {
  const context = await getPortalContext("member");
  const requestId = formData.get("request_id");
  const message = formData.get("message");
  const returnTo = formData.get("return_to");
  const files = formData
    .getAll("attachments")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  if (
    typeof requestId !== "string" ||
    typeof message !== "string" ||
    typeof returnTo !== "string"
  ) {
    throw new Error("Missing request detail.");
  }

  await ensureOwnedMemberRequest(requestId, context.userId);

  if (message.trim().length < 2 && !files.length) {
    throw new Error("Add a message or an attachment before sending.");
  }

  const supabase = await createServerSupabaseClient();
  let createdMessageId: string | undefined;

  if (message.trim().length >= 2) {
    const { data: createdMessage, error } = await supabase
      .from("request_messages")
      .insert({
        request_id: requestId,
        sender_type: "member",
        sender_id: context.userId,
        message: message.trim(),
      })
      .select("id")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    createdMessageId = createdMessage?.id;
  }

  await uploadRequestFiles({
    requestId,
    files,
    uploadedBy: context.userId,
    uploadedByRole: "member",
    messageId: createdMessageId,
  });

  revalidatePath("/dashboard/member");
  revalidatePath(returnTo);
  redirect(returnTo);
}

export async function claimRequestAction(formData: FormData) {
  const context = await getPortalContext("attorney");
  const requestId = formData.get("request_id");
  const returnTo = formData.get("return_to");

  if (typeof requestId !== "string" || typeof returnTo !== "string") {
    throw new Error("Missing request details.");
  }

  await ensureAttorneyManageableRequest(requestId, context.userId);

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase
    .from("aid_requests")
    .update({
      claimed_attorney_id: context.userId,
      status: "claimed",
    })
    .eq("id", requestId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/attorney");
  revalidatePath(returnTo);
  redirect(returnTo);
}

export async function updateRequestStatusAction(formData: FormData) {
  const context = await getPortalContext("attorney");
  const requestId = formData.get("request_id");
  const status = formData.get("status");
  const returnTo = formData.get("return_to");

  if (
    typeof requestId !== "string" ||
    typeof status !== "string" ||
    typeof returnTo !== "string" ||
    !isAllowedStatus(status)
  ) {
    throw new Error("Missing request status details.");
  }

  await ensureAttorneyManageableRequest(requestId, context.userId);

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase
    .from("aid_requests")
    .update({
      claimed_attorney_id: context.userId,
      status,
    })
    .eq("id", requestId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/attorney");
  revalidatePath(returnTo);
  redirect(returnTo);
}

export async function postAttorneyMessageAction(formData: FormData) {
  const context = await getPortalContext("attorney");
  const requestId = formData.get("request_id");
  const message = formData.get("message");
  const returnTo = formData.get("return_to");
  const isInternalNote = formData.get("is_internal_note") === "on";
  const files = formData
    .getAll("attachments")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  if (
    typeof requestId !== "string" ||
    typeof message !== "string" ||
    typeof returnTo !== "string"
  ) {
    throw new Error("Missing request detail.");
  }

  await ensureAttorneyManageableRequest(requestId, context.userId);

  if (message.trim().length < 2 && !files.length) {
    throw new Error("Add a message, note, or attachment before sending.");
  }

  const supabase = await createServerSupabaseClient();
  let createdMessageId: string | undefined;

  if (message.trim().length >= 2) {
    const { data: createdMessage, error } = await supabase
      .from("request_messages")
      .insert({
        request_id: requestId,
        sender_type: "attorney",
        sender_id: context.userId,
        message: message.trim(),
        is_internal_note: isInternalNote,
      })
      .select("id")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    createdMessageId = createdMessage?.id;
  }

  await uploadRequestFiles({
    requestId,
    files,
    uploadedBy: context.userId,
    uploadedByRole: "attorney",
    messageId: createdMessageId,
  });

  revalidatePath("/dashboard/attorney");
  revalidatePath(returnTo);
  redirect(returnTo);
}
