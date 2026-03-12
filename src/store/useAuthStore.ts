import { create } from 'zustand';

interface AuthState {
  user: any | null; // Replace any with a proper User type when available
  setUser: (user: any | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  setUser: (user: any | null) => set({ user }),
  isLoading: true,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));
