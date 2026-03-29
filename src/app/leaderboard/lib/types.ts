export interface LeaderboardEntry {
  id: string;
  rank: number;
  score: number;
  title: string;
  url: string;
  tech_stack?: string[];
  user: {
    name: string;
    avatarUrl?: string;
  };
}

export type LeaderboardFilter = "all-time" | "this-month" | "this-week";
