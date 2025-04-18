"use client";
import loginFromCode from "@/actions/loginFromCode";
import Spinner from "@/components/Spinner";
import WayneHacksLogo from "@/components/WayneHacksLogo";
import useCaptcha from "@/components/useCaptcha";
import { useSearchParams } from "next/navigation";
import { useFormStatus } from "react-dom";
import React from "react";

function ConfirmButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className="wh-btn"
      disabled={pending}
      aria-disabled={pending}
      type="submit"
    >
      {pending ? <Spinner /> : "Confirm account"}
    </button>
  );
}

function ConfirmAccount() {
  const { HCaptcha, isLoading, token, setToken } = useCaptcha();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const email = searchParams.get("email");
  return (
    <div className="flex-1 animate-in flex flex-col w-full px-8 sm:max-w-md md:max-w-xl justify-center gap-2">
      {!isLoading ? (
        <form
          action={loginFromCode}
          className="flex-1 flex flex-col w-full justify-center gap-2 text-black py-6"
        >
          <div className="mb-12">
            <WayneHacksLogo />
            <h2 className="wh-subheading mt-5">Confirm your account</h2>
          </div>
          <label htmlFor="email">Email</label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border border-gray-700 mb-6"
            type="email"
            name="email"
            defaultValue={email ?? ""}
            placeholder="test@example.edu"
            required
          />

          <label htmlFor="code">Confirm code</label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border border-gray-700 mb-6"
            type="password"
            name="code"
            defaultValue={code ?? ""}
            placeholder="123456"
            required
          />
          <input type="hidden" name="captcha" value={token ?? ""} />
          <div className="flex flex-col w-full items-center">
            {!token && (
              <p className="text-sm text-gray-600">
                Please complete the captcha below to continue{" "}
              </p>
            )}
            {token ? <ConfirmButton /> : <HCaptcha />}
          </div>
        </form>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default ConfirmAccount;
