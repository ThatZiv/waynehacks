import { cookies } from "next/headers";
import {
  createServerActionClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { Application, status } from "@/misc/application";
import React from "react";
import AdminCard from "@/components/AdminCard";
import Back from "@/components/Back";
import Link from "next/link";
export const dynamic = "force-dynamic";

export default async function Applications() {
  "use server";
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: applications, error: applicationsError } = await supabase
    .from("status")
    .select("*, applications(*)")
    .order("modified_at", { ascending: false });

  if (applicationsError)
    return <div className="text-white">Failed to load applications...</div>;
  return (
    <div className="w-full xl:w-[90%]">
      <Back href="/admin" />
      <h1 className="text-white text-center md:text-left text-xl mx-5 my-2">
        All applications
      </h1>
      <Link
        className="text-blue-500 hover:underline mx-5"
        href="/admin/applicants.csv"
      >
        Export as CSV
      </Link>
      <hr />
      {applications?.map((data: { applications: Application } & status) => (
        <AdminCard key={data.applicant_id} data={data} />
      ))}
    </div>
  );
}
