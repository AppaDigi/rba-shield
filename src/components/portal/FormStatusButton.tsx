"use client";

import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

type FormStatusButtonProps = {
  children: React.ReactNode;
  pendingLabel?: string;
  className?: string;
  disabled?: boolean;
};

export function FormStatusButton({
  children,
  pendingLabel = "Working...",
  className,
  disabled = false,
}: FormStatusButtonProps) {
  const { pending } = useFormStatus();
  const isDisabled = pending || disabled;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={cn(
        "inline-flex items-center justify-center rounded-[16px] border border-[rgba(194,163,93,0.36)] bg-[linear-gradient(180deg,rgba(194,163,93,0.92),rgba(166,139,74,0.95))] px-5 py-3 font-display text-xs uppercase tracking-[0.22em] text-[#08111d] transition duration-300 hover:-translate-y-0.5 hover:bg-[linear-gradient(180deg,rgba(244,241,234,0.96),rgba(194,163,93,0.96))] disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
