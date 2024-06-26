import { createEmailURI } from "@/components/AdminCard";
import { Notifier } from "@/misc/webhook/WebhookService";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
// this route has been modified to be used directly from a client (admin panel)
export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  try {
    const e = await request.formData();
    const supabase = createRouteHandlerClient({ cookies });
    let checked_in = e.get("checked_in") === "on" ? true : false; // this is a checkbox
    const { error } = await supabase
      .from("status")
      .update({
        status: String(e.get("status")).toLowerCase(),
        note: e.get("note"),
        checked_in,
        modified_at: new Date(),
      })
      .eq("applicant_id", e.get("applicant_id"));
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (error) throw error;
    // revalidatePath("/admin/applications"); // this is live/dynamic now
    revalidatePath(`/admin/application/${e.get("applicant_id")}`); // revalidate EVERYONE's application
    // requestUrl.origin + "/admin/redirect?url=" + createEmailURI({
    //   email: String(e.get("email")),
    //   status: String(e.get("status")),
    //   note: String(e.get("note")),
    //   full_name: String(e.get("full_name")),
    // })
    await Notifier.send(
      `Application update by ${user?.email}`,
      `${e.get("email")} status is now **${e.get("status")}** \n\`${e.get(
        "note"
      )}\` \nChecked In: ${checked_in ? "✔" : "❌"}`,
      requestUrl.origin + "/admin/application/" + e.get("applicant_id")
    );
    // return NextResponse.redirect(
    //   `${
    //     requestUrl.origin
    //   }/admin?tick=${Math.random()}&message=Successfully updated application for: ${e.get(
    //     "applicant_id"
    //   )}`,
    //   {
    //     status: 301,
    //   }
    // );
    // send message back to the client instead
    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully updated application for: ${e.get(
          "applicant_id"
        )}`,
      }),
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
  } catch (err: any) {
    // return NextResponse.redirect(
    //   `${requestUrl.origin}/admin?error=${err.message}`,
    //   {
    //     status: 301,
    //   }
    // );
    return new Response(
      JSON.stringify({
        success: false,
        message: err.message,
      }),
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
  }
}
