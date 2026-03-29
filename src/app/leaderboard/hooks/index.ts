import { useQuery } from '@tanstack/react-query';
import { useApi } from '@/features/api/use-api';
import { useLeaderboardStore } from '@/store/useLeaderboardStore';
import { LeaderboardEntry, LeaderboardFilter } from '@/features/leaderboard/lib/types';

/**
 * Fetches the leaderboard for a given filter and stores the result in Zustand.
 */
export function useLeaderboard(filter: LeaderboardFilter = 'all-time') {
  const { fetchLeaderboard } = useApi();
  const setEntries = useLeaderboardStore((s) => s.setEntries);

  return useQuery<LeaderboardEntry[]>({
    queryKey: ['leaderboard', filter],
    queryFn: async () => {
      const data = await fetchLeaderboard(filter);
      setEntries(data ?? []);
      return data ?? [];
    },
  });
}
