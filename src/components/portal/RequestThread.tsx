import Link from "next/link";
import { Paperclip, Link2 } from "lucide-react";
import {
  postAttorneyMessageAction,
  postMemberMessageAction,
} from "@/app/dashboard/actions";
import { FormStatusButton } from "@/components/portal/FormStatusButton";
import { RequestStatusBadge } from "@/components/portal/RequestStatusBadge";
import { formatCategory } from "@/lib/portal/constants";
import type { PortalRole } from "@/lib/supabase/database.types";
import type { RequestDetail } from "@/lib/portal/queries";
import { cn } from "@/lib/utils";

type RequestThreadProps = {
  role: Exclude<PortalRole, "admin">;
  detail: RequestDetail;
  returnTo: string;
  canManage?: boolean;
  statusControls?: React.ReactNode;
  claimControls?: React.ReactNode;
};

export function RequestThread({
  role,
  detail,
  returnTo,
  canManage = false,
  statusControls,
  claimControls,
}: RequestThreadProps) {
  const threadAction =
    role === "member" ? postMemberMessageAction : postAttorneyMessageAction;

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <section className="space-y-6 rounded-[32px] border border-[rgba(244,241,234,0.08)] bg-[rgba(10,14,24,0.8)] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.26)]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.32em] text-[rgba(244,241,234,0.48)]">
              {role === "member" ? "Request Detail" : "Matter Review"}
            </div>
            <h1 className="mt-3 font-display text-3xl uppercase tracking-[0.08em] text-[var(--warm-white)]">
              {formatCategory(detail.request.category)}
            </h1>
            <div className="mt-3 flex flex-wrap gap-2">
              <RequestStatusBadge status={detail.request.status} />
              <span className="inline-flex rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[rgba(244,241,234,0.56)]">
                {new Date(detail.request.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
          <Link
            href={returnTo}
            className="rounded-[16px] border border-white/10 px-4 py-3 text-xs uppercase tracking-[0.22em] text-[rgba(244,241,234,0.76)] transition hover:border-[rgba(194,163,93,0.3)] hover:text-[var(--warm-white)]"
          >
            Back to Dashboard
          </Link>
        </div>

        <div className="rounded-[24px] border border-white/8 bg-[rgba(7,12,19,0.86)] p-5">
          <div className="text-[11px] uppercase tracking-[0.28em] text-[rgba(244,241,234,0.48)]">
            Initial Submission
          </div>
          <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-[rgba(244,241,234,0.82)]">
            {detail.request.description}
          </p>
        </div>

        {detail.messages.length ? (
          <div className="space-y-4">
            {detail.messages.map((message) => (
              <article
                key={message.id}
                className={cn(
                  "rounded-[24px] border p-5",
                  message.is_internal_note
                    ? "border-[rgba(122,31,31,0.28)] bg-[rgba(122,31,31,0.12)]"
                    : "border-white/8 bg-[rgba(7,12,19,0.86)]",
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="font-display text-sm uppercase tracking-[0.16em] text-[var(--warm-white)]">
                      {message.sender_name}
                    </div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.24em] text-[rgba(244,241,234,0.48)]">
                      {message.sender_type}
                      {message.is_internal_note ? " • Internal Note" : ""}
                    </div>
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.24em] text-[rgba(244,241,234,0.42)]">
                    {new Date(message.created_at).toLocaleString()}
                  </div>
                </div>
                <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-[rgba(244,241,234,0.82)]">
                  {message.message}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-[24px] border border-dashed border-white/10 bg-[rgba(7,12,19,0.7)] px-5 py-6 text-sm text-[rgba(244,241,234,0.58)]">
            No replies have been added to this request yet.
          </div>
        )}

        <form action={threadAction} className="space-y-4 rounded-[28px] border border-[rgba(244,241,234,0.08)] bg-[rgba(7,12,19,0.88)] p-5">
          <input type="hidden" name="request_id" value={detail.request.id} />
          <input type="hidden" name="return_to" value={returnTo} />

          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-display text-lg uppercase tracking-[0.12em] text-[var(--warm-white)]">
                {role === "member" ? "Reply to Counsel" : "Post an Update"}
              </div>
              <div className="mt-1 text-sm text-[rgba(244,241,234,0.56)]">
                {role === "member"
                  ? "Ask follow-up questions, add clarifications, or send more files."
                  : "Reply to the member or add private internal notes."}
              </div>
            </div>
          </div>

          <textarea
            name="message"
            rows={5}
            disabled={role === "attorney" && !canManage}
            className="w-full rounded-[20px] border border-white/10 bg-[rgba(10,14,24,0.88)] px-4 py-4 text-sm leading-7 text-[var(--warm-white)] outline-none focus:border-[rgba(194,163,93,0.4)]"
            placeholder={
              role === "member"
                ? "Write your reply or add any clarifying detail here."
                : "Write your response, next step, or internal note."
            }
          />

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
            <label className="space-y-2">
              <span className="text-[11px] uppercase tracking-[0.28em] text-[rgba(244,241,234,0.56)]">
                Attach Files
              </span>
              <input
                type="file"
                name="attachments"
                multiple
                disabled={role === "attorney" && !canManage}
                accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx"
                className="block w-full rounded-[16px] border border-dashed border-white/12 bg-[rgba(10,14,24,0.88)] px-4 py-3 text-sm text-[rgba(244,241,234,0.72)] file:mr-4 file:rounded-full file:border-0 file:bg-[rgba(194,163,93,0.18)] file:px-4 file:py-2 file:text-xs file:uppercase file:tracking-[0.18em] file:text-[var(--warm-white)]"
              />
            </label>

            {role === "attorney" ? (
              <label className="flex items-center gap-3 rounded-[18px] border border-white/10 bg-[rgba(10,14,24,0.88)] px-4 py-3 text-sm text-[rgba(244,241,234,0.72)]">
                <input
                  type="checkbox"
                  name="is_internal_note"
                  disabled={!canManage}
                  className="h-4 w-4 accent-[var(--brass)]"
                />
                Mark as internal note
              </label>
            ) : (
              <div className="rounded-[18px] border border-white/10 bg-[rgba(10,14,24,0.88)] px-4 py-3 text-sm text-[rgba(244,241,234,0.54)]">
                Replies remain visible inside this secure thread.
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <FormStatusButton
              className={cn(!canManage && role === "attorney" && "opacity-60")}
              disabled={role === "attorney" && !canManage}
              pendingLabel="Sending..."
            >
              {role === "member" ? "Send Reply" : "Post Update"}
            </FormStatusButton>
          </div>
        </form>
      </section>

      <aside className="space-y-6">
        <section className="rounded-[32px] border border-[rgba(244,241,234,0.08)] bg-[rgba(10,14,24,0.8)] p-5">
          <div className="text-[11px] uppercase tracking-[0.32em] text-[rgba(244,241,234,0.48)]">
            Matter Summary
          </div>
          <dl className="mt-4 space-y-4 text-sm text-[rgba(244,241,234,0.72)]">
            <div>
              <dt className="text-[11px] uppercase tracking-[0.24em] text-[rgba(244,241,234,0.48)]">
                Member
              </dt>
              <dd className="mt-1 font-display text-lg uppercase tracking-[0.08em] text-[var(--warm-white)]">
                {detail.request.member.name}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.24em] text-[rgba(244,241,234,0.48)]">
                Claimed By
              </dt>
              <dd className="mt-1">
                {detail.request.claimedAttorney?.name ?? "Unclaimed"}
              </dd>
            </div>
          </dl>

          <div className="mt-6 space-y-3">{claimControls}{statusControls}</div>
        </section>

        <section className="rounded-[32px] border border-[rgba(244,241,234,0.08)] bg-[rgba(10,14,24,0.8)] p-5">
          <div className="flex items-center gap-3">
            <Paperclip className="h-4 w-4 text-[var(--brass)]" />
            <div className="text-[11px] uppercase tracking-[0.32em] text-[rgba(244,241,234,0.48)]">
              Attachments
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {detail.attachments.length ? (
              detail.attachments.map((attachment) => (
                <Link
                  key={attachment.id}
                  href={`/api/attachments/${attachment.id}`}
                  className="flex items-center justify-between rounded-[18px] border border-white/8 bg-[rgba(7,12,19,0.86)] px-4 py-3 transition hover:border-[rgba(194,163,93,0.28)]"
                >
                  <div>
                    <div className="text-sm text-[var(--warm-white)]">
                      {attachment.file_name}
                    </div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.24em] text-[rgba(244,241,234,0.44)]">
                      {attachment.file_type || "File"}
                    </div>
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.24em] text-[var(--brass)]">
                    Open
                  </span>
                </Link>
              ))
            ) : (
              <div className="rounded-[18px] border border-dashed border-white/10 px-4 py-5 text-sm text-[rgba(244,241,234,0.56)]">
                No files have been attached yet.
              </div>
            )}
          </div>
        </section>

        <section className="rounded-[32px] border border-[rgba(244,241,234,0.08)] bg-[rgba(10,14,24,0.8)] p-5">
          <div className="flex items-center gap-3">
            <Link2 className="h-4 w-4 text-[var(--brass)]" />
            <div className="text-[11px] uppercase tracking-[0.32em] text-[rgba(244,241,234,0.48)]">
              Supporting Links
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {detail.request.supporting_links.length ? (
              detail.request.supporting_links.map((url) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-[18px] border border-white/8 bg-[rgba(7,12,19,0.86)] px-4 py-3 text-sm text-[rgba(244,241,234,0.78)] transition hover:border-[rgba(194,163,93,0.28)] hover:text-[var(--warm-white)]"
                >
                  {url}
                </a>
              ))
            ) : (
              <div className="rounded-[18px] border border-dashed border-white/10 px-4 py-5 text-sm text-[rgba(244,241,234,0.56)]">
                No supporting links were included with this request.
              </div>
            )}
          </div>
        </section>
      </aside>
    </div>
  );
}
