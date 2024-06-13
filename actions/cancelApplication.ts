"use server";
import { Application, statusEnum } from "@/misc/application";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Notifier } from "@/misc/webhook/WebhookService";

export const cancelApplication = async (e: FormData) => {
  const applicant_id = e.get("applicant_id");
  const supabase = createRouteHandlerClient({ cookies });
  const { error } = await supabase
    .from("status")
    .update({
      status: statusEnum.CANCELLED,
      modified_at: new Date(),
    })
    .eq("applicant_id", applicant_id);
  if (error) {
    console.error(error.message);
    return redirect("/application?error=" + error.message);
  }
  revalidatePath("/application");
  let adminUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/application/${applicant_id}`;
  await Notifier.send(
    "Application Cancelled",
    `[${applicant_id}](${adminUrl}) has withdrawn their application`,
    adminUrl
  );
  return redirect(
    "/application?message=Your application has been withdrawn (cancelled)"
  );
};
