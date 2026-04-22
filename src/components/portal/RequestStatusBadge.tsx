import type { RequestStatus } from "@/lib/supabase/database.types";
import { formatStatus } from "@/lib/portal/constants";
import { cn } from "@/lib/utils";

const statusStyles: Record<RequestStatus, string> = {
  submitted:
    "border-[rgba(194,163,93,0.26)] bg-[rgba(194,163,93,0.1)] text-[var(--brass)]",
  under_review:
    "border-[rgba(58,90,122,0.3)] bg-[rgba(58,90,122,0.16)] text-[rgba(222,231,240,0.9)]",
  claimed:
    "border-[rgba(194,163,93,0.26)] bg-[rgba(194,163,93,0.18)] text-[var(--warm-white)]",
  in_progress:
    "border-[rgba(244,241,234,0.16)] bg-[rgba(244,241,234,0.08)] text-[var(--warm-white)]",
  awaiting_member_response:
    "border-[rgba(122,31,31,0.3)] bg-[rgba(122,31,31,0.16)] text-[rgba(255,231,231,0.92)]",
  closed:
    "border-[rgba(244,241,234,0.12)] bg-[rgba(244,241,234,0.06)] text-[rgba(244,241,234,0.66)]",
};

export function RequestStatusBadge({ status }: { status: RequestStatus }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em]",
        statusStyles[status],
      )}
    >
      {formatStatus(status)}
    </span>
  );
}
