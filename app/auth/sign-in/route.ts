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
  const next = requestUrl.searchParams.get("next");
  const supabase = createRouteHandlerClient({ cookies });

  if (!email || !password || !captcha) {
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=Email and password are required`,
      {
        status: 301,
      }
    );
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
    options: {
      captchaToken: captcha,
    },
  });

  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=Failed to authenticate`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    );
  }

  return NextResponse.redirect(requestUrl.origin + (next || ""), {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  });
}
