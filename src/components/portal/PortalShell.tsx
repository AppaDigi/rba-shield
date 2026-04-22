import Link from "next/link";
import { Scale, Shield, BriefcaseBusiness, LogOut } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { logoutAction } from "@/app/login/actions";
import type { PortalRole } from "@/lib/supabase/database.types";
import { cn } from "@/lib/utils";

const navByRole: Record<
  Exclude<PortalRole, "admin">,
  Array<{ href: string; label: string; icon: typeof Shield }>
> = {
  member: [
    { href: "/dashboard/member", label: "Overview", icon: Shield },
    {
      href: "/dashboard/member#new-request",
      label: "Submit Request",
      icon: Scale,
    },
  ],
  attorney: [
    { href: "/dashboard/attorney", label: "Intake Queue", icon: BriefcaseBusiness },
    { href: "/dashboard/attorney#filters", label: "Filter Matters", icon: Scale },
  ],
};

type PortalShellProps = {
  role: Exclude<PortalRole, "admin">;
  name: string;
  subtitle: string;
  activeHref: string;
  children: React.ReactNode;
};

export function PortalShell({
  role,
  name,
  subtitle,
  activeHref,
  children,
}: PortalShellProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-transparent">
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(circle_at_18%_10%,rgba(194,163,93,0.1),transparent_20%),radial-gradient(circle_at_78%_14%,rgba(122,31,31,0.12),transparent_18%),radial-gradient(circle_at_50%_42%,rgba(58,90,122,0.12),transparent_28%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(180deg,rgba(9,18,29,0.72),rgba(8,13,20,0.9))]" />

      <header className="sticky top-0 z-40 border-b border-white/8 bg-[rgba(8,14,24,0.82)] backdrop-blur-xl">
        <div className="mx-auto flex min-h-[84px] w-[min(100%-1.5rem,1280px)] items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-4">
            <Logo className="h-11 w-11 text-[var(--brass)]" />
            <div>
              <div className="font-display text-xl uppercase tracking-[0.08em] text-[var(--warm-white)]">
                RBA Shield
              </div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-[rgba(244,241,234,0.52)]">
                Member Legal Portal
              </div>
            </div>
          </Link>

          <div className="hidden items-center gap-4 lg:flex">
            <div className="rounded-[18px] border border-white/10 bg-[rgba(10,14,24,0.62)] px-4 py-3 text-right">
              <div className="font-display text-sm uppercase tracking-[0.16em] text-[var(--warm-white)]">
                {name}
              </div>
              <div className="text-[11px] uppercase tracking-[0.26em] text-[rgba(244,241,234,0.52)]">
                {subtitle}
              </div>
            </div>
            <form action={logoutAction}>
              <button className="inline-flex items-center gap-2 rounded-[16px] border border-white/10 bg-[rgba(7,12,19,0.82)] px-4 py-3 text-xs uppercase tracking-[0.22em] text-[rgba(244,241,234,0.78)] transition hover:border-[rgba(194,163,93,0.32)] hover:text-[var(--warm-white)]">
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-[min(100%-1.5rem,1280px)] gap-6 py-8 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="space-y-6 lg:sticky lg:top-[116px] lg:self-start">
          <div className="rounded-[28px] border border-[rgba(244,241,234,0.08)] bg-[rgba(10,14,24,0.76)] p-5 shadow-[0_22px_80px_rgba(0,0,0,0.28)]">
            <div className="text-[11px] uppercase tracking-[0.32em] text-[rgba(244,241,234,0.48)]">
              {role === "member" ? "Member Console" : "Attorney Console"}
            </div>
            <div className="mt-3 font-display text-2xl uppercase tracking-[0.08em] text-[var(--warm-white)]">
              {name}
            </div>
            <p className="mt-2 text-sm leading-6 text-[rgba(244,241,234,0.68)]">
              {role === "member"
                ? "Submit legal needs, track status changes, and stay in step with counsel."
                : "Triage the intake queue, claim matters, and coordinate responses with clarity."}
            </p>
          </div>

          <nav className="rounded-[28px] border border-[rgba(244,241,234,0.08)] bg-[rgba(10,14,24,0.76)] p-3 shadow-[0_22px_80px_rgba(0,0,0,0.22)]">
            {navByRole[role].map((item) => {
              const Icon = item.icon;
              const isActive =
                activeHref === item.href ||
                (item.href.includes("#") && activeHref.startsWith(item.href.split("#")[0]));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "mb-2 flex items-center gap-3 rounded-[18px] border px-4 py-4 transition last:mb-0",
                    isActive
                      ? "border-[rgba(194,163,93,0.38)] bg-[linear-gradient(180deg,rgba(194,163,93,0.16),rgba(194,163,93,0.06))] text-[var(--warm-white)]"
                      : "border-transparent bg-transparent text-[rgba(244,241,234,0.62)] hover:border-white/8 hover:bg-white/[0.03] hover:text-[var(--warm-white)]",
                  )}
                >
                  <Icon className="h-4 w-4 text-[var(--brass)]" />
                  <span className="font-display text-sm uppercase tracking-[0.16em]">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="rounded-[28px] border border-[rgba(194,163,93,0.18)] bg-[linear-gradient(180deg,rgba(194,163,93,0.08),rgba(10,14,24,0.82))] p-5">
            <div className="text-[11px] uppercase tracking-[0.32em] text-[rgba(244,241,234,0.5)]">
              Secure Session
            </div>
            <p className="mt-3 text-sm leading-6 text-[rgba(244,241,234,0.7)]">
              All requests, files, and message threads are protected by authenticated access and role-based policies.
            </p>
          </div>
        </aside>

        <div className="space-y-6">
          <div className="flex items-center justify-between rounded-[24px] border border-white/8 bg-[rgba(10,14,24,0.68)] px-5 py-4 lg:hidden">
            <div>
              <div className="font-display text-lg uppercase tracking-[0.12em] text-[var(--warm-white)]">
                {name}
              </div>
              <div className="text-[11px] uppercase tracking-[0.28em] text-[rgba(244,241,234,0.5)]">
                {subtitle}
              </div>
            </div>
            <form action={logoutAction}>
              <button className="rounded-[14px] border border-white/10 px-3 py-2 text-[11px] uppercase tracking-[0.22em] text-[rgba(244,241,234,0.78)]">
                Sign Out
              </button>
            </form>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
