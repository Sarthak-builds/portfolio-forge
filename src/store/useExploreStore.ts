import { create } from 'zustand';
import { Portfolio } from '@/app/explore/lib/types';

interface ExploreState {
  cards: Portfolio[];
  setCards: (cards: Portfolio[]) => void;
  updateCard: (id: string, updates: Partial<Portfolio>) => void;
  dismissFirst: () => void;
  hasMore: boolean;
  setHasMore: (hasMore: boolean) => void;
}

export const useExploreStore = create<ExploreState>()((set) => ({
  cards: [],
  setCards: (cards: Portfolio[]) => set({ cards }),
  updateCard: (id, updates) => 
    set((state) => ({
      cards: state.cards.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    })),
  dismissFirst: () =>
    set((state) => ({ cards: state.cards.slice(1) })),
  hasMore: true,
  setHasMore: (hasMore: boolean) => set({ hasMore }),
}));
