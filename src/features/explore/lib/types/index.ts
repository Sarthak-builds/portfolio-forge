// Types for the Explore feature, aligned with the backend schema

export interface Portfolio {
  id: string;
  title: string;
  url: string;
  github_url?: string;
  description?: string;
  tech_stack: string[];
  score?: number;
  views?: number;
  rating_count?: number;
  owner_id?: string;
  created_at?: string;
  // UI-only: assigned at render time
  color?: string;
}

export interface Rating {
  id: string;
  portfolio_id: string;
  user_id: string;
  score: number;
  created_at: string;
}

export interface Comment {
  id: string;
  portfolio_id: string;
  user_id: string;
  content: string;
  created_at: string;
  parent_id?: string | null;
}

export type SwipeDirection = 'left' | 'right';

export const CARD_COLORS = [
  'bg-blue-500',
  'bg-emerald-500',
  'bg-purple-500',
  'bg-amber-500',
  'bg-rose-500',
] as const;
