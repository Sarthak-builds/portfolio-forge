import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, AuthActions } from './types';

interface InternalState {
  hasHydrated: boolean;
  setHasHydrated: (val: boolean) => void;
}

export const useAuthStore = create<AuthState & AuthActions & InternalState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      hasHydrated: false,

      setHasHydrated: (val) => set({ hasHydrated: val }),

      setCredentials: (user, token) => set({
        user,
        token,
        isAuthenticated: true,
      }),

      logout: () => set({
        user: null,
        token: null,
        isAuthenticated: false,
      }),
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
