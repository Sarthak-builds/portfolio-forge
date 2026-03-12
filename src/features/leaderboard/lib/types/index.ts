// Types for the Leaderboard feature, aligned with the backend schema

export interface LeaderboardEntry {
  id: string;
  title: string;
  url: string;
  github_url?: string;
  description?: string;
  tech_stack: string[];
  score: number;
  rating_count: number;
  views?: number;
  owner_id?: string;
}

export type LeaderboardFilter = 'all-time' | 'weekly' | 'monthly';

export const RANK_STYLES: Record<number, string> = {
  1: 'text-amber-500 font-bold text-lg',
  2: 'text-zinc-400 font-bold text-lg',
  3: 'text-amber-700 font-bold text-lg',
};
