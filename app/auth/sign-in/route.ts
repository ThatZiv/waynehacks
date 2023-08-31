import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const captcha = String(formData.get("captcha"));
  const supabase = createRouteHandlerClient({ cookies });

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
    options: {
      captchaToken: captcha,
    },
  });

  if (error) {
    return NextResponse.redirect(
      `${
        process.env.NODE_ENV === "development" ? requestUrl.origin : ""
      }/login?error=Failed to authenticate`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    );
  }

  return NextResponse.redirect(
    process.env.NODE_ENV === "development" ? requestUrl.origin : "/",
    {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    }
  );
}
