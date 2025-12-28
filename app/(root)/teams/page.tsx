import Link from "next/link";
import WayneHacksLogo from "@/components/WayneHacksLogo";
import Registered from "@/components/Registered";
import Splitter from "@/components/Splitter";
import FAQ from "@/components/FAQ";
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

export default async function Teams() {
  const supabase = await createServerClient();
  const { data: teamsList, error: membersError } = await supabase.rpc(
    "get_team_with_members",
    {
      team_id_param: null,
    }
  );
  const teams: Team[] = teamsList || [];

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
  console.log(allMembers);

  return (
    <div className="min-h-screen w-full">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Teams overview
          </h1>
          <p className="text-sm text-muted-foreground">
            {allMembers?.length ?? 0} members across {teams.length} teams.
          </p>
        </header>

        <div className="flex flex-wrap gap-6">
          {teams.map((team) => (
            <TeamCard key={team.id} {...team} currentUserId={currentUserId} />
          ))}
        </div>
      </div>
    </div>
  );
}
