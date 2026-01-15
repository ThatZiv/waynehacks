"use server";

import { fail, ok, type ActionResult } from "@/lib/action";
import { createServerClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

const DEFAULT_ERROR_MESSAGE =
  "An unknown error occurred while creating the team.";

/**
 * This function creates a new team with the given name and open invite setting.
 * It also adds the current user as the leader and a member of the team.
 *
 * @param team_name - The name of the team to be created.
 * @param open_invite - A boolean indicating if the team is open for invites.
 *
 * @note This function handles errors by redirecting to the teams page with an error message.
 */
export default async function createTeam(
  team_name: string,
  open_invite: boolean = true
): Promise<ActionResult> {
  let teamId = null;
  const supabase = await createServerClient();
  try {
    if (!team_name) {
      throw new Error("Missing team name");
    }
    if (team_name.length < 3 || team_name.length > 50) {
      throw new Error("Team name must be between 3 and 50 characters.");
    }

    const { data: userData } = await supabase.auth.getUser();

    if (!userData?.user) {
      throw new Error("You must be logged in to create a team.");
    }

    const { error, data: teamsData } = await supabase
      .from("teams")
      .insert({
        team_name: team_name,
        leader: userData.user.id,
        open_invite: open_invite ?? true,
        created_at: new Date(),
      })
      .select("id");

    console.log(teamsData);
    if (error) {
      console.error("Error creating team:", JSON.stringify(error));
      switch (error.code) {
        case "23505":
          throw new Error("You are already a member of a team.");
        case "42501":
          throw new Error("You cannot create a team.");
        default:
          break;
      }
      throw new Error(DEFAULT_ERROR_MESSAGE);
    }
    if (!teamsData || teamsData.length === 0) {
      throw new Error(DEFAULT_ERROR_MESSAGE);
    }
    if (!teamsData[0].id) {
      throw new Error(DEFAULT_ERROR_MESSAGE);
    }
    teamId = teamsData[0].id;
    // get the current user in team_members table
    // const { error: getMemberError, data: existingMember } = await supabase
    //   .from("team_members")
    //   .select("team_id")
    //   .eq("id", userData.user.id)
    //   .single();

    // if (getMemberError) {
    //   console.error(
    //     "Error fetching existing team member:",
    //     JSON.stringify(getMemberError)
    //   );
    //   throw new Error("Failed to create team");
    // }
    // if (existingMember && existingMember.team_id) {
    //   const { error: teamMemberError } = await supabase
    //     .from("team_members")
    //     .update({
    //       team_id: teamsData[0].id,
    //     })
    //     .eq("id", userData.user.id);

    //   if (teamMemberError) {
    //     console.error(
    //       "Error adding leader to team_members:",
    //       JSON.stringify(teamMemberError)
    //     );
    //     throw new Error(DEFAULT_ERROR_MESSAGE);
    //   }
    // } else {
    //   const { error: teamMemberError } = await supabase
    //     .from("team_members")
    //     .insert([
    //       {
    //         id: userData.user.id,
    //         team_id: teamsData[0].id,
    //         created_at: new Date(),
    //       },
    //     ]);
    //   if (teamMemberError) {
    //     console.error(
    //       "Error adding leader to team_members:",
    //       JSON.stringify(teamMemberError)
    //     );
    //     throw new Error("Failed to create team.");
    //   }
    // }

    // TODO: figure out why upserting violates row-level security policy for table \"team_members\"
    // const { error: teamMemberError } = await supabase
    //   .from("team_members")
    //   .upsert([
    //     {
    //       id: userData.user.id,
    //       team_id: teamsData?.[0].id,
    //     },
    //   ]);
    // if (teamMemberError) {
    //   // this shouldn't happen but then the team becomes "zombied"
    //   console.error(
    //     "Error adding leader to team_members:",
    //     JSON.stringify(teamMemberError)
    //   );
    //   // delete the team
    //   await supabase.from("teams").delete().eq("id", teamsData?.[0].id);
    //   throw new Error("Failed to create team: " + teamMemberError.message);
    // }
  } catch (err: any) {
    return fail(err.message || DEFAULT_ERROR_MESSAGE);
  }
  revalidatePath("/teams");
  return ok("Team created successfully");
}
