"use server";

import { createServerClient } from "@/lib/supabase";
import { redirect } from "next/navigation";

export default async function leaveTeam(
  team_id: number,
  user_id: string
): Promise<void> {
  try {
    const supabase = await createServerClient();

    const { error } = await supabase
      .from("team_members")
      .update({ team_id: null })
      .eq("id", user_id)
      .eq("team_id", team_id);

    if (error) {
      console.error("Error leaving team:", error.message);
      throw new Error("Failed to leave team: " + error.message);
    }
  } catch (error: any) {
    console.error("Unexpected error leaving team:", error);
    redirect("/teams?error=" + encodeURIComponent(error.message));
  }
  redirect("/teams?message=" + encodeURIComponent("Successfully left team!"));
}
