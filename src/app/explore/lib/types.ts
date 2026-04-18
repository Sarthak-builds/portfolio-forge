export interface Portfolio {
  id: string;
  title: string;
  description: string;
  url: string;
  github_url?: string;
  tech_stack: string[];
  user: {
    name: string;
    avatarUrl?: string;
  };
  views?: number;
  score?: number;
  userInteraction?: {
    hasLiked: boolean;
    hasBookmarked: boolean;
    rating: number;
  };
}
