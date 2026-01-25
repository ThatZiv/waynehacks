"use server";

import { createServerClient } from "@/lib/supabase";
import { Notifier } from "@/misc/webhook/WebhookService";
import { redirect } from "next/navigation";

export default async function joinTeam(
  team_id: number | null,
  user_id: string,
  // TODO: get uid from session instead
  // TODO: make ActionResult compliant
): Promise<void> {
  try {
    if (!user_id) {
      throw new Error("Missing user_id");
    }
    const supabase = await createServerClient();
    const { error } = await supabase.from("team_members").upsert([
      {
        id: user_id,
        team_id: team_id,
        created_at: new Date(),
      },
    ]);
    if (error) {
      console.error("Error joining team:", JSON.stringify(error));
      switch (error.code) {
        case "23505":
          throw new Error("You are already a member of a team.");
        case "23514":
          throw new Error(
            "Cannot join team: Team either full or you weren't invited to join.",
          );
        case "42501":
          throw new Error("You cannot join this team.");
        default:
          break;
      }
      throw new Error("Failed to join team: " + error.message);
    }
    await Notifier.send(
      "Team Joined",
      `User ${user_id} joined team ${team_id}`,
    );
  } catch (err: any) {
    redirect("/teams?error=" + encodeURIComponent(err.message));
  }
  if (!team_id) redirect("/teams");
  redirect("/teams?message=" + encodeURIComponent("Successfully joined team!"));
  // Optionally, you can revalidate a path or perform other actions here
}
