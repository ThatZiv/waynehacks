import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const requestUrl = new URL(req.url);
  const e = await req.formData();
  const supabase = createRouteHandlerClient({ cookies });
  const email = String(e.get("email"));
  const captcha = String(e.get("captcha"));
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "https://www.waynehacks.com/auth/callback?next=/reset-password/",
    captchaToken: captcha,
  });
  if (error)
    return NextResponse.redirect(
      requestUrl.origin + "/login?error=" + error.message,
      {
        status: 301,
      }
    );
  return NextResponse.redirect(
    requestUrl.origin +
    "/?message=Please check your email for resetting your password",
    {
      status: 301,
    }
  );
}
