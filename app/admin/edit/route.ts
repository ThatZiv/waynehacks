import { createEmailURI } from "@/components/AdminCard";
import { EmailerService } from "@/misc/Emailer";
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
    const email = String(e.get("email"));
    const note = String(e.get("note"));
    const applicant_id = String(e.get("applicant_id"));
    const supabase = createRouteHandlerClient({ cookies });
    let checked_in = e.get("checked_in") === "on" ? true : false; // this is a checkbox
    const { data: previousStatusState, error: statusErr } = await supabase
      .from("status")
      .select("*")
      .eq("applicant_id", applicant_id)
      .single();

    if (statusErr) throw statusErr;

    const { error } = await supabase
      .from("status")
      .update({
        status: String(e.get("status")).toLowerCase(),
        note,
        checked_in,
        modified_at: new Date(),
      })
      .eq("applicant_id", applicant_id);

    revalidatePath(`/admin/application/${applicant_id}`);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (error) throw error;
    // this is whether the update is solely for when they checked in or not
    let IsCheckInUpdate =
      previousStatusState?.checked_in !== checked_in &&
      previousStatusState?.status?.toLowerCase() ===
        String(e.get("status")).toLowerCase() &&
      previousStatusState?.note === note;
    if (IsCheckInUpdate) {
      await Notifier.send(
        `Checked in status changed by ${user?.email}`,
        `${email} checked in status is now: **${checked_in ? "✔" : "❌"}**`,
        requestUrl.origin + "/admin/application/" + applicant_id
      );
    } else {
      await Notifier.send(
        `Application update by ${user?.email}`,
        `${email} status is now **${e.get("status")}** \n\`${e.get(
          "note"
        )}\` \nChecked In: ${checked_in ? "✔" : "❌"}`,
        requestUrl.origin + "/admin/application/" + applicant_id
      );
    }
    // revalidatePath("/admin/applications"); // this is live/dynamic now
    // requestUrl.origin + "/admin/redirect?url=" + createEmailURI({
    //   email: String(email),
    //   status: String(e.get("status")),
    //   note: String(note),
    //   full_name: String(e.get("full_name")),
    // })
    let successMessage = `Successfully updated application for: ${e.get(
      "applicant_id"
    )}`;

    const Emailer = new EmailerService();
    if (IsCheckInUpdate) {
      await Emailer.sendEmail({
        to: String(email),
        subject: checked_in
          ? "You have been checked in"
          : "You have been checked out",
        html: `
        <p>Thank you for <strong>${
          checked_in ? "checking in" : "checking out"
        }</strong> at WayneHacks</p>
        <br>
        <p>View your application <a href="${
          requestUrl.origin
        }/application">here</a></p>
      `,
      });
    } else {
      await Emailer.sendEmail({
        to: String(email),
        subject: "Application Update",
        html: `
        <p>Your application has been <strong>${e.get("status")}</strong></p>
        <br>
        <p><strong>Note:</strong> ${note}</p>
        <p>View your application <a href="${
          requestUrl.origin
        }/application">here</a></p>
      `,
      });
    }

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
        message: successMessage,
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
