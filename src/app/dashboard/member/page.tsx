import Link from "next/link";
import { ArrowRight, FileClock, MessageSquareText, Paperclip } from "lucide-react";
import { RequestComposer } from "@/components/portal/RequestComposer";
import { RequestStatusBadge } from "@/components/portal/RequestStatusBadge";
import { getPortalContext } from "@/lib/portal/auth";
import { formatCategory } from "@/lib/portal/constants";
import { getMemberDashboardRequests } from "@/lib/portal/queries";

export default async function MemberDashboardPage() {
  const context = await getPortalContext("member");
  const requests = await getMemberDashboardRequests(context.userId);

  const activeCount = requests.filter((request) => request.status !== "closed").length;
  const waitingCount = requests.filter(
    (request) => request.status === "awaiting_member_response",
  ).length;

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            label: "Open Matters",
            value: String(activeCount),
            icon: FileClock,
          },
          {
            label: "Awaiting Your Reply",
            value: String(waitingCount),
            icon: MessageSquareText,
          },
          {
            label: "Files on Record",
            value: String(
              requests.reduce((total, request) => total + request.attachmentCount, 0),
            ),
            icon: Paperclip,
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.label}
              className="rounded-[28px] border border-[rgba(244,241,234,0.08)] bg-[rgba(10,14,24,0.76)] p-6"
            >
              <div className="flex items-center justify-between">
                <div className="text-[11px] uppercase tracking-[0.28em] text-[rgba(244,241,234,0.48)]">
                  {item.label}
                </div>
                <Icon className="h-5 w-5 text-[var(--brass)]" />
              </div>
              <div className="mt-4 font-display text-4xl uppercase tracking-[0.08em] text-[var(--warm-white)]">
                {item.value}
              </div>
            </article>
          );
        })}
      </section>

      <section className="rounded-[32px] border border-[rgba(244,241,234,0.08)] bg-[rgba(10,14,24,0.78)] p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.32em] text-[rgba(244,241,234,0.48)]">
              Your Requests
            </div>
            <h1 className="mt-3 font-display text-3xl uppercase tracking-[0.08em] text-[var(--warm-white)]">
              Matter Overview
            </h1>
          </div>
          <a
            href="#new-request"
            className="rounded-[16px] border border-[rgba(194,163,93,0.32)] bg-[rgba(194,163,93,0.08)] px-4 py-3 text-xs uppercase tracking-[0.22em] text-[var(--warm-white)] transition hover:-translate-y-0.5"
          >
            Open New Request
          </a>
        </div>

        <div className="mt-6 space-y-4">
          {requests.length ? (
            requests.map((request) => (
              <Link
                key={request.id}
                href={`/dashboard/member/requests/${request.id}`}
                className="grid gap-4 rounded-[24px] border border-white/8 bg-[rgba(7,12,19,0.86)] p-5 transition hover:border-[rgba(194,163,93,0.24)] lg:grid-cols-[1.2fr_0.8fr]"
              >
                <div>
                  <div className="text-[11px] uppercase tracking-[0.28em] text-[rgba(244,241,234,0.44)]">
                    {formatCategory(request.category)}
                  </div>
                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-[rgba(244,241,234,0.74)]">
                    {request.description}
                  </p>
                </div>
                <div className="flex flex-col items-start justify-between gap-3 lg:items-end">
                  <RequestStatusBadge status={request.status} />
                  <div className="text-[11px] uppercase tracking-[0.24em] text-[rgba(244,241,234,0.44)]">
                    Submitted {new Date(request.created_at).toLocaleDateString()}
                  </div>
                  <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-[var(--brass)]">
                    View Thread
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="rounded-[24px] border border-dashed border-white/10 px-5 py-8 text-sm text-[rgba(244,241,234,0.58)]">
              No legal aid requests have been submitted yet.
            </div>
          )}
        </div>
      </section>

      <RequestComposer />
    </div>
  );
}
