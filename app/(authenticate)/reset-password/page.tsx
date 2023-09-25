"use client";
import WayneHacksLogo from "@/components/WayneHacksLogo";

import { redirect, useSearchParams } from "next/navigation";
import useCaptcha from "@/components/useCaptcha";
export const dynamic = "force-dynamic";
export default async function Forgot() {
  const { HCaptcha, isLoading, token, setToken } = useCaptcha();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const email = searchParams.get("email");

  return (
    <div className="flex-1 animate-in flex flex-col w-full px-8 sm:max-w-md justify-center items-center gap-2">
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
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="email"
          name="email"
          placeholder="test@example.edu"
          defaultValue={email ?? ""}
          required
        />
        <label className="text-md" htmlFor="code">
          Login code
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="code"
          placeholder="123456"
          defaultValue={code ?? ""}
          required
        />
        <label className="text-md" htmlFor="password">
          New password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <input type="hidden" name="captcha" value={token ?? ""} />
        <label className="text-md" htmlFor="confirm_password">
          Confirm new password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="confirm_password"
          placeholder="••••••••"
          required
        />
        <div className="flex flex-col w-full items-center">
          {token ? (
            <button
              className="bg-yellow-400 rounded px-4 py-2 text-black font-bold mb-2"
              type="submit"
            >
              Change password
            </button>
          ) : (
            <HCaptcha />
          )}
        </div>
      </form>
    </div>
  );
}
