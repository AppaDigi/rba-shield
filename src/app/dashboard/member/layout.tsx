import { PortalShell } from "@/components/portal/PortalShell";
import { getPortalContext } from "@/lib/portal/auth";

export default async function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const context = await getPortalContext("member");

  return (
    <PortalShell
      role="member"
      name={context.profile.name}
      subtitle={`@${context.profile.username}`}
      activeHref="/dashboard/member"
    >
      {children}
    </PortalShell>
  );
}
