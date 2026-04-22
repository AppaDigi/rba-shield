import { notFound } from "next/navigation";
import { getPortalContext } from "@/lib/portal/auth";
import { getRequestDetail } from "@/lib/portal/queries";
import { RequestThread } from "@/components/portal/RequestThread";

export default async function MemberRequestDetailPage({
  params,
}: {
  params: Promise<{ requestId: string }>;
}) {
  await getPortalContext("member");
  const { requestId } = await params;
  const detail = await getRequestDetail(requestId, "member");

  if (!detail) {
    notFound();
  }

  return (
    <RequestThread
      role="member"
      detail={detail}
      returnTo="/dashboard/member"
    />
  );
}
