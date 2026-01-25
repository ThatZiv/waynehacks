"use server";

import { ActionResult, fail, ok } from "@/lib/action";
import { createServerClient } from "@/lib/supabase";
import { Notifier } from "@/misc/webhook/WebhookService";
import { Team } from "@/misc/teams";
import { revalidatePath } from "next/cache";
export default async function inviteMember(
  target_user_id: string,
  remove = false,
): Promise<ActionResult> {
  try {
    const supabase = await createServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const user_id = user?.id;
    if (!user_id) {
      throw new Error("User not authenticated");
    }

    const { data: team, error: teamError } = await supabase
      .from("teams")
      .select("*")
      .eq("leader", user_id)
      .single<Team>();

    if (teamError) {
      console.error("Error fetching team:", teamError);
      throw new Error("Failed to fetch team: " + teamError.message);
    }

    if (team.leader !== user_id) {
      //
      throw new Error("Only team leaders can invite or remove members");
    }
    if (remove && !team.invites.includes(target_user_id)) {
      throw new Error("User is not invited to the team");
    }
    if (!remove && team.invites.includes(target_user_id)) {
      throw new Error("User is already invited to the team");
    }
    const { error: updateError } = await supabase
      .from("teams")
      .update({
        invites: remove
          ? [...team.invites.filter((id: string) => id !== target_user_id)]
          : [...team.invites, target_user_id],
      })
      .eq("leader", user_id);

    if (updateError) {
      console.error("Error inviting member:", updateError);
      throw new Error("Failed to invite member: " + updateError.message);
    }
    if (remove) {
      // only revalidate if an invite is removed
      revalidatePath("/teams");
    }
    await Notifier.send(
      remove ? "Team Invitation Revoked" : "Team Invitation Sent",
      `User ${target_user_id} has been ${
        remove ? "removed from" : "invited to"
      } ${team.team_name} \`${team.id}\` by leader ${user_id}.`,
    );
  } catch (error: any) {
    return fail(error.message);
  }

  return ok(
    remove ? "Invitation revoked successfully" : "Invitation sent successfully",
  );
}
