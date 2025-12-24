import { createServerClient } from "@/lib/supabase";
import { cookies } from "next/headers";
import AdminCard from "@/components/AdminCard";
import Back from "@/components/Back";

export const dynamic = "force-dynamic";

export default async function Application({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const applicant_id = (await params).id;
  const supabase = await createServerClient();

  const { data: application, error: applicationsError } = await supabase
    .from("status")
    .select("*, applications(*)")
    .eq("applicant_id", applicant_id)
    .limit(1)
    .single();

  if (applicationsError)
    return (
      <h1 className="text-xs text-dark">
        Failed to load application for <code>{applicant_id}</code>
      </h1>
    );
  return (
    <div className="w-full xl:w-[90%] text-dark">
      <Back href="/admin/applications" />
      <p className="text-foreground text-xs">
        NOTE: this page is <b>not</b> live. Changes will <b>not</b> be reflected
        in realtime.
      </p>
      <h1 className="text-foreground text-center md:text-left text-xl my-5">
        {application.applications.full_name} from{" "}
        {application.applications.university}
      </h1>
      <hr />
      <AdminCard key={application.applicant_id} data={application} />
    </div>
  );
}
