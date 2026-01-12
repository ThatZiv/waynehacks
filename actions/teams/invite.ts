"use server";

import { createServerClient } from "@/lib/supabase";
import { redirect } from "next/navigation";

export default async function inviteMember(
  team_id: number,
  user_id: string,
  target_user_id: string,
  remove = false
): Promise<void> {
  try {
    const supabase = await createServerClient();

    const { error } = await supabase
      .from("teams")
      .update({
        invites: supabase.rpc(remove ? "array_remove" : "array_append", {
          array: "invites",
          value: target_user_id,
        }),
      })
      .eq("id", team_id)
      .eq("leader", user_id);

    if (error) {
      console.error("Error inviting member:", error.message);
      throw new Error("Failed to invite member: " + error.message);
    }
  } catch (error: any) {
    redirect("/teams?error=" + encodeURIComponent(error.message));
  }
  redirect("/teams?message=" + encodeURIComponent("Successfully left team!"));
}
