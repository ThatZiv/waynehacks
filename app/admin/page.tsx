import Chart from "@/components/Chart";
import Splitter from "@/components/Splitter";
import { Application, StatusApplication, statusEnum } from "@/misc/application";
import { SupabaseFunctions, capitalize } from "@/misc/functions";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminDash({
  searchParams,
}: {
  searchParams: { [key: string]: string[] | string | undefined };
}) {
  "use server";
  const supabase = createServerComponentClient({ cookies });
  const { data: applications, error: applicationsError } = await supabase
    .from("status")
    .select("*, applications(*)")
    .returns<StatusApplication[]>();
  // .order("status", { ascending: true });
  if (applicationsError)
    return <div className="text-dark">Failed to load applications...</div>;
  // get metric to get from query params for graph visual
  const availableMetrics = ["university", "major", "graduation_year", "diet"];
  const metricToGet = searchParams["metric"] || "";
  // if metric is invalid, default to university
  const metric = (
    availableMetrics.includes(metricToGet as string)
      ? metricToGet
      : availableMetrics[0]
  ) as keyof Application;
  const metricData = applications
    .filter((app: StatusApplication) => app.status === statusEnum.ACCEPTED)
    .map((obj: StatusApplication) => {
      let appMetric = obj.applications[metric];
      if (typeof appMetric === "string") {
        return capitalize(appMetric);
      }
      return appMetric;
    });
  // get number of applicants per unique metric for graph data
  type Metric = string;
  type Count = number;
  type MetricApplicantMap = Map<Metric, Count>;
  const counts: MetricApplicantMap = metricData.reduce(
    (acc: any, curr: any) => {
      acc[curr] ? (acc[curr] += 1) : (acc[curr] = 1);
      return acc;
    },
    {}
  );
  const whacks = new SupabaseFunctions(supabase);
  const numUsers = await whacks.getTotalUsers();
  return (
    <div className="w-full xl:w-[90%]">
      <hr />
      <div className="text-center justify-center">
        <div className="">
          <div className="p-5 m-2">
            <h2 className="text-dark text-center text-3xl font-light">
              <strong>{numUsers}</strong> users -{" "}
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
            {/* shows number of check-in */}
            <h2 className="text-dark text-2xl font-light">
              <strong>
                {
                  applications?.filter((data) => data.checked_in === true)
                    .length
                }
              </strong>{" "}
              checked in
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
          <>
            <div className="mt-2 flex justify-center text-center w-full">
              <div className="sm:w-1/3 w-full h-1/2">
                <Chart
                  labels={Object.keys(counts)}
                  data={Object.values(counts)}
                />
              </div>
            </div>
            <form
              action={async (e: FormData) => {
                "use server";
                const metric = e.get("metric");
                const url = new URL(
                  process.env.NEXT_PUBLIC_BASE_URL + "/admin"
                );
                url.searchParams.set("metric", metric as string);

                return redirect(url.toString());
              }}
            >
              {/* metric dropdown input for application fields */}
              <select
                name="metric"
                className="bg-[#1c1c1c] text-white cursor-pointer rounded-lg shadow-lg p-5 m-2"
              >
                {availableMetrics.map((_metric) => (
                  <option
                    key={_metric}
                    value={_metric}
                    selected={metric === _metric}
                  >
                    {_metric}
                  </option>
                ))}
              </select>
              <input
                className="p-5 bg-yellow-400 rounded-lg shadow-lg hover:bg-yellow-500 cursor-pointer m-2"
                type="submit"
                value="Refresh"
              />
            </form>
          </>
        )}
      </div>
    </div>
  );
}
