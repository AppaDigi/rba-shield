import { redirect } from "next/navigation";
import type { JwtPayload } from "@supabase/auth-js";
import type { PortalRole } from "@/lib/supabase/database.types";
import { getDashboardHref } from "@/lib/portal/constants";
import { createServerSupabaseClient } from "@/lib/supabase/server";

type MemberProfile = {
  id: string;
  username: string;
  name: string;
  email: string;
};

type AttorneyProfile = {
  id: string;
  username: string;
  name: string;
  email: string;
  jurisdiction: string | null;
  areas_of_practice: string[];
};

export type PortalContext =
  | {
      role: "member";
      userId: string;
      email: string | null;
      profile: MemberProfile;
    }
  | {
      role: "attorney";
      userId: string;
      email: string | null;
      profile: AttorneyProfile;
    }
  | {
      role: "admin";
      userId: string;
      email: string | null;
      profile: null;
    };

type MemberContext = Extract<PortalContext, { role: "member" }>;
type AttorneyContext = Extract<PortalContext, { role: "attorney" }>;

function getRoleFromClaims(claims: JwtPayload | null | undefined): PortalRole | null {
  const maybeRole = claims?.app_metadata?.portal_role;

  if (
    maybeRole === "member" ||
    maybeRole === "attorney" ||
    maybeRole === "admin"
  ) {
    return maybeRole;
  }

  return null;
}

export async function getPortalContext(): Promise<PortalContext>;
export async function getPortalContext(
  expectedRole: "member",
): Promise<MemberContext>;
export async function getPortalContext(
  expectedRole: "attorney",
): Promise<AttorneyContext>;
export async function getPortalContext(
  expectedRole?: Exclude<PortalRole, "admin">,
): Promise<PortalContext> {
  const supabase = await createServerSupabaseClient();
  const {
    data: claimsData,
    error: claimsError,
  } = await supabase.auth.getClaims();

  if (claimsError || !claimsData?.claims?.sub) {
    redirect("/login");
  }

  const userId = claimsData.claims.sub;
  const role = getRoleFromClaims(claimsData.claims);

  if (!role) {
    redirect("/login?error=role");
  }

  if (expectedRole && role !== expectedRole) {
    redirect(getDashboardHref(role));
  }

  if (role === "member") {
    const { data: profile } = await supabase
      .from("members")
      .select("id, username, name, email")
      .eq("id", userId)
      .single();

    if (!profile) {
      redirect("/login?error=profile");
    }

    return {
      role,
      userId,
      email: claimsData.claims.email ?? null,
      profile,
    };
  }

  if (role === "attorney") {
    const { data: profile } = await supabase
      .from("attorneys")
      .select("id, username, name, email, jurisdiction, areas_of_practice")
      .eq("id", userId)
      .single();

    if (!profile) {
      redirect("/login?error=profile");
    }

    return {
      role,
      userId,
      email: claimsData.claims.email ?? null,
      profile,
    };
  }

  return {
    role,
    userId,
    email: claimsData.claims.email ?? null,
    profile: null,
  };
}
