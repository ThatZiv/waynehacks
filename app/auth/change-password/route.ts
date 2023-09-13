import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// TODO: test POST handler to change password
export async function POST(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the Auth Helpers package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
  const requestUrl = new URL(request.url);
  const e = await request.formData();
  const password = String(e.get("password"));
  const confirm_password = String(e.get("confirm_password"));
  if (password !== confirm_password) {
    return NextResponse.redirect(
      `${requestUrl.origin}/reset-password?error=Password mismatch`,
      {
        status: 301,
      }
    );
  }
  const supabase = createRouteHandlerClient({ cookies });

  const { data, error } = await supabase.auth.updateUser({ password }); // make forget password page
  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}/reset-password?error=${error.message}`,
      {
        status: 301,
      }
    );
  }
  return NextResponse.redirect(
    `${requestUrl.origin}/?message=Successfully changed password`,
    {
      status: 301,
    }
  );
}
