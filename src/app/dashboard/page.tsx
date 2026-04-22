import { redirect } from "next/navigation";
import { getPortalContext } from "@/lib/portal/auth";
import { getDashboardHref } from "@/lib/portal/constants";

export default async function DashboardPage() {
  const context = await getPortalContext();
  redirect(getDashboardHref(context.role));
}
