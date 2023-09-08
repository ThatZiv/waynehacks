"use client";
import Link from "next/link";
import Messages from "../../components/messages";
import Back from "@/components/Back";
import useCaptcha from "@/components/useCaptcha";
import WayneHacksLogo from "@/components/WayneHacksLogo";
import React from "react";
import { resetPassword } from "@/actions/forgetPassword";

export default function Login() {
  const [showForgetPassword, setForgetPassword] =
    React.useState<boolean>(false);
  const { HCaptcha, isLoading, token, setToken } = useCaptcha();

  return (
    <div className="flex-1 animate-in flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Back />

      <form
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action="/auth/sign-in"
        method="post"
      >
        <div className="mb-12">
          <WayneHacksLogo />
        </div>

        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        {!showForgetPassword && (
          <>
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
          </>
        )}

        <div className="flex flex-col w-full items-center">
          {!token && <HCaptcha />}
        </div>
        {token &&
          (showForgetPassword ? (
            <>
              <button
                className="bg-green-900 rounded px-4 py-2 text-white mb-2"
                formAction={resetPassword}
              >
                Send recovery to email
              </button>
              <input type="hidden" name="captcha" value={token ?? ""} />
            </>
          ) : (
            <>
              <button
                className="bg-green-900 rounded px-4 py-2 text-white mb-2"
                disabled={isLoading || !token}
              >
                Sign In
              </button>
              <input type="hidden" name="captcha" value={token ?? ""} />
              <button
                formAction="/auth/sign-up"
                className="border border-gray-700 rounded px-4 py-2 mb-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  setToken(null);
                }}
                disabled={isLoading || !token}
              >
                Sign Up
              </button>
            </>
          ))}
      </form>
      <p
        onClick={() => setForgetPassword((s) => !s)}
        className="text-center text-green-800 hover:underline cursor-pointer"
      >
        Forgot password?
      </p>
    </div>
  );
}
