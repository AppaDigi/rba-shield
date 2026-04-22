import { notFound } from "next/navigation";
import {
  claimRequestAction,
  updateRequestStatusAction,
} from "@/app/dashboard/actions";
import { FormStatusButton } from "@/components/portal/FormStatusButton";
import { RequestThread } from "@/components/portal/RequestThread";
import { getPortalContext } from "@/lib/portal/auth";
import { REQUEST_STATUS_OPTIONS } from "@/lib/portal/constants";
import { getRequestDetail } from "@/lib/portal/queries";

export default async function AttorneyRequestDetailPage({
  params,
}: {
  params: Promise<{ requestId: string }>;
}) {
  const context = await getPortalContext("attorney");
  const { requestId } = await params;
  const detail = await getRequestDetail(requestId, "attorney");

  if (!detail) {
    notFound();
  }

  const canManage =
    !detail.request.claimedAttorney ||
    detail.request.claimedAttorney.id === context.userId;

  const claimControls = !detail.request.claimedAttorney ? (
    <form action={claimRequestAction} className="space-y-3">
      <input type="hidden" name="request_id" value={detail.request.id} />
      <input type="hidden" name="return_to" value={`/dashboard/attorney/requests/${detail.request.id}`} />
      <FormStatusButton pendingLabel="Claiming..." className="w-full">
        Claim Request
      </FormStatusButton>
    </form>
  ) : null;

  const statusControls = (
    <form action={updateRequestStatusAction} className="space-y-3">
      <input type="hidden" name="request_id" value={detail.request.id} />
      <input type="hidden" name="return_to" value={`/dashboard/attorney/requests/${detail.request.id}`} />
      <label className="block space-y-2">
        <span className="text-[11px] uppercase tracking-[0.28em] text-[rgba(244,241,234,0.56)]">
          Update Status
        </span>
        <select
          name="status"
          defaultValue={detail.request.status}
          disabled={!canManage}
          className="w-full rounded-[16px] border border-white/10 bg-[rgba(7,12,19,0.9)] px-4 py-3 text-sm text-[var(--warm-white)] outline-none disabled:opacity-60"
        >
          {REQUEST_STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <FormStatusButton pendingLabel="Updating..." className="w-full">
        Save Status
      </FormStatusButton>
    </form>
  );

  return (
    <RequestThread
      role="attorney"
      detail={detail}
      returnTo="/dashboard/attorney"
      canManage={canManage}
      claimControls={claimControls}
      statusControls={statusControls}
    />
  );
}
