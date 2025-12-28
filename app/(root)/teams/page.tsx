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
import { Crown } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Team } from "@/misc/teams";

export default async function Teams() {
  const supabase = await createServerClient();
  const { data: teamsList, error: membersError } = await supabase.rpc(
    "get_team_with_members",
    {
      team_id_param: null,
    }
  );
  const teams: Team[] = teamsList || [];

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
          {teams.map(({ id, team_name, members, created_at, leader }) => {
            const leaderMember = members.find((m) => m.member_id === leader);
            return (
              <div
                key={id}
                className="group w-full md:w-[calc(50%-0.75rem)] rounded-2xl bg-gradient-to-br from-primary/10 via-background to-background p-[1px] shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <Card className=" h-full rounded-2xl border-none bg-background/10 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between gap-3">
                      <CardTitle className="text-lg text-white">
                        {team_name ?? "Unnamed Team"}
                      </CardTitle>
                      <span className="rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-primary">
                        {members.length} member
                        {members.length === 1 ? "" : "s"}
                      </span>
                    </div>
                    {/* <CardDescription className="mt-2 text-sm">
                      Team ID: {id}
                    </CardDescription> */}
                  </CardHeader>

                  <CardContent className="space-y-3 pt-0">
                    {/* <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                      Members
                    </p> */}
                    <ul className="space-y-2">
                      {members.map((member) => {
                        const isLeader = member.member_id === leader;
                        return (
                          <li
                            key={member.member_id}
                            className={`flex bg-muted/80 items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted ${
                              isLeader ? "border border-yellow-500/50" : ""
                            }`}
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-lg text-black">
                              {member.full_name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")
                                .slice(0, 2)
                                .toUpperCase()}
                            </div>
                            <div className="flex flex-1 items-center justify-between gap-2">
                              <div className="flex flex-col">
                                <span className="font-medium">
                                  {member.full_name}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  {member.email}
                                </span>
                                <span className="text-[11px] text-muted-foreground">
                                  {member.university}
                                </span>
                              </div>
                              {isLeader && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500 text-black px-2 py-0.5 text-[11px] font-medium ">
                                  <Crown className="h-3 w-3" />
                                  <span>Leader</span>
                                </span>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </CardContent>
                  <CardFooter className="text-muted-foreground text-xs">
                    Created {new Date(created_at).toLocaleDateString()}
                  </CardFooter>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
