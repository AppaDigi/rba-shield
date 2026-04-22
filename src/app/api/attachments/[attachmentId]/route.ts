import { NextResponse, type NextRequest } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const STORAGE_BUCKET = "request-attachments";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ attachmentId: string }> },
) {
  const params = await context.params;
  const supabase = await createServerSupabaseClient();
  const { data: attachment } = await supabase
    .from("request_attachments")
    .select("id, file_path")
    .eq("id", params.attachmentId)
    .single();

  if (!attachment) {
    return NextResponse.json({ error: "Attachment not found." }, { status: 404 });
  }

  const admin = createAdminSupabaseClient();
  const { data, error } = await admin.storage
    .from(STORAGE_BUCKET)
    .createSignedUrl(attachment.file_path, 60);

  if (error || !data?.signedUrl) {
    return NextResponse.json(
      { error: error?.message ?? "Unable to create file access link." },
      { status: 400 },
    );
  }

  return NextResponse.redirect(data.signedUrl);
}
