import { SupabaseFunctions } from "@/misc/functions";
import { Notifier } from "@/misc/webhook/WebhookService";
import { createServerClient } from "@/lib/supabase";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const confirmPassword = String(formData.get("confirm-password"));
  const captcha = String(formData.get("captcha"));
  const supabase = await createServerClient();
  const sbFunc = new SupabaseFunctions(supabase);
  try {
    if (!email || !password || !confirmPassword)
      throw new Error("Email and password are required");
    if (password !== confirmPassword) throw new Error("Passwords do not match");
    if (!email.endsWith(".edu"))
      throw new Error(
        "Please use your University email address ending in `.edu`"
      );

    if (!captcha) throw new Error("Captcha is required");

    if (await sbFunc.emailExists(email)) {
      throw new Error(
        'Email is already being used. If you forgot your password, please click "Forgot Password?" below.'
      );
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${requestUrl.origin}/auth/callback`,
        captchaToken: captcha,
      },
    });
    if (error) throw error;
    await Notifier.send(`New sign up`, `||${email}|| has signed up.`);
  } catch (error: any) {
    let err = error.message;
    return NextResponse.redirect(`${requestUrl.origin}/login?error=${err}`, {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    });
  }

  return NextResponse.redirect(
    `${requestUrl.origin}/login?message=Check your email to confirm your account. It may take a while to arrive, so also check your spam/junk folder.`,
    {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    }
  );
}
