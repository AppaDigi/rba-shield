"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction, type LoginFormState } from "@/app/login/actions";
import { FormStatusButton } from "@/components/portal/FormStatusButton";

const initialState: LoginFormState = {};

interface Props {
  role: "member" | "attorney";
}

export function LoginForm({ role }: Props) {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="role" value={role} />

      <label className="block space-y-2">
        <span className="text-[10px] uppercase tracking-[0.28em] text-[rgba(244,241,234,0.5)]">
          Username or Email
        </span>
        <input
          name="identifier"
          autoComplete="username"
          required
          placeholder={role === "member" ? "member.username" : "attorney.username"}
          className="w-full rounded-2xl border border-[rgba(244,241,234,0.1)] bg-[rgba(7,12,19,0.9)] px-4 py-3.5 text-[15px] text-[var(--warm-white)] outline-none placeholder:text-[rgba(244,241,234,0.22)] transition-all duration-200 focus:border-[rgba(194,163,93,0.5)] focus:shadow-[0_0_0_3px_rgba(194,163,93,0.07)]"
        />
      </label>

      <label className="block space-y-2">
        <span className="text-[10px] uppercase tracking-[0.28em] text-[rgba(244,241,234,0.5)]">
          Password
        </span>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          required
          placeholder="Enter your password"
          className="w-full rounded-2xl border border-[rgba(244,241,234,0.1)] bg-[rgba(7,12,19,0.9)] px-4 py-3.5 text-[15px] text-[var(--warm-white)] outline-none placeholder:text-[rgba(244,241,234,0.22)] transition-all duration-200 focus:border-[rgba(194,163,93,0.5)] focus:shadow-[0_0_0_3px_rgba(194,163,93,0.07)]"
        />
      </label>

      {state.error ? (
        <div className="rounded-2xl border border-[rgba(122,31,31,0.45)] bg-[rgba(122,31,31,0.14)] px-4 py-3 text-sm text-[var(--warm-white)]">
          {state.error}
        </div>
      ) : null}

      <div className="space-y-3 pt-2">
        <FormStatusButton
          pendingLabel="Signing In..."
          className="w-full rounded-full py-4 text-[13px] tracking-[0.18em] shadow-[0_8px_24px_rgba(194,163,93,0.13)] hover:shadow-[0_12px_32px_rgba(194,163,93,0.22)] hover:brightness-105"
        >
          Enter the Portal →
        </FormStatusButton>
        <Link
          href="/"
          className="block text-center text-[11px] uppercase tracking-[0.22em] text-[rgba(244,241,234,0.36)] transition-colors hover:text-[rgba(244,241,234,0.62)]"
        >
          Return to Main Site
        </Link>
      </div>
    </form>
  );
}
