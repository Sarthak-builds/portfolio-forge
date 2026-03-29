import { create } from 'zustand';
import { Portfolio } from '@/app/explore/lib/types';

interface ExploreState {
  cards: Portfolio[];
  setCards: (cards: Portfolio[]) => void;
  dismissFirst: () => void;
  hasMore: boolean;
  setHasMore: (hasMore: boolean) => void;
}

export const useExploreStore = create<ExploreState>()((set) => ({
  cards: [],
  setCards: (cards: Portfolio[]) => set({ cards }),
  dismissFirst: () =>
    set((state) => ({ cards: state.cards.slice(1) })),
  hasMore: true,
  setHasMore: (hasMore: boolean) => set({ hasMore }),
}));
