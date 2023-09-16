import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { unstable_cache } from "next/cache";
import { cookies } from "next/headers";
import Spinner from "./Spinner";
export const revalidate = 60 * 30; // cache expires every 30 mins
export default async function Registered() {
  "use server";
  const supabase = createServerComponentClient({ cookies });
  const getApplicants = unstable_cache(
    async () => {
      console.log("fetching applicants " + new Date().toLocaleTimeString());
      const { data: applicants, error } = await supabase.rpc(
        "count_applicants"
      );
      if (error) return ">50"; // if it errors for some reason, we'll just LIE
      return applicants;
    },
    ["count_applicants"],
    {
      revalidate,
    }
  );
  const applicants = await getApplicants();
  return (
    <div className="flex items-start text-4xl p-5">
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
        <p className="text-sm mb-1">registered</p>
      </div>
    </div>
  );
}
