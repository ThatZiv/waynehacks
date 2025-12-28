"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Team } from "@/misc/teams";
import { Crown, Lock, Mail } from "lucide-react";
import Link from "next/link";
import joinTeam from "@/actions/teams/join";
import leaveTeam from "@/actions/teams/leave";

type TeamCardProps = Team & {
  currentUserId?: string | null;
};

export default function TeamCard({
  id,
  team_name,
  members,
  invites,
  created_at,
  leader,
  open_invite,
  currentUserId,
}: TeamCardProps) {
  const isInvited = currentUserId
    ? invites.some((uid) => uid === currentUserId)
    : false;
  const canJoin =
    (open_invite || isInvited) &&
    members.length < 4 &&
    !members.some((m) => m.member_id === currentUserId);
  const isMember = currentUserId
    ? members.some((m) => m.member_id === currentUserId)
    : false;
  const handleJoin = async () => {
    if (!currentUserId || !canJoin) return;
    await joinTeam(id, currentUserId);
  };
  const handleLeave = async () => {
    if (!currentUserId || !isMember) return;
    await leaveTeam(id, currentUserId);
  };
  return (
    <div
      key={id}
      className="group w-full md:w-[calc(50%-0.75rem)] rounded-2xl bg-gradient-to-br from-primary/10 via-background to-background p-[1px] shadow-sm transition-all hover:shadow-xl"
    >
      <Card className=" h-full rounded-2xl border-none bg-background/10 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="text-lg text-white">
              <div className="flex items-center justify-center">
                <span>{team_name ?? "Unnamed Team"}</span>
                <span>
                  {!open_invite && (
                    <span className="ml-2 inline-flex cursor-not-allowed items-center gap-1 rounded-full bg-secondary text-secondary-foreground px-2 py-0.5 text-[14px] font-medium ">
                      <Lock className="h-3 w-3" />
                      <span>Invite Only</span>
                    </span>
                  )}
                </span>
              </div>
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-primary">
                {members.length} member
                {members.length === 1 ? "" : "s"}
              </span>
              {isMember ? (
                <button
                  type="button"
                  onClick={handleLeave}
                  className="rounded-full bg-yellow-500/80 px-3 py-1 text-xs font-medium text-black hover:bg-yellow-400 border border-yellow-500/40"
                >
                  Leave team
                </button>
              ) : canJoin ? (
                <button
                  type="button"
                  onClick={handleJoin}
                  className="rounded-full bg-green-500/80 px-3 py-1 text-xs font-medium text-black hover:bg-green-400 border border-green-500/40"
                >
                  Join team
                </button>
              ) : (
                <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-medium text-red-300 border border-red-500/40">
                  Cannot Join
                </span>
              )}
            </div>
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
                  className={`flex bg-muted/80 items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
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
                      <span className="font-medium">{member.full_name}</span>
                      <span className="text-sm text-muted-foreground">
                        {member.email}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {member.university}
                      </span>
                    </div>
                    <div className="flex items-end justify-center gap-2">
                      <Link href={`mailto:${member.email}`}>
                        <span className="inline-flex items-center rounded-full bg-white px-2 py-1 text-[11px] font-medium text-secondary">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                        </span>
                      </Link>

                      {isLeader && (
                        <span className="inline-flex cursor-not-allowed items-center gap-1 rounded-full bg-yellow-500 text-black px-2 py-0.5 text-[11px] font-medium ">
                          <Crown className="h-3 w-3" />
                          <span>Leader</span>
                        </span>
                      )}
                    </div>
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
}
