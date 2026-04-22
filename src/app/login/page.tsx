import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { LoginPortal } from "@/components/portal/LoginPortal";

export const metadata = {
  title: "RBA Shield Portal Login",
  description:
    "Secure member and attorney portal access for RBA Shield legal aid requests.",
};

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col">

      {/* Background radial glows */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_18%_22%,rgba(194,163,93,0.09),transparent_30%),radial-gradient(ellipse_at_82%_8%,rgba(122,31,31,0.08),transparent_28%),radial-gradient(ellipse_at_50%_65%,rgba(58,90,122,0.08),transparent_38%)]" />

      {/* Header — 76px matching main nav */}
      <header className="relative z-10 flex h-[76px] shrink-0 items-center justify-between border-b border-[rgba(244,241,234,0.07)] px-8 backdrop-blur-md lg:px-14">
        <Link href="/" className="inline-flex items-center gap-3">
          <Logo className="h-9 w-9 text-[var(--brass)]" />
          <div>
            <div className="font-display text-[1.05rem] uppercase tracking-[0.1em] text-[var(--warm-white)]">
              RBA Shield
            </div>
            <div className="text-[9px] uppercase tracking-[0.28em] text-[rgba(244,241,234,0.44)]">
              Member Portal
            </div>
          </div>
        </Link>
        <Link
          href="/"
          className="text-[11px] uppercase tracking-[0.2em] text-[rgba(244,241,234,0.44)] transition-colors hover:text-[var(--brass)]"
        >
          ← Main Site
        </Link>
      </header>

      <LoginPortal />

    </div>
  );
}
