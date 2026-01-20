"use client";

import inviteMember from "@/actions/teams/invite";
import removeMember from "@/actions/teams/remove";
import { Mail, Crown, UserRoundPlus, UserRoundX } from "lucide-react";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import { useTeamsContext } from "./TeamsContext";
import Image from "next/image";

interface TeamMemberProps {
  member: {
    member_id: string;
    full_name: string;
    email: string;
    university: string;
  };
  isLeader?: boolean;
  isYou?: boolean;
  /** If the current user can kick this member */
  canKick?: boolean;
  teamId?: number;
}

export default function TeamMember({
  member,
  isLeader,
  isYou,
  canKick = false,
  teamId,
}: TeamMemberProps) {
  const { currentUserId, isSomeLeader } = useTeamsContext();
  const emailDomain = member.email.includes("@")
    ? member.email.split("@")[1]
    : "";

  const handleKick = async () => {
    const tst = toast.loading("Removing member...");
    try {
      if (isYou || !currentUserId || !isSomeLeader) {
        throw new Error("You cannot invite this member.");
      }
      const result = await removeMember(member.member_id);
      if (!result.ok) {
        throw new Error(result.error);
      }
      toast.success("Member removed successfully!", { id: tst });
    } catch (error) {
      toast.error("Failed to remove member.", { id: tst });
    }
  };

  const handleInvite = async () => {
    const tst = toast.loading("Inviting member...");
    try {
      if (isYou || !currentUserId || !isSomeLeader) {
        throw new Error("You cannot invite this member.");
      }
      const result = await inviteMember(member.member_id);
      if (!result.ok) {
        throw new Error(result.error);
      }
      toast.success("Member invited successfully!", { id: tst });
    } catch (error: any) {
      toast.error(error.message, { id: tst });
    }
  };

  return (
    <li
      className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm transition-all ${
        isLeader ? "bg-yellow-200" : isYou ? "bg-sky-100" : "bg-muted/90"
      }`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-[10px] font-semibold text-lg text-black">
        {/* {member.full_name
          .split(" ")
          .map((n: string) => n[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()} */}
        <Image
          src={`https://img.logo.dev/${encodeURIComponent(emailDomain)}?size=50&token=${process.env.NEXT_PUBLIC_LOGO_DEV_KEY}`}
          alt={"University Logo"}
          className="rounded-lg"
          unoptimized
          width={50}
          height={50}
        />
      </div>
      <div className="flex flex-1 items-center justify-between gap-2">
        <div className="flex flex-col text-gray-800">
          <span
            title={member.full_name}
            className="block max-w-[160px] truncate text-primary"
          >
            {member.full_name}
          </span>
          <span className="text-[11px]">{member.university}</span>
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
          {!teamId && !isYou && isSomeLeader && (
            <button
              type="button"
              title="Invite"
              className="inline-flex items-center rounded-full bg-green-400 px-2 py-1 text-[11px] font-medium text-black transition-colors hover:bg-green-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600/40"
              onClick={handleInvite}
            >
              <UserRoundPlus className="h-4 w-4" />
              <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-[max-width,opacity,margin] duration-200 group-hover/actions:ml-1 group-hover/actions:max-w-[5rem] group-hover/actions:opacity-100 group-focus-within/actions:ml-1 group-focus-within/actions:max-w-[5rem] group-focus-within/actions:opacity-100">
                Invite
              </span>
              <span className="sr-only">Invite {member.full_name}</span>
            </button>
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
