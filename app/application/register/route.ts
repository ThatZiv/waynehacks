import DiscordWebhook from "@/misc/discord";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();

  const supabase = createRouteHandlerClient({ cookies });
  const fields = [
    "full_name",
    "graduation_year",
    "university",
    "major",
    "phone_number",
    "diet",
    "student_id",
  ];
  const nonRequiredFields = ["diet"];
  try {
    const form = {} as any;
    let toDiscord = ''
    for (const field of fields) {
      let val = formData.get(field);
      toDiscord += `${field}: ||${val}||\n`
      if (!nonRequiredFields.includes(field) && !val)
        throw new Error(`Missing required field '${field}'`);
      form[field] = formData.get(field);
    }
    const {
      data: { user },
    } = await supabase.auth.getUser(); // get user id
    toDiscord = `${user?.email} - ` + toDiscord
    const { error: applicationErr } = await supabase
      .from("applications")
      .upsert({ applicant_id: user?.id, email: user?.email, ...form });
    if (applicationErr) throw applicationErr;

    // NOTE:
    // The current supabase policy for status will only allow update IF:
    // - The prior status IS NOT 'rejected'
    // OR
    // - The user is an admin

    // const { error: statusError } = await supabase
    //   .from("applications")
    //   .insert({ applicant_id: user?.id, ...form });
    // The implementation above is currently a supabase function that runs after an insertion in 'applications' table
    new DiscordWebhook()
      .send('New application', toDiscord, `mailto:${user?.email}`)
      .catch(console.error);
  } catch (error: any) {
    let err = error.message;
    return NextResponse.redirect(
      `${requestUrl.origin}/application?error=${err}`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    );
  }
  revalidatePath("/admin");
  revalidateTag("count_applicants") // recalculate num applicants on home page

  return NextResponse.redirect(
    `${requestUrl.origin}/application?message=Your information has been submitted`,
    {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    }
  );
}
