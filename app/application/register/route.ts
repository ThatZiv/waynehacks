import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
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
    for (const field of fields) {
      let val = formData.get(field);
      if (!nonRequiredFields.includes(field) && !val)
        throw new Error(`Missing required field '${field}'`);
      form[field] = formData.get(field);
    }
    const {
      data: { user },
    } = await supabase.auth.getUser(); // get user id
    const { error: applicationErr } = await supabase
      .from("applications")
      .insert({ applicant_id: user?.id, email: user?.email, ...form });
    if (applicationErr) throw applicationErr;

    // const { error: statusError } = await supabase
    //   .from("applications")
    //   .insert({ applicant_id: user?.id, ...form });


  } catch (error: any) {
    let err = error.message;
    console.log(error);
    return NextResponse.redirect(
      `${process.env.NODE_ENV === "development" ? requestUrl.origin : ""
      }/application?error=${err}`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    );
  }

  return NextResponse.redirect(
    `${requestUrl.origin}/application?message=Your information has been submitted`,
    {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    }
  );
}
