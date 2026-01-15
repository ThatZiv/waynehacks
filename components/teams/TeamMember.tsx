"use client";

import removeMember from "@/actions/teams/remove";
import { Mail, Crown, UserRoundPlus, UserRoundX } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface TeamMemberProps {
  member: {
    member_id: string;
    full_name: string;
    email: string;
    university: string;
  };
  isLeader?: boolean;
  isYou?: boolean;
  /** If the member is currently in the team (used in unassigned) */
  invite?: boolean;
  /** If the current user can kick this member */
  canKick?: boolean;
}

export default function TeamMember({
  member,
  isLeader,
  isYou,
  invite = false,
  canKick = false,
}: TeamMemberProps) {
  const handleKick = async () => {
    const tst = toast.loading("Removing member...");
    try {
      const result = await removeMember(member.member_id);
      if (!result.ok) {
        throw new Error(result.error);
      }
      toast.success("Member removed successfully!", { id: tst });
    } catch (error) {
      toast.error("Failed to remove member.", { id: tst });
    }
  };
  return (
    <li
      className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm transition-all ${
        isLeader ? "bg-yellow-200" : isYou ? "bg-sky-200/80" : "bg-muted/90"
      }`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-[10px] font-semibold text-lg text-black">
        {member.full_name
          .split(" ")
          .map((n: string) => n[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()}
      </div>
      <div className="flex flex-1 items-center justify-between gap-2">
        <div className="flex flex-col">
          <span
            title={member.full_name}
            className="block max-w-[160px] truncate"
          >
            {member.full_name}
          </span>
          <span className="text-sm text-muted-foreground">{member.email}</span>
          <span className="text-[11px] text-muted-foreground">
            {member.university}
          </span>
        </div>
        <div className="group/actions flex items-end justify-center gap-2">
          {canKick && (
            <button
              type="button"
              title="Kick"
              className="inline-flex items-center rounded-full bg-red-400 px-2 py-1 text-[11px] font-medium text-black transition-colors hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600/40"
              onClick={handleKick}
            >
              <UserRoundX className="h-4 w-4" />
              <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-[max-width,opacity,margin] duration-200 group-hover/actions:ml-1 group-hover/actions:max-w-[5rem] group-hover/actions:opacity-100 group-focus-within/actions:ml-1 group-focus-within/actions:max-w-[5rem] group-focus-within/actions:opacity-100">
                Kick
              </span>
            </button>
          )}
          {!isYou && (
            <Link
              href={`mailto:${member.email}`}
              title="Email"
              className="inline-flex items-center rounded-full bg-white px-2 py-1 text-[11px] font-medium text-secondary transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500/30"
            >
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="max-w-0 text-black overflow-hidden whitespace-nowrap opacity-0 transition-[max-width,opacity,margin] duration-200 group-hover/actions:ml-1 group-hover/actions:max-w-[5rem] group-hover/actions:opacity-100 group-focus-within/actions:ml-1 group-focus-within/actions:max-w-[5rem] group-focus-within/actions:opacity-100">
                Email
              </span>
              <span className="sr-only">Email {member.full_name}</span>
            </Link>
          )}
          {isLeader && (
            <span className="inline-flex cursor-not-allowed items-center gap-1 rounded-full bg-yellow-400 text-black px-2 py-0.5 text-[11px] font-medium ">
              <Crown className="h-4 w-4" />
              <span>Leader</span>
            </span>
          )}
          {invite && (
            <span className="inline-flex cursor-pointer items-center gap-1 rounded-full bg-green-400 text-black px-2 py-0.5 text-[11px] font-medium ">
              <span>Invite</span>
              <UserRoundPlus className="h-3 w-3" />
            </span>
          )}
          {isYou && (
            <span className="inline-flex cursor-not-allowed items-center gap-1 rounded-full bg-sky-400 text-black px-2 py-0.5 text-[11px] font-medium">
              <span>You</span>
            </span>
          )}
        </div>
      </div>
    </li>
  );
}
