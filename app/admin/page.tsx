import { cookies } from "next/headers";
import {
  createServerActionClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { Application, status } from "@/types/application";
import React from "react";
import AdminCard from "@/components/AdminCard";
import { RedirectType } from "next/dist/client/components/redirect";
export const metadata = {
  title: "WayneHacks Admin",
  description: "You shouldn't be here...",
};

export default async function Admin() {
  "use server";
  const supabase = createServerComponentClient({ cookies });
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const uid = user?.id;
    if (!uid) throw new Error("You must be logged in to view this page.");
    let { data: isAdmin, error: isAdminError } = await supabase.rpc(
      "is_admin",
      { uid }
    );
    if (isAdminError) throw isAdminError;
    if (!isAdmin) throw new Error("You must be an admin to view this page.");
  } catch (e: any) {
    redirect(`/?error=${e.message}`);
  }
  const { data: applications, error: applicationsError } = await supabase
    .from("status")
    .select("*, applications(*)")
    .order("modified_at", { ascending: false });

  if (applicationsError) return <div>Failed to load applications...</div>;
  return (
    <div className="w-full xl:w-[90%]">
      <h2 className="text-white">All applications</h2>
      {applications?.map((data: { applications: Application } & status) => (
        <AdminCard data={data} />
      ))}
    </div>
  );
}
