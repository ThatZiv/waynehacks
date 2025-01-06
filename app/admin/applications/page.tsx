"use client";
import { cookies } from "next/headers";
import {
  createClientComponentClient,
  createServerActionClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { Application, Status, StatusApplication } from "@/misc/application";
import { useCallback, useEffect, useState, useMemo } from "react";
import AdminCard from "@/components/AdminCard";
import Back from "@/components/Back";
import Link from "next/link";
import Spinner from "@/components/Spinner";

export default function Applications() {
  const supabase = createClientComponentClient();

  // TODO: setup live audit log
  const [auditLog, setAuditLog] = useState<string[]>([]);
  const getApplications = useCallback<
    () => Promise<StatusApplication[] | null>
  >(async () => {
    const { data: applications, error: applicationsError } = await supabase
      .from("status")
      .select("*, applications(*)")
      .order("modified_at", { ascending: false });
    if (applicationsError) {
      console.error(applicationsError);
      return null;
    }
    return applications;
  }, [supabase]);
  const [applications, setApplications] = useState<StatusApplication[]>([]);
  const [pageStatus, setPageStatus] = useState<"loading" | "loaded" | "error">(
    "loading"
  );

  const init = useCallback(async () => {
    setPageStatus("loading");
    try {
      const data = await getApplications();
      if (!data) throw new Error("Failed to load applications...");
      setApplications(data);
      setPageStatus("loaded");
    } catch (e) {
      console.error(e);
      setPageStatus("error");
    }
  }, [getApplications, setApplications, setPageStatus]);

  useEffect(() => {
    // subscribe to changes
    const channel = supabase
      .channel(process.env.NEXT_PUBLIC_SUPABASE_REALTIME_CHANNEL as string)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "status",
        },
        (payload) => {
          setPageStatus("loading");
          // replace old with new in application while ordering modified_at descending
          let updatedApplications: StatusApplication[] = [];
          // for some god forsaken reason, the payload runs once, but each payload case runs twice...
          setApplications((_applications) => {
            const index = _applications.findIndex(
              (a) => a.applicant_id === (payload.new as Status).applicant_id
            ); // this will be -1 if the application is new or deleted
            switch (payload.eventType) {
              case "DELETE":
                console.log("deleting application", payload);
                const deletedApplicantId = (payload.old as Status).applicant_id;

                return _applications.filter(
                  (a) => a.applicant_id !== deletedApplicantId
                );

              case "INSERT":
                console.log("inserting new application", payload);
                const newApplication: StatusApplication = {
                  ...(payload.new as Status),
                  applications: {
                    ...((payload.new as StatusApplication)
                      .applications as Application),
                    applicant_id: (payload.new as Status).applicant_id,
                    email: "none", // this will make the AdminCard marked to refresh
                  },
                };
                //
                // prepend new application to applications
                updatedApplications = [newApplication, ..._applications];
                return updatedApplications;
              // since we're only subscribed to changes in the status table, we don't have the applications data
              // TODO: fetch the new applications data
              // init();
              // return _applications;
              // router.reload();
              case "UPDATE":
                console.log("updating application", payload);
                updatedApplications = [
                  ..._applications.slice(0, index), // Copy applications before the updated one
                  {
                    ...(payload.new as Status),
                    applications: _applications[index].applications,
                  },
                  ..._applications.slice(index + 1), // Copy applications after the updated one
                ];
                return updatedApplications.sort(
                  (a: StatusApplication, b: StatusApplication) =>
                    new Date(b.modified_at).getTime() -
                    new Date(a.modified_at).getTime()
                ); // kind of useless considering any updated record will be at the top
            }
          });
          setPageStatus("loaded");
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, setApplications, setPageStatus]);

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (pageStatus === "error")
    return <div className="text-dark">Failed to load applications...</div>;
  return pageStatus == "loading" ? (
    <Spinner />
  ) : (
    <div className="w-full xl:w-[90%]">
      <Back href="/admin" />
      <h1 className="text-dark text-center md:text-left text-xl mx-5 my-2">
        All applications
      </h1>
      <Link
        className="text-blue-500 hover:underline mx-5"
        href="/admin/applicants.csv"
      >
        Export as CSV
      </Link>
      <span className="text-xs text-gray-600 ">
        NOTE:{" "}
        <span className="animate-pulse">
          This page is <b>live</b>. Changes to data will be reflected in
          real-time.
        </span>
      </span>
      <hr />
      {applications?.map((data) => (
        <AdminCard key={data.applicant_id} data={data} />
      ))}
    </div>
  );
}
