import WayneHacksLogo from "@/components/WayneHacksLogo";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export default async function Forgot() {
  const changePassword = async (e: FormData) => {
    const password = String(e.get("password"));
    const supabase = createServerActionClient({ cookies });

    const { data, error } = await supabase.auth.updateUser({ password }); // make forget password page
    if (error) return redirect("/login/forgot?error=" + error.message);

    redirect("/?message=Successfully changed password");
  };
  return (
    <div className="flex-1 animate-in flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action={changePassword}
      >
        <div className="mb-12">
          <WayneHacksLogo />
        </div>
        <h2 className="lg:text-4xl md:text-3xl text-2xl text-center">
          Reset your password
        </h2>
      </form>
    </div>
  );
}
