import { createEmailURI } from "@/components/AdminCard";
import { DiscordWebhook } from "@/misc/functions";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  try {
    const e = await request.formData();
    const supabase = createRouteHandlerClient({ cookies });
    const { error } = await supabase
      .from("status")
      .update({
        status: String(e.get("status")).toLowerCase(),
        note: e.get("note"),
        modified_at: new Date(),
      })
      .eq("applicant_id", e.get("applicant_id"));
    const { data: { user } } = await supabase.auth.getUser();
    if (error) throw error;
    revalidatePath("/admin/applications");
    revalidatePath("/admin/application"); // revalidate EVERYONE's application
    // requestUrl.origin + "/admin/redirect?url=" + createEmailURI({
    //   email: String(e.get("email")),
    //   status: String(e.get("status")),
    //   note: String(e.get("note")),
    //   full_name: String(e.get("full_name")),
    // })
    new DiscordWebhook()
      .send(`Application update by ${user?.email}`,
        `${e.get("email")} status is now **${e.get("status")}** \n\`${e.get("note")}\``,
        requestUrl.origin + "/admin/application/" + e.get("applicant_id")
      )
      .catch(console.error);
    return NextResponse.redirect(
      `${requestUrl.origin
      }/admin?tick=${Math.random()}&message=Successfully updated application for: ${e.get(
        "applicant_id"
      )}`,
      {
        status: 301,
      }
    );
  } catch (err: any) {
    return NextResponse.redirect(
      `${requestUrl.origin}/admin?error=${err.message}`,
      {
        status: 301,
      }
    );
  }
}
