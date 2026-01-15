import Back from "@/components/Back";
import { createServerClient } from "@/lib/supabase";
import { redirect } from "next/navigation";

async function createTeamAction(formData: FormData) {
  "use server";

  const supabase = await createServerClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData?.user) {
    redirect(
      "/login?error=" +
        encodeURIComponent("You must be logged in to create a team.")
    );
  }

  const teamNameRaw = formData.get("team_name");
  const openInviteRaw = formData.get("open_invite");

  const teamName = typeof teamNameRaw === "string" ? teamNameRaw.trim() : "";

  // Basic validation (adjust constraints to match your product rules)
  if (teamName.length < 3 || teamName.length > 50) {
    redirect(
      "/teams/create?error=" +
        encodeURIComponent("Team name must be between 3 and 50 characters.")
    );
  }

  const openInvite =
    openInviteRaw === "on" || openInviteRaw === "true" || openInviteRaw === "1";

  const { data: team, error } = await supabase
    .from("teams")
    .insert({
      leader: userData.user.id,
      team_name: teamName,
      open_invite: openInvite,
    })
    .select("id")
    .single();

  if (error) {
    redirect(
      "/teams/create?error=" +
        encodeURIComponent(error.message || "Failed to create team.")
    );
  }

  // Redirect wherever your app expects (adjust if you have a team details route)
  redirect(`/teams?created=${encodeURIComponent(String(team.id))}`);
}

export default async function CreateTeamPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string; created?: string }>;
}) {
  const supabase = await createServerClient();
  const { data: user } = await supabase.auth.getUser();

  if (!user?.user) {
    redirect(
      "/login?error=" +
        encodeURIComponent("You must be logged in to create a team.")
    );
  }
  const searchParamsResolved = await searchParams;
  const error =
    typeof searchParamsResolved?.error === "string"
      ? searchParamsResolved.error
      : null;

  return (
    <div className="mx-auto w-full max-w-4xl p-6 md:p-8">
      <Back href="/teams" />
      <h1 className="text-2xl font-semibold mt-4">Create team</h1>

      {error ? (
        <div className="mt-4 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-800">
          {error}
        </div>
      ) : null}

      <form action={createTeamAction} className="mt-6 space-y-4">
        <div className="space-y-1">
          <label htmlFor="team_name" className="block text-sm font-medium">
            Team name
          </label>
          <input
            id="team_name"
            name="team_name"
            type="text"
            required
            minLength={3}
            maxLength={50}
            placeholder="e.g. Wayne Hackers"
            className="w-full rounded border px-3 py-2"
          />
          <p className="text-xs text-neutral-600">3–50 characters.</p>
        </div>

        <div className="flex items-center gap-2">
          <input
            id="open_invite"
            name="open_invite"
            type="checkbox"
            className="h-4 w-4"
          />
          <label htmlFor="open_invite" className="text-sm">
            Allow open invites (anyone can request/join)
          </label>
        </div>

        <button type="submit" className="rounded bg-black px-4 py-2 text-white">
          Create team
        </button>
      </form>
    </div>
  );
}
