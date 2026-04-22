"use server";

import { redirect } from "next/navigation";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getDashboardHref } from "@/lib/portal/constants";
import type { PortalRole } from "@/lib/supabase/database.types";

export type LoginFormState = {
  error?: string;
};

function normalizeIdentifier(identifier: string) {
  return identifier.trim().toLowerCase();
}

export async function loginAction(
  _previousState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const role = formData.get("role");
  const identifier = formData.get("identifier");
  const password = formData.get("password");

  if (
    (role !== "member" && role !== "attorney") ||
    typeof identifier !== "string" ||
    typeof password !== "string"
  ) {
    return { error: "Enter your account type, username, and password." };
  }

  const normalizedIdentifier = normalizeIdentifier(identifier);

  if (!normalizedIdentifier || !password.trim()) {
    return { error: "Username and password are both required." };
  }

  const admin = createAdminSupabaseClient();
  const table = role === "attorney" ? "attorneys" : "members";
  const lookupColumn = normalizedIdentifier.includes("@") ? "email" : "username";
  const { data: profile } = await admin
    .from(table)
    .select("email")
    .eq(lookupColumn, normalizedIdentifier)
    .single();

  if (!profile?.email) {
    return { error: "We could not find an account matching that login." };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: profile.email,
    password,
  });

  if (error) {
    return { error: "Login failed. Check your credentials and try again." };
  }

  const { data: claimsData } = await supabase.auth.getClaims();
  const signedInRole = claimsData?.claims?.app_metadata?.portal_role as
    | PortalRole
    | undefined;

  if (signedInRole !== role) {
    await supabase.auth.signOut();
    return {
      error:
        "That account exists, but not under the user type you selected. Switch the toggle and try again.",
    };
  }

  redirect(getDashboardHref(role));
}

export async function logoutAction() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/login");
}
