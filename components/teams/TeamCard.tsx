"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Team } from "@/misc/teams";
import { Lock, Mail, X } from "lucide-react";
import Link from "next/link";
import joinTeam from "@/actions/teams/join";
import leaveTeam from "@/actions/teams/leave";
import inviteMember from "@/actions/teams/invite";

import TeamMember from "./TeamMember";
import disbandTeam from "@/actions/teams/disband";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTeamsContext } from "./TeamsContext";

export default function TeamCard({
  id,
  team_name,
  members,
  invites,
  created_at,
  leader,
  open_invite,
}: Team) {
  const { currentUserId, isSomeLeader, memberInfoById } = useTeamsContext();
  const IamLeader = currentUserId === leader;
  const isInvited = currentUserId
    ? invites.some((uid) => uid === currentUserId)
    : false;
  const canJoin =
    (open_invite || isInvited) &&
    members.length < 4 &&
    !members.some((m) => m.member_id === currentUserId) &&
    !IamLeader;
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

  const handleRevokeInvite = async (inviteeId: string) => {
    if (!IamLeader) return;
    const tst = toast.loading("Revoking invite...");
    try {
      const result = await inviteMember(inviteeId, true);
      if (!result.ok) {
        throw new Error(result.error);
      }
      toast.success("Invite revoked.", { id: tst });
    } catch (error: any) {
      toast.error(error?.message ?? "Failed to revoke invite.", { id: tst });
    }
  };
  return (
    <div
      key={id}
      id={`team-${id}`}
      className={`group w-full md:w-[calc(50%-0.75rem)] rounded-2xl bg-gradient-to-br from-primary/10 via-background to-background p-[1px] shadow-sm transition-all hover:shadow-xl
        ${
          IamLeader
            ? "border-2 border-yellow-500"
            : isMember
              ? "border-2 border-sky-500"
              : ""
        }`}
    >
      <Card className=" h-full rounded-2xl border-none bg-background/10 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="text-lg text-white">
              <div className="flex items-center justify-center">
                <span>{team_name ?? "Unnamed Team"}</span>
              </div>
            </CardTitle>
            <div className="flex items-center gap-2">
              {isMember && !IamLeader ? (
                <button
                  type="button"
                  onClick={handleLeave}
                  className="rounded-full bg-yellow-500/80 px-3 py-1 text-xs font-medium text-black hover:bg-yellow-400 border border-yellow-500/40"
                >
                  Leave team
                </button>
              ) : canJoin && !isSomeLeader ? (
                <button
                  type="button"
                  onClick={handleJoin}
                  className="rounded-full bg-sky-500/90 px-3 py-1 text-xs font-medium text-black hover:bg-sky-400 border border-sky-500/40"
                >
                  Join team
                </button>
              ) : IamLeader ? (
                // disband team
                <button
                  type="button"
                  onClick={disbandTeam.bind(null, id)}
                  className="rounded-full bg-red-500/80 px-3 py-1 text-xs font-medium text-white border border-red-500/40 hover:bg-red-400"
                >
                  Disband
                </button>
              ) : (
                <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-medium cursor-not-allowed text-red-300 border border-red-500/40">
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
            {members
              .slice()
              .sort((a, b) =>
                a.member_id === leader ? -1 : b.member_id === leader ? 1 : 0,
              )
              .map((member) => (
                <TeamMember
                  key={member.member_id}
                  member={member}
                  isLeader={member.member_id === leader}
                  isYou={member.member_id === currentUserId}
                  canKick={IamLeader && member.member_id !== currentUserId}
                  teamId={id}
                />
              ))}
          </ul>

          {IamLeader && invites.length > 0 && (
            <div className="pt-2">
              <div className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Pending Invites
              </div>
              <ul className="flex flex-wrap gap-2">
                {invites.map((inviteeId) => {
                  const invitee = memberInfoById?.[inviteeId];
                  const label = invitee?.full_name
                    ? invitee.full_name
                    : `${inviteeId.slice(0, 8)}…${inviteeId.slice(-4)}`;
                  const title = invitee?.email
                    ? `${invitee.full_name} <${invitee.email}>`
                    : inviteeId;

                  return (
                    <li
                      key={inviteeId}
                      className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
                      title={title}
                    >
                      <span className={invitee?.full_name ? "" : "font-mono"}>
                        {label}
                      </span>
                      {invitee?.email && (
                        <Link
                          href={`mailto:${invitee.email}`}
                          className="inline-flex items-center justify-center rounded-full bg-white/10 p-1 hover:bg-white/15"
                          title={`Email ${invitee.full_name}`}
                        >
                          <Mail className="h-3 w-3" />
                          <span className="sr-only">
                            Email {invitee.full_name}
                          </span>
                        </Link>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRevokeInvite(inviteeId)}
                        className="inline-flex items-center justify-center rounded-full bg-red-500/20 p-1 text-red-800 hover:bg-red-500/30"
                        title="Revoke invite"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex items-center justify-start gap-2">
          {!open_invite && (
            <span className="ml-2 inline-flex cursor-not-allowed items-center gap-1 rounded-full bg-secondary text-secondary-foreground px-2 py-1 text-[14px] font-medium ">
              <Lock className="h-3 w-3" />
              <span>Invite Only</span>
            </span>
          )}
          <span className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-primary">
            {members.length} member
            {members.length === 1 ? "" : "s"}
          </span>
          <span className="ml-auto text-muted-foreground text-xs">
            Created {new Date(created_at).toLocaleDateString()}
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}
