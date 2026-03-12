import { create } from 'zustand';

interface PortfolioState {
  currentPortfolio: any | null; // Use proper type when available
  setCurrentPortfolio: (portfolio: any | null) => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

export const usePortfolioStore = create<PortfolioState>()((set) => ({
  currentPortfolio: null,
  setCurrentPortfolio: (portfolio: any | null) => set({ currentPortfolio: portfolio }),
  isSubmitting: false,
  setIsSubmitting: (isSubmitting: boolean) => set({ isSubmitting }),
}));
