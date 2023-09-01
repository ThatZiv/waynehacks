import { cookies } from "next/headers";
import {
  createServerActionClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
  return (
    <>
      <p className="text-white">your in.</p>
    </>
  );
}
