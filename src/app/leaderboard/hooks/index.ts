import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useApi } from '@/lib/api/use-api';
import { useLeaderboardStore } from '@/store/useLeaderboardStore';

export function useLeaderboard(filter: string) {
    const { fetchLeaderboard } = useApi();
    const setEntries = useLeaderboardStore((s) => s.setEntries);

    const query = useQuery({
        queryKey: ['leaderboard', filter],
        queryFn: () => fetchLeaderboard(filter),
        staleTime: 0,
        refetchOnMount: true,
    });

    useEffect(() => {
        if (query.data) {
            const entries = Array.isArray(query.data) ? query.data : (query.data?.data || []);
            setEntries(entries);
        }
    }, [query.data, setEntries]);

    return query;
}
