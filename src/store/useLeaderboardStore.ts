import { create } from 'zustand';
import { LeaderboardEntry, LeaderboardFilter } from '@/features/leaderboard/lib/types';

interface LeaderboardState {
  entries: LeaderboardEntry[];
  setEntries: (entries: LeaderboardEntry[]) => void;
  activeFilter: LeaderboardFilter;
  setActiveFilter: (filter: LeaderboardFilter) => void;
}

export const useLeaderboardStore = create<LeaderboardState>()((set) => ({
  entries: [],
  setEntries: (entries: LeaderboardEntry[]) => set({ entries }),
  activeFilter: 'all-time',
  setActiveFilter: (filter: LeaderboardFilter) => set({ activeFilter: filter }),
}));
