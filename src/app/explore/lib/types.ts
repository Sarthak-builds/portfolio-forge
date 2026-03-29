export interface Portfolio {
  id: string;
  title: string;
  description?: string;
  url: string;
  github_url?: string;
  tech_stack: string[];
  average_score?: number;
  user?: { name: string; avatarUrl?: string };
}

export const CARD_COLORS = [
  'bg-indigo-50 border-indigo-200',
  'bg-purple-50 border-purple-200',
  'bg-pink-50 border-pink-200',
  'bg-rose-50 border-rose-200',
  'bg-orange-50 border-orange-200',
];
