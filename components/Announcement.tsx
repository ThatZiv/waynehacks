import { SupabaseFunctions } from "@/misc/functions";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Spinner from "./Spinner";

async function Announcement() {
  const supabase = createServerComponentClient({ cookies });
  const whacks = new SupabaseFunctions(supabase);
  const announcement = await whacks.getConfigValue("announcement");
  // console.log(announcement);
  if (!announcement) return <></>;
  return (
    <div className="hover:opacity-30 transition-opacity select-none">
      <div
        className="flex items-center my-4 p-4 rounded-md text-white bg-black text-left"
        role="alert"
      >
        <svg
          className="flex-shrink-0 inline w-4 h-4 mr-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Announcement</span>
        <div>
          {/* <span className="font-bold"></span> */}
          <p>{announcement}</p>
        </div>
      </div>
    </div>
  );
}

// FIXME: figure out why hydration warnings are happening
// ^ it was because i wasn't awaiting the value

export default Announcement;
