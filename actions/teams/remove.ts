"use server";

import { ActionResult, fail, ok } from "@/lib/action";
import { createServerClient } from "@/lib/supabase";
import { Notifier } from "@/misc/webhook/WebhookService";
import { revalidatePath } from "next/cache";

import { redirect } from "next/navigation";

export default async function removeMember(
  target_user_id: string
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
    const { error } = await supabase.rpc("kick_team_member", {
      target_team_member: target_user_id,
    });
    if (error) {
      console.error("Error kicking member:", error.message);
      throw new Error(error.message);
    }
  } catch (error: any) {
    return fail("Failed to remove member: " + error.message);
  }
  await Notifier.send(
    "Team Member Removed",
    `User ${target_user_id} has been removed from their team`
  );
  revalidatePath("/teams");
  return ok("Successfully removed member from team.");
}
