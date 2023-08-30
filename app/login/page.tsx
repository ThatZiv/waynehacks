"use client";
import Link from "next/link";
import Messages from "./messages";
import Back from "@/components/Back";
import useCaptcha from "@/components/useCaptcha";
export default function Login() {
  const { HCaptcha, isLoading, token, setToken } = useCaptcha();
  return (
    <div className="flex-1 animate-in flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Back />

      <form
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action="/auth/sign-in"
        method="post"
      >
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
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
        <button className="bg-green-700 rounded px-4 py-2 text-white mb-2">
          Sign In
        </button>
        <div className="flex flex-col w-full items-center">
          <HCaptcha />
        </div>
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
        <Messages />
      </form>
    </div>
  );
}
