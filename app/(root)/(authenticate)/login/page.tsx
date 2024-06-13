"use client";
import Back from "@/components/Back";
import useCaptcha from "@/components/useCaptcha";
import WayneHacksLogo from "@/components/WayneHacksLogo";
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import Spinner from "@/components/Spinner";
import constants from "@/misc/constants";

const FormContext = React.createContext({
  pending: false,
  setPending: (pending: boolean): void => {},
  action: "",
  setAction: (action: string): void => {},
  params: new URLSearchParams(),
});

function Submit({
  children,
  route,
}: {
  children: React.ReactNode;
  route: string;
}) {
  const { pending, setPending, setAction, action, params } =
    React.useContext(FormContext);
  const router = useRouter();
  return (
    <button
      className="wh-btn"
      disabled={pending}
      aria-disabled={pending}
      formAction={route}
      onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let newSearchParams = `?next=${encodeURIComponent(
          String(params.get("next") || "")
        )}`;
        let newAction = route + newSearchParams;
        if (
          route.startsWith("/auth/sign-in") ||
          route.startsWith("/auth/sign-up")
        ) {
          const form = e.currentTarget.form;
          if (!form?.email.value || !form?.password.value) {
            // redirect to login with same query params but add next and message=missing params
            router.push(
              window.location.pathname +
                newSearchParams +
                "&error=Please enter an email and password."
            );
            return;
          }
        }
        setPending(true);
        setAction(newAction);
        e.currentTarget.form?.setAttribute("action", newAction);
        e.currentTarget.form?.submit();
      }}
      formMethod="post"
    >
      {pending ? <Spinner /> : children}
    </button>
  );
}

export default function Login() {
  const params = useSearchParams();
  const [pending, setPending] = React.useState<boolean>(false);
  const [action, setAction] = React.useState<string>(
    `/auth/sign-in?next=${encodeURIComponent(String(params.get("next") || ""))}`
  );
  const [showForgetPassword, setForgetPassword] =
    React.useState<boolean>(false);
  const [isSignup, setSignup] = React.useState<boolean>(
    params.get("signup") === "true"
  );
  const { HCaptcha, isLoading, token, setToken } = useCaptcha();

  return (
    <div className="flex-1 animate-in flex flex-col w-full px-8 sm:max-w-md md:max-w-xl justify-center gap-2">
      <Back />
      <FormContext.Provider
        value={{ pending, setPending, action, setAction, params }}
      >
        <form
          className="flex-1 flex flex-col w-full justify-center gap-2 text-black"
          action={action}
          method="post"
        >
          <div className="mb-12">
            <WayneHacksLogo />
            <h2 className="wh-subheading mt-5">
              {isSignup ? "Create an account" : "Log in"}
            </h2>
          </div>

          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border border-gray-700 mb-6"
            name="email"
            type="email"
            placeholder="you@example.edu"
            required
          />
          {!showForgetPassword && (
            <>
              <label className="text-md" htmlFor="password">
                Password
              </label>
              <input
                className="rounded-md px-4 py-2 bg-inherit border border-gray-700 mb-6"
                type="password"
                name="password"
                placeholder="••••••••"
                required
              />
              {isSignup && (
                <>
                  <label className="text-md" htmlFor="confirm-password">
                    Confirm Password
                  </label>
                  <input
                    className="rounded-md px-4 py-2 bg-inherit border border-gray-700 mb-6"
                    type="password"
                    name="confirm-password"
                    placeholder="••••••••"
                    required
                  />
                </>
              )}
            </>
          )}

          <div className="flex flex-col w-full items-center">
            {!showForgetPassword && (
              <div className="flex items-center mb-7 p-4 border border-gray-700 w-full rounded">
                <input
                  id="checked-checkbox"
                  type="checkbox"
                  checked={isSignup}
                  onChange={() => setSignup((s) => !s)}
                  className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="checked-checkbox"
                  className="ml-2 text-sm font-medium text-black dark:text-gray-700"
                >
                  Sign Up?
                </label>
              </div>
            )}
            {!token && <HCaptcha />}
          </div>
          {token &&
            (showForgetPassword ? (
              <Submit route="/auth/reset-password">Send recovery email</Submit>
            ) : (
              <>
                {isSignup ? (
                  <>
                    <p className="text-sm text-center  w-full">
                      By signing up, <strong>you will be notified</strong> to
                      your email when applications will be open.
                    </p>
                    <Submit route="/auth/sign-up">Sign Up</Submit>
                  </>
                ) : (
                  <Submit route="/auth/sign-in">Log In</Submit>
                )}
              </>
            ))}
          <input type="hidden" name="captcha" value={token ?? ""} />
        </form>
      </FormContext.Provider>
      <p
        onClick={() => setForgetPassword((s) => !s)}
        className="wh-link text-center"
      >
        Forgot password?
      </p>
      {token && (
        <div className="text-center text-xs text-black mt-2 w-full">
          Didn&apos;t receive an email from us? Check your junk/spam folder or{" "}
          <a
            href={`mailto:${constants.supportEmail}?subject=WayneHacks Email Failure&body=I did not receive an email from you.`}
            className="wh-link"
          >
            contact us
          </a>
          .
        </div>
      )}
    </div>
  );
}
