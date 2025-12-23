"use server";

import { hcaptchaCheck } from "@/misc/functions";
import { Notifier } from "@/misc/webhook/WebhookService";
import { createServerClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function loginFromCode(e: FormData) {
  const email = e.get("email");
  const code = e.get("code");
  const token = e.get("captcha");
  try {
    const supabase = await createServerClient();
    if (!email || !code || !token) throw new Error("Missing required fields");

    if (!(await hcaptchaCheck(String(token)))) {
      throw new Error("Invalid captcha (refresh page)");
    }
    const { data, error } = await supabase.auth.verifyOtp({
      email: String(email),
      type: "signup",
      token: String(code),
      options: { captchaToken: String(token) },
    });
    if (error) throw error;
  } catch (e: any) {
    return redirect("/confirm-account?error=" + e.message);
  } finally {
    revalidatePath("/confirm-account");
  }
  await Notifier.send(
    `User confirmed`,
    `||${String(email)}|| has confirmed their account.`
  );
  return redirect("/?message=Account confirmed");
}
