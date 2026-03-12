import { create } from 'zustand';
import { Portfolio } from '@/features/explore/lib/types';

interface ExploreState {
  cards: Portfolio[];
  setCards: (cards: Portfolio[]) => void;
  removeTopCard: () => void;
  ratedIds: Set<string>;
  markRated: (id: string) => void;
}

export const useExploreStore = create<ExploreState>()((set) => ({
  cards: [],
  setCards: (cards: Portfolio[]) => set({ cards }),
  removeTopCard: () =>
    set((state) => ({ cards: state.cards.slice(1) })),
  ratedIds: new Set(),
  markRated: (id: string) =>
    set((state) => ({ ratedIds: new Set([...state.ratedIds, id]) })),
}));
