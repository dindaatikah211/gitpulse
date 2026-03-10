export type TeamRole = "owner" | "evaluator" | "contributor";

export interface Team {
  id:          string;
  name:        string;
  description: string;
  repos:       string[];
  memberCount: number;
  inviteCode:  string;
  createdAt:   string;
  myRole:      TeamRole;
}

export interface TeamMember {
  id:                 string;
  name:               string;
  username:           string;
  avatar:             string;
  role:               TeamRole;
  memberStatus:       "Active" | "Passive" | "Inactive";
  commitVelocity:     number;
  contributionShare:  number;
  activityConsistency:number;
  activeWeeksRatio:   number;
  recommendation:     string;
}