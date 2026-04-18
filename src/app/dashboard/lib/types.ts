export interface DashboardPortfolio {
  id?: string;
  title: string;
  description?: string;
  tagline?: string;
  url: string;
  github_url?: string;
  tech_stack: string[];
  views?: number;
  score?: number;
  likes?: number;
  bookmarks?: number;
  comments_count?: number;
  rank: number;
}
