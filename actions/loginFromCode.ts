"use server"

import { DiscordWebhook, hcaptchaCheck } from "@/misc/functions";
import {
    createServerActionClient,
    createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export default async function loginFromCode(e: FormData) {
    const email = e.get("email");
    const code = e.get("code");
    const token = e.get("captcha");
    try {
        const supabase = createServerActionClient({ cookies });
        if (!email || !code || !token) throw new Error("Missing required fields")

        if (!(await hcaptchaCheck(String(token)))) {
            throw new Error("Invalid captcha (refresh page)")
        }
        const { data, error } = await supabase.auth.verifyOtp({
            email: String(email),
            type: "signup",
            token: String(code),
            options: { captchaToken: String(token) }
        });
        if (error) throw error
    } catch (e: any) {
        return redirect("/confirm-account?error=" + e.message);
    } finally {
        revalidatePath("/confirm-account")
    }
    await new DiscordWebhook().send(`User confirmed`, `||${String(email)}|| has confirmed their account.`)
    return redirect("/?message=Account confirmed")
}