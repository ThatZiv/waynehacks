import { createServerClient } from "@/lib/supabase";
import { cookies } from "next/headers";
import Spinner from "./Spinner";
import { SupabaseFunctions } from "@/misc/functions";
import Link from "next/link";
export const revalidate = 1800; // revalidate every 30 mins

interface RegisteredProps {
  nonInteractive?: boolean;
}

function SignUp() {
  return (
    <Link
      href="/login?signup=true"
      className="wh-btn py-3 px-6 rounded-lg font-mono text-xlg font-bold transition-all hover:px-12"
    >
      Sign Up
    </Link>
  );
}

export default async function Registered({ nonInteractive }: RegisteredProps) {
  "use server";
  try {
    const supabase = await createServerClient();
    const whacks = new SupabaseFunctions(supabase);
    const canRegister = await whacks.getConfigValue("canRegister");
    // if (!canRegister)
    //   return (
    //     <SignUp />
    //   );
    const applicants = await whacks.getApplicants();
    if (applicants > 0) {
      return (
        <div>
          <div className="flex items-center text-4xl mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-14 h-17"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            <div className="">
              {applicants ? (
                <>
                  <span className="animate-pulse">
                    <strong>{applicants}</strong>
                  </span>
                  <br />
                </>
              ) : (
                <Spinner />
              )}
              <p className="text-sm mb-1">applied</p>
            </div>
          </div>
          {!nonInteractive && (
            <Link
              aria-disabled={!canRegister}
              href="/application"
              className={`py-3 px-11 disabled:opacity-50 rounded-lg font-mono text-xlg font-bold text-white transition-all bg-rose-600 hover:bg-rose-400 hover:px-16`}
            >
              Apply
            </Link>
          )}
        </div>
      );
    } else {
      return <SignUp />;
    }
  } catch (error: any) {
    console.error(error.message);
    return <></>;
  }
}
