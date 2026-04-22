"use client";

import { useState } from "react";
import { User, Scale, type LucideIcon } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { LoginForm } from "./LoginForm";
import { cn } from "@/lib/utils";

type RoleValue = "member" | "attorney";

interface RoleDef {
  value: RoleValue;
  label: string;
  tagline: string;
  Icon: LucideIcon;
  bullets: string[];
}

const roles: RoleDef[] = [
  {
    value: "member",
    label: "RBA Member",
    tagline: "Legal aid portal access",
    Icon: User,
    bullets: [
      "Submit legal aid requests",
      "Upload supporting evidence",
      "Track case progress in real-time",
    ],
  },
  {
    value: "attorney",
    label: "Shield Attorney",
    tagline: "Attorney intake queue",
    Icon: Scale,
    bullets: [
      "Review incoming cases",
      "Claim and manage requests",
      "Coordinate secure responses",
    ],
  },
];

export function LoginPortal() {
  const [role, setRole] = useState<RoleValue>("member");

  return (
    <div className="relative flex flex-1 flex-col lg:grid lg:grid-cols-2">

      {/* Center divider */}
      <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px bg-[rgba(244,241,234,0.06)] lg:block" />

      {/* ══ LEFT — brand + role selection (desktop only) ══ */}
      <div className="hidden lg:relative lg:flex lg:flex-col lg:justify-center lg:overflow-hidden lg:px-20">

        {/* Watermark logo */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-[0.04]">
          <Logo className="w-[160%] shrink-0 text-[var(--brass)]" />
        </div>

        {/* Cinematic frame — heroFrame from homepage */}
        <div className="pointer-events-none absolute inset-6 border border-[rgba(244,241,234,0.04)]">
          <div className="absolute left-1/2 top-0 h-12 w-px -translate-x-1/2 bg-[var(--heritage-red)]" />
          <div className="absolute bottom-0 left-1/2 h-12 w-px -translate-x-1/2 bg-[var(--heritage-red)]" />
        </div>

        {/* Centered content */}
        <div className="relative max-w-[440px]">

          {/* Red rule + eyebrow */}
          <div className="mb-6 h-14 w-0.5 bg-[var(--heritage-red)]" />
          <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--brass)]">
            Defense Coordination
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.4rem,3.6vw,4rem)] uppercase leading-[0.95] tracking-[0.04em] text-[var(--warm-white)]">
            The Secure Intake<br />
            Arm of the Shield.
          </h1>

          {/* Role selector */}
          <p className="mt-10 text-[10px] uppercase tracking-[0.28em] text-[rgba(244,241,234,0.4)]">
            Select Your Access Role
          </p>
          <div className="mt-3 space-y-2.5">
            {roles.map(({ value, label, tagline, Icon, bullets }) => {
              const active = role === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRole(value)}
                  className={cn(
                    "w-full rounded-2xl border p-5 text-left transition-all duration-300",
                    active
                      ? "border-[rgba(194,163,93,0.42)] bg-[rgba(194,163,93,0.07)] shadow-[0_0_32px_rgba(194,163,93,0.07)]"
                      : "border-[rgba(244,241,234,0.08)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(244,241,234,0.13)] hover:bg-[rgba(255,255,255,0.03)]",
                  )}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all duration-300",
                      active
                        ? "border-[rgba(194,163,93,0.4)] bg-[rgba(194,163,93,0.1)] text-[var(--brass)]"
                        : "border-[rgba(244,241,234,0.1)] text-[rgba(244,241,234,0.38)]",
                    )}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={cn(
                        "font-display text-sm uppercase tracking-[0.14em] transition-colors duration-300",
                        active ? "text-[var(--warm-white)]" : "text-[rgba(244,241,234,0.62)]",
                      )}>
                        {label}
                      </p>
                      <p className="mt-0.5 text-[11px] text-[rgba(244,241,234,0.38)]">{tagline}</p>
                    </div>
                    {/* Selection indicator */}
                    <div className={cn(
                      "h-2 w-2 shrink-0 rounded-full bg-[var(--brass)] transition-all duration-300",
                      active ? "scale-100 opacity-100" : "scale-0 opacity-0",
                    )} />
                  </div>

                  {/* Expanding bullets */}
                  <div className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    active ? "max-h-36 opacity-100" : "max-h-0 opacity-0",
                  )}>
                    <ul className="mt-4 space-y-2 pl-[52px]">
                      {bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2.5 text-[12px] text-[rgba(244,241,234,0.6)]">
                          <span className="shrink-0 text-[7px] text-[var(--brass)]">◆</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quote pinned to bottom */}
        <div className="absolute bottom-10 left-20 right-20 border-t border-[rgba(244,241,234,0.06)] pt-6">
          <p className="font-serif text-[13px] italic text-[rgba(244,241,234,0.28)]">
            &ldquo;Stronger Together. Protected Always.&rdquo;
          </p>
        </div>
      </div>

      {/* ══ RIGHT — credential form ══ */}
      <div className="flex min-h-[calc(100svh-76px)] flex-col items-center justify-center px-8 py-12 lg:min-h-0 lg:items-start lg:px-16">
        <div className="w-full max-w-[400px]">

          {/* Mobile role toggle — only visible below lg */}
          <div className="mb-8 lg:hidden">
            <p className="mb-3 text-[10px] uppercase tracking-[0.32em] text-[rgba(244,241,234,0.4)]">
              Access Role
            </p>
            <div className="grid grid-cols-2 gap-2 rounded-2xl border border-[rgba(244,241,234,0.08)] bg-[rgba(10,14,24,0.6)] p-2">
              {roles.map(({ value, label, Icon }) => {
                const active = role === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRole(value)}
                    className={cn(
                      "flex items-center gap-2.5 rounded-[14px] border px-4 py-3.5 transition-all duration-200",
                      active
                        ? "border-[rgba(194,163,93,0.48)] bg-[rgba(194,163,93,0.1)] text-[var(--warm-white)]"
                        : "border-transparent text-[rgba(244,241,234,0.48)] hover:border-[rgba(244,241,234,0.1)]",
                    )}
                  >
                    <Icon className={cn("h-4 w-4 shrink-0 transition-colors duration-200", active ? "text-[var(--brass)]" : "text-[rgba(244,241,234,0.36)]")} />
                    <span className="font-display text-[11px] uppercase tracking-[0.12em]">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Heading */}
          <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--brass)]">Sign In</p>
          <h2 className="mt-3 font-display text-[2rem] uppercase leading-[1] tracking-[0.06em] text-[var(--warm-white)]">
            Enter the Portal
          </h2>
          <p className="mt-3 text-[13px] leading-[1.9] text-[rgba(244,241,234,0.44)]">
            Sign in with your credentials and we&rsquo;ll route you to the right dashboard.
          </p>

          {/* Credentials */}
          <div className="mt-9">
            <LoginForm role={role} />
          </div>
        </div>
      </div>

    </div>
  );
}
