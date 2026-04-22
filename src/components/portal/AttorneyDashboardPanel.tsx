"use client";

import Link from "next/link";
import { useDeferredValue, useState } from "react";
import { Search, FolderOpenDot, Filter } from "lucide-react";
import { RequestStatusBadge } from "@/components/portal/RequestStatusBadge";
import {
  REQUEST_CATEGORY_OPTIONS,
  REQUEST_STATUS_OPTIONS,
  formatCategory,
} from "@/lib/portal/constants";
import type { RequestListItem } from "@/lib/portal/queries";

type AttorneyDashboardPanelProps = {
  requests: RequestListItem[];
};

export function AttorneyDashboardPanel({
  requests,
}: AttorneyDashboardPanelProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [claimState, setClaimState] = useState("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const deferredSearch = useDeferredValue(search);
  const normalizedSearch = deferredSearch.trim().toLowerCase();

  const filteredRequests = requests
    .filter((request) => {
      if (status !== "all" && request.status !== status) {
        return false;
      }

      if (category !== "all" && request.category !== category) {
        return false;
      }

      if (claimState === "claimed" && !request.claimedAttorney) {
        return false;
      }

      if (claimState === "unclaimed" && request.claimedAttorney) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      return [
        request.member.name,
        request.member.username,
        request.description,
        formatCategory(request.category),
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch);
    })
    .sort((left, right) => {
      const leftTime = new Date(left.created_at).getTime();
      const rightTime = new Date(right.created_at).getTime();
      return sortBy === "newest" ? rightTime - leftTime : leftTime - rightTime;
    });

  return (
    <div className="space-y-6">
      <section
        id="filters"
        className="rounded-[32px] border border-[rgba(244,241,234,0.08)] bg-[rgba(10,14,24,0.78)] p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.32em] text-[rgba(244,241,234,0.48)]">
              Intake Controls
            </div>
            <h2 className="mt-3 font-display text-3xl uppercase tracking-[0.08em] text-[var(--warm-white)]">
              Filter the Queue
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-[rgba(244,241,234,0.56)]">
            <Filter className="h-4 w-4 text-[var(--brass)]" />
            {filteredRequests.length} visible matters
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-4">
          <label className="space-y-2 lg:col-span-2">
            <span className="text-[11px] uppercase tracking-[0.28em] text-[rgba(244,241,234,0.56)]">
              Search
            </span>
            <div className="flex items-center gap-3 rounded-[16px] border border-white/10 bg-[rgba(7,12,19,0.9)] px-4 py-3">
              <Search className="h-4 w-4 text-[var(--brass)]" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by member, category, or request text"
                className="w-full bg-transparent text-sm text-[var(--warm-white)] outline-none"
              />
            </div>
          </label>

          <label className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.28em] text-[rgba(244,241,234,0.56)]">
              Status
            </span>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="w-full rounded-[16px] border border-white/10 bg-[rgba(7,12,19,0.9)] px-4 py-3 text-sm text-[var(--warm-white)] outline-none"
            >
              <option value="all">All statuses</option>
              {REQUEST_STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.28em] text-[rgba(244,241,234,0.56)]">
              Category
            </span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full rounded-[16px] border border-white/10 bg-[rgba(7,12,19,0.9)] px-4 py-3 text-sm text-[var(--warm-white)] outline-none"
            >
              <option value="all">All categories</option>
              {REQUEST_CATEGORY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.28em] text-[rgba(244,241,234,0.56)]">
              Claim State
            </span>
            <select
              value={claimState}
              onChange={(event) => setClaimState(event.target.value)}
              className="w-full rounded-[16px] border border-white/10 bg-[rgba(7,12,19,0.9)] px-4 py-3 text-sm text-[var(--warm-white)] outline-none"
            >
              <option value="all">All matters</option>
              <option value="claimed">Claimed</option>
              <option value="unclaimed">Unclaimed</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.28em] text-[rgba(244,241,234,0.56)]">
              Sort
            </span>
            <select
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value as "newest" | "oldest")
              }
              className="w-full rounded-[16px] border border-white/10 bg-[rgba(7,12,19,0.9)] px-4 py-3 text-sm text-[var(--warm-white)] outline-none"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </label>
        </div>
      </section>

      <section className="rounded-[32px] border border-[rgba(244,241,234,0.08)] bg-[rgba(10,14,24,0.78)] p-6">
        <div className="mb-4 flex items-center gap-3">
          <FolderOpenDot className="h-5 w-5 text-[var(--brass)]" />
          <div className="font-display text-xl uppercase tracking-[0.12em] text-[var(--warm-white)]">
            Incoming Aid Requests
          </div>
        </div>

        <div className="space-y-4">
          {filteredRequests.length ? (
            filteredRequests.map((request) => (
              <Link
                key={request.id}
                href={`/dashboard/attorney/requests/${request.id}`}
                className="grid gap-4 rounded-[24px] border border-white/8 bg-[rgba(7,12,19,0.86)] p-5 transition hover:border-[rgba(194,163,93,0.24)] lg:grid-cols-[1.3fr_0.9fr_0.8fr]"
              >
                <div>
                  <div className="text-[11px] uppercase tracking-[0.28em] text-[rgba(244,241,234,0.44)]">
                    {formatCategory(request.category)}
                  </div>
                  <div className="mt-3 font-display text-xl uppercase tracking-[0.08em] text-[var(--warm-white)]">
                    {request.member.name}
                  </div>
                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-[rgba(244,241,234,0.72)]">
                    {request.description}
                  </p>
                </div>

                <div className="space-y-3 text-sm text-[rgba(244,241,234,0.68)]">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.24em] text-[rgba(244,241,234,0.44)]">
                      Submitted
                    </div>
                    <div className="mt-1">
                      {new Date(request.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.24em] text-[rgba(244,241,234,0.44)]">
                      Claimed
                    </div>
                    <div className="mt-1">
                      {request.claimedAttorney?.name ?? "Unclaimed"}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-3 lg:items-end">
                  <RequestStatusBadge status={request.status} />
                  <div className="text-[11px] uppercase tracking-[0.24em] text-[rgba(244,241,234,0.44)]">
                    {request.attachmentCount} files
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.24em] text-[var(--brass)]">
                    Open Matter
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="rounded-[24px] border border-dashed border-white/10 px-5 py-8 text-sm text-[rgba(244,241,234,0.56)]">
              No requests match the current filters.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
