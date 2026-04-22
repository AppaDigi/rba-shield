import { Scale, FolderCheck, Clock3 } from "lucide-react";
import { AttorneyDashboardPanel } from "@/components/portal/AttorneyDashboardPanel";
import { getPortalContext } from "@/lib/portal/auth";
import { getAttorneyDashboardRequests } from "@/lib/portal/queries";

export default async function AttorneyDashboardPage() {
  await getPortalContext("attorney");
  const requests = await getAttorneyDashboardRequests();

  const unclaimed = requests.filter((request) => !request.claimedAttorney).length;
  const active = requests.filter((request) => request.status !== "closed").length;
  const waiting = requests.filter(
    (request) => request.status === "awaiting_member_response",
  ).length;

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Open Matters", value: String(active), icon: Scale },
          { label: "Unclaimed", value: String(unclaimed), icon: FolderCheck },
          {
            label: "Awaiting Member Reply",
            value: String(waiting),
            icon: Clock3,
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

      <AttorneyDashboardPanel requests={requests} />
    </div>
  );
}
