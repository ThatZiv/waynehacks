import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import {
  Application,
  Status,
  StatusApplication,
  statusEnum,
} from "@/misc/application";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  // remove commas from csv values
  const csvFix = (str: any) => {
    if (typeof str === "string") {
      return str.replace(/,/g, "");
    }
    return str;
  };
  const supabase = createRouteHandlerClient({ cookies });
  // get url params
  const url = new URL(request.url);
  const queryAll = url.searchParams.get("all") == "true";
  const status = url.searchParams.get("status");
  const { data: applications, error } = await supabase
    .from("applications")
    .select("*")
    .returns<Application[]>();
  const { data: statuses, error: statusError } = await supabase
    .from("status")
    .select("*")
    .returns<Status[]>();
  if (error || !applications || statusError || !statuses) {
    let failedRes = new Response("No data found", { status: 500 });
    failedRes.headers.set("Content-Type", "text/csv");
    console.error(error, statusError);
    return failedRes;
  }
  let final =
    Object.keys(applications[0]).join(",") +
    Object.keys(statuses[0]).join(",") +
    "\n";

  let numApps = 0;

  applications.map((application) => {
    const statusEntry = statuses.find(
      (e) => e.applicant_id === application.applicant_id
    ) as Status; // it will always be found

    // if status is not specified, return all
    if (!queryAll && status && statusEntry.status !== status) {
      return;
    }
    // the default should always allow accepted applications
    if (!queryAll && !status && statusEntry.status !== statusEnum.ACCEPTED) {
      return;
    }
    final +=
      Object.values(application)
        .map((e) => {
          return csvFix(e);
        })
        .join(",") +
      Object.values(statusEntry)
        .map((e) => {
          return csvFix(e);
        })
        .join(",") +
      "\n";
    numApps++;
  });
  final += `\n\nApplications,Time\n${numApps}/${
    applications.length
  },${new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
  })}\n\nThis report was generated at ${
    process.env.NEXT_PUBLIC_BASE_URL
  }}/admin/applicants.csv`;
  let res = new Response(final, { status: 200 });
  res.headers.set("Content-Type", "text/csv");
  return res;
}
