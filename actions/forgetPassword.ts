"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const resetPassword = async (e: FormData) => {
  const email = String(e.get("email"));
  const captcha = String(e.get("captcha"));

  const supabase = createServerActionClient({ cookies });

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo:
      (process.env.NEXT_PUBLIC_BASE_URL || "https://waynehacks.com") +
      "/auth/callback?next=/reset-password",
    captchaToken: captcha,
  });
  if (error) redirect("/login?error=" + error.message);
  redirect("/?message=Please check your email for resetting your password");
};
