import { PortalShell } from "@/components/portal/PortalShell";
import { getPortalContext } from "@/lib/portal/auth";

export default async function AttorneyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const context = await getPortalContext("attorney");

  return (
    <PortalShell
      role="attorney"
      name={context.profile.name}
      subtitle={context.profile.jurisdiction || `@${context.profile.username}`}
      activeHref="/dashboard/attorney"
    >
      {children}
    </PortalShell>
  );
}
