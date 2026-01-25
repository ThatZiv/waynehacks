"use client";

import { type TeamMember } from "@/misc/teams";
import React, { createContext, useContext } from "react";

export type TeamsContextValue = {
  currentUserId: string | null;
  /** Whether the current user is a leader of any team (i.e. can invite) */
  isSomeLeader: boolean;
  /** Lookup for displaying user details (invites, members, etc.) */
  memberInfoById: Record<string, TeamMember>;
  members: TeamMember[];
};

const TeamsContext = createContext<TeamsContextValue | null>(null);

export function TeamsProvider({
  value,
  children,
}: {
  value: TeamsContextValue;
  children: React.ReactNode;
}) {
  return (
    <TeamsContext.Provider value={value}>{children}</TeamsContext.Provider>
  );
}

export function useTeamsContext(): TeamsContextValue {
  const ctx = useContext(TeamsContext);
  if (!ctx) {
    throw new Error("useTeamsContext must be used within a TeamsProvider");
  }
  return ctx;
}
