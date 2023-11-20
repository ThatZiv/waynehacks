import { statusEnum } from "@/misc/application";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function AdminDash() {
  "use server";
  const supabase = createServerComponentClient({ cookies });
  // count the number of applicants
  const { data: applications, error: applicationsError } = await supabase
    .from("status")
    .select("*, applications(*)");
  // .order("status", { ascending: true });

  return (
    <div className="w-full xl:w-[90%]">
      <h1 className="wh-subheading text-white text-center md:text-left mx-5 my-2">
        Admin Dashboard
      </h1>
      <hr />
      <div className="text-center justify-center">
        <div className="">
          <div className="p-5 m-2">
            <h2 className="text-white text-center text-3xl font-light">
              <strong>{applications?.length}</strong> application
              {applications?.length == 1 ? "" : "s"}
            </h2>
            <h2 className="text-orange-400">
              {
                applications?.filter(
                  (data) => data.status == statusEnum.APPLIED
                ).length
              }{" "}
              applications need{" "}
              <Link className="wh-link" href="/admin/applications">
                action
              </Link>
            </h2>
          </div>
        </div>
        <Link
          className="bg-[#1c1c1c] text-white hover:bg-black cursor-pointer rounded-lg shadow-lg p-5 m-2"
          href="/admin/applications"
        >
          View applications
        </Link>
        <Link
          href="#"
          className="bg-[#1c1c1c] text-white hover:bg-black cursor-pointer rounded-lg shadow-lg p-5 m-2"
        >
          Check in
        </Link>
      </div>
    </div>
  );
}
