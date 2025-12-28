import { Application } from "./application";

export interface Team {
  id: number;
  leader: string; // applicant_id of team leader
  team_name: string;
  created_at: string;
  invites: string[]; // applicant_ids of invited members
  open_invite: boolean;
}
// TODO: allow only those who been accepted, no self-invites, verify ALL rls policies
// - no joining teams while being a leader of another team
// - only team leaders can invite others
// - only team leaders can REMOVE members (they can currently add any too)
// - only team leaders can delete teams
// - only invited members can join teams (unless open_invite is true)
// TODO: Figure out how to get applicant info (name, email, etc) in RLS compliance
// function (as definer)?
// export const revalidate = 1800; // revalidate every 30 minutes
// export const dynamic = "force-static"; // force static caching
// FIXME:
// user in team_members changes team while being leader
export interface TeamRow {
  team_id?: string;
  team_name: string | null;
  member_id: string;
  full_name: Application["full_name"];
  email: Application["email"];
  university: Application["university"];

  created_at: string;
}
