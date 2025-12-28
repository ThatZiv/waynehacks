"use server";

import { createServerClient } from "@/lib/supabase";
import { redirect } from "next/navigation";

export default async function joinTeam(
  team_id: number,
  user_id: string
): Promise<void> {
  try {
    if (!team_id || !user_id) {
      throw new Error("Missing team_id or user_id");
    }
    const supabase = await createServerClient();
    const { error } = await supabase.from("team_members").insert([
      {
        id: user_id,
        team_id: team_id,
        created_at: new Date(),
      },
    ]);
    if (error) {
      switch (error.code) {
        case "23505":
          throw new Error("You are already a member of a team.");
        case "23514":
          throw new Error(
            "Cannot join team: Team either full or you weren't invited to join."
          );
        default:
          break;
      }
      // console.error("Error joining team:", error.message);
      throw new Error("Failed to join team: " + error.message);
    }
  } catch (err: any) {
    redirect("/teams?error=" + encodeURIComponent(err.message));
    return;
  }
  redirect("/teams?message=" + encodeURIComponent("Successfully joined team!"));
  // Optionally, you can revalidate a path or perform other actions here
}
