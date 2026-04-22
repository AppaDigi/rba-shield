import type {
  PortalRole,
  RequestCategory,
  RequestStatus,
} from "@/lib/supabase/database.types";

export const USER_TYPE_OPTIONS = [
  { value: "member", label: "RBA Member" },
  { value: "attorney", label: "Shield Attorney" },
] as const satisfies ReadonlyArray<{ value: PortalRole; label: string }>;

export const REQUEST_CATEGORY_OPTIONS = [
  {
    value: "religious_discrimination",
    label: "Religious discrimination",
  },
  { value: "defamation", label: "Defamation" },
  { value: "employment_related", label: "Employment-related issues" },
  {
    value: "free_speech_constitutional",
    label: "Free speech / constitutional concerns",
  },
  {
    value: "business_ministry_dispute",
    label: "Business or ministry-related disputes",
  },
  { value: "other", label: "Other" },
] as const satisfies ReadonlyArray<{
  value: RequestCategory;
  label: string;
}>;

export const REQUEST_STATUS_OPTIONS = [
  { value: "submitted", label: "Submitted" },
  { value: "under_review", label: "Under Review" },
  { value: "claimed", label: "Claimed" },
  { value: "in_progress", label: "In Progress" },
  {
    value: "awaiting_member_response",
    label: "Awaiting Member Response",
  },
  { value: "closed", label: "Closed" },
] as const satisfies ReadonlyArray<{
  value: RequestStatus;
  label: string;
}>;

export function getDashboardHref(role: PortalRole) {
  if (role === "attorney") {
    return "/dashboard/attorney";
  }

  return "/dashboard/member";
}

export function formatCategory(category: RequestCategory) {
  return (
    REQUEST_CATEGORY_OPTIONS.find((option) => option.value === category)?.label ??
    category.replaceAll("_", " ")
  );
}

export function formatStatus(status: RequestStatus) {
  return (
    REQUEST_STATUS_OPTIONS.find((option) => option.value === status)?.label ??
    status.replaceAll("_", " ")
  );
}
