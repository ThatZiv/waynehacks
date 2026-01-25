"use server";

import { createServerClient } from "@/lib/supabase";
import { Notifier } from "@/misc/webhook/WebhookService";
import { redirect } from "next/navigation";

export default async function disbandTeam(team_id: number): Promise<void> {
  try {
    if (!team_id) {
      throw new Error("Missing team_id");
    }
    const supabase = await createServerClient();
    const { error } = await supabase.from("teams").delete().eq("id", team_id);

    if (error) {
      throw new Error("Failed to disband team: " + error.message);
    }
    await Notifier.send(
      "Team Disbanded",
      `Team ${team_id} has been disbanded.`,
    );
  } catch (err: any) {
    redirect("/teams?error=" + encodeURIComponent(err.message));
  }
  redirect(
    "/teams?message=" + encodeURIComponent("Successfully disbanded team!"),
  );
}
