import Chart from "@/components/Chart";
import Splitter from "@/components/Splitter";
import {
  Application,
  ApplicationWithStatus,
  status,
  statusEnum,
} from "@/misc/application";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function AdminDash() {
  "use server";
  const supabase = createServerComponentClient({ cookies });
  const { data: applications, error: applicationsError } = await supabase
    .from("status")
    .select("*, applications(*)");
  // .order("status", { ascending: true });
  if (applicationsError)
    return <div className="text-white">Failed to load applications...</div>;
  const universities = applications
    .filter((app: ApplicationWithStatus) => app.status !== statusEnum.REJECTED)
    .map((obj: ApplicationWithStatus) => obj.applications.university);
  // get number of applicants per unique university for graph data
  type University = string;
  type Count = number;
  type UniversityApplicantMap = Map<University, Count>;
  const counts: UniversityApplicantMap = universities.reduce(
    (acc: any, curr) => {
      acc[curr] ? (acc[curr] += 1) : (acc[curr] = 1);
      return acc;
    },
    {}
  );
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
            <h2 className="text-orange-400 hover:underline">
              <Link href="/admin/applications">
                {
                  applications?.filter(
                    (data) => data.status == statusEnum.APPLIED
                  ).length
                }{" "}
                applications need action
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
          aria-disabled
          className="bg-[#1c1c1c] cursor-not-allowed text-white hover:bg-black rounded-lg shadow-lg p-5 m-2"
        >
          Check in
        </Link>
        <div className="mt-10">
          <Splitter />
        </div>
        {Object.keys(counts).length > 0 && (
          <div className="mt-2 flex justify-center content-stretch text-center w-full">
            <div className="sm:w-1/3 w-full h-1/2">
              <Chart
                labels={Object.keys(counts)}
                data={Object.values(counts)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
