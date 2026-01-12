import { Mail, Crown } from "lucide-react";
import Link from "next/link";

export interface TeamMemberProps {
  member: {
    member_id: string;
    full_name: string;
    email: string;
    university: string;
  };
  isLeader?: boolean;
  isYou?: boolean;
}

export default function TeamMember({
  member,
  isLeader,
  isYou,
}: TeamMemberProps) {
  return (
    <li
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
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
          <span className="font-medium text-black">{member.full_name}</span>
          <span className="text-sm text-muted-foreground">{member.email}</span>
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
            <span className="inline-flex cursor-not-allowed items-center gap-1 rounded-full bg-yellow-400 text-black px-2 py-0.5 text-[11px] font-medium ">
              <Crown className="h-3 w-3" />
              <span>Leader</span>
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
