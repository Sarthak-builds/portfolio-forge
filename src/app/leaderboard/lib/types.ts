export interface LeaderboardEntry {
  id: string;
  rank: number;
  score: number;
  title: string;
  url: string;
  tech_stack?: string[];
  views?: number;
  likes?: number;
  bookmarks?: number;
  comments_count?: number;
  user: {
    name: string;
    avatarUrl?: string;
  };
}

export type LeaderboardFilter = "all-time" | "monthly" | "weekly";
