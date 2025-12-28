"use server";

import { createServerClient } from "@/lib/supabase";

export default async function leaveTeam(
  team_id: number,
  user_id: string
): Promise<void> {
  const supabase = await createServerClient();

  const { error } = await supabase
    .from("team_members")
    .delete()
    .eq("id", user_id)
    .eq("team_id", team_id);

  if (error) {
    console.error("Error leaving team:", error.message);
    throw new Error("Failed to leave team: " + error.message);
  }
}
