import WayneHacksLogo from "@/components/WayneHacksLogo";
import {
  createServerActionClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";
export default async function Forgot() {
  "use server";
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?message=You must be logged in to proceed.");
  // const changePassword = async (e: FormData) => {
  // @deprecated this is now a method in /auth/change-password
  //   "use server";
  //   const password = String(e.get("password"));
  //   const confirm_password = String(e.get("confirm_password"));
  //   if (password !== confirm_password)
  //     return redirect("/reset-password?error=Password mismatch");
  //   const supabase = createServerActionClient({ cookies });

  //   const { data, error } = await supabase.auth.updateUser({ password }); // make forget password page
  //   if (error) return redirect("/reset-password?error=" + error.message);

  //   redirect("/?message=Successfully changed password");
  // };
  return (
    <div className="flex-1 animate-in flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        method="post"
        action="/auth/change-password"
      >
        <div className="mb-12">
          <WayneHacksLogo />
        </div>
        <h2 className="lg:text-4xl md:text-3xl text-2xl text-center">
          Reset your password
        </h2>
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <label className="text-md" htmlFor="confirm_password">
          Confirm password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="confirm_password"
          placeholder="••••••••"
          required
        />
      </form>
    </div>
  );
}
