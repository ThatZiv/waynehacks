import Link from "next/link";
import WayneHacksLogo from "@/components/WayneHacksLogo";
import Registered from "@/components/Registered";
import Splitter from "@/components/Splitter";
import Announcement from "@/components/Announcement";
import constants from "@/misc/constants";
import Image from "next/image";
import { SupabaseFunctions } from "@/misc/functions";
import { createServerClient } from "@/lib/supabase";
import { Crown, Mail } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Team } from "@/misc/teams";
import TeamCard from "@/components/teams/TeamCard";
import TeamMember from "@/components/teams/TeamMember";
import Back from "@/components/Back";
import CreateTeamDialog from "@/components/teams/CreateTeamDialog";

export default async function Teams() {
  const supabase = await createServerClient();
  const { data: teamsList, error: membersError } = await supabase.rpc(
    "get_team_with_members",
    {
      team_id_param: null, // gets all
    }
  );
  const allTeams: Team[] = teamsList || [];
  const teams = allTeams.filter(({ id }) => id > 0);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const currentUserId = user?.id ?? null;

  // const { data: teams, error } = await supabase
  //   .from("team_with_members")
  //   .select("id, team_name, applications(full_name, email, university, major)");
  // console.log(data[0].teams, data[0].applications);
  //    "id, team_id, teams(*, leader_user:users!teams_leader_fkey(*)), applications(full_name, email, university, major)"
  const allMembers = teams.flatMap((team) => team.members);
  // console.log(allTeams);

  const membersNotInTeams = allTeams.find(({ id }) => id === -1)?.members || [];
  // only team members can invite others
  const canInvite = teams.some((m) => m.leader === currentUserId);

  return (
    <div className="w-full">
      <Back href="/application" />
      <div className="mx-auto flex max-w-5xl flex-col gap-8 mt-4">
        <header className="flex flex-col gap-2 -mb-4">
          <h1 className="text-3xl font-semibold tracking-tight">
            Teams overview
          </h1>
          <p className="text-sm text-muted-foreground">
            {allMembers?.length ?? 0} members across {teams.length} teams.
          </p>
        </header>
        <CreateTeamDialog />
        <div className="flex flex-wrap gap-6">
          {teams.map((team) => (
            <TeamCard
              key={team.id}
              {...team}
              currentUserId={currentUserId}
              isSomeLeader={canInvite}
            />
          ))}
        </div>
        <Splitter />
        <header className="flex flex-col gap-2 -mb-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Available Members
          </h1>
          <p className="text-sm text-muted-foreground">
            {membersNotInTeams?.length ?? 0} members looking for a group.
          </p>
        </header>
        <div className="flex flex-wrap gap-4 md:justify-start md:items-start items-center justify-center mb-8">
          {membersNotInTeams.map((member) => (
            <TeamMember
              key={member.member_id}
              member={member}
              isYou={member.member_id === currentUserId}
              invite={canInvite}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
