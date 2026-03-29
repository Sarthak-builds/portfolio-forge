export interface LeaderboardEntry {
  id: string;
  rank?: number;
  score: number;
  title: string;
  url: string;
  user: { name: string; avatarUrl?: string };
  tech_stack?: string[];
}

export type LeaderboardFilter = "all-time" | "this-month" | "this-week";

export const RANK_STYLES: Record<number, string> = {
  1: 'text-amber-500',
  2: 'text-zinc-400',
  3: 'text-orange-600',
};
