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
  try {
    if (!email || !password) throw new Error("Email and password are required");
    if (!email.endsWith(".edu"))
      throw new Error(
        "Please use your University email address ending in `.edu`"
      );
    // console.log(
    //   await supabase.from("users").select("email").eq("email", email)
    // );
    // if (await supabase.from("users").select("email").eq("email", email)) {
    //   throw new Error("Email is already being used by someone else");
    // }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${requestUrl.origin}/auth/callback`,
        captchaToken: captcha,
      },
    });
    if (error) throw error;
  } catch (error: any) {
    let err = error.message;
    return NextResponse.redirect(`${requestUrl.origin}/login?error=${err}`, {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    });
  }

  return NextResponse.redirect(
    `${requestUrl.origin}/login?message=Check email to continue sign in process`,
    {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    }
  );
}
