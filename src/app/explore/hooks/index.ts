import { useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useApi } from '@/lib/api/use-api';
import { useExploreStore } from '@/store/useExploreStore';
import { assignCardColors } from '@/app/explore/lib/utils';
import { Portfolio } from '@/app/explore/lib/types';

/**
 * Manages fetching the portfolio feed and loading it into the Zustand store.
 */
export function usePortfolioFeed() {
    const { fetchPortfolios } = useApi();
    const setCards = useExploreStore((s) => s.setCards);
    const setHasMore = useExploreStore((s) => s.setHasMore);

    const query = useQuery({
        queryKey: ['portfolio-feed'],
        queryFn: async () => {
            const data = await fetchPortfolios();
            return data as Portfolio[];
        },
    });

    useEffect(() => {
        if (query.data) {
            const cardData = assignCardColors(query.data);
            setCards(cardData);
            setHasMore(cardData.length > 0);
        }
    }, [query.data, setCards, setHasMore]);

    return query;
}

/**
 * Manages the rating actions and updates the local store instantly (optimistic).
 */
export function useRating() {
    const { ratePortfolio } = useApi();
    const dismissFirst = useExploreStore((s) => s.dismissFirst);

    const mutation = useMutation({
        mutationFn: ({ id, score }: { id: string; score: number }) => ratePortfolio({ id, score }),
        onMutate: () => {
            // Logic handled by the 'dismiss' wrapper for immediate feel
        },
    });

    const rate = (id: string, score: number) => {
        mutation.mutate({ id, score });
        dismissFirst();
    };

    const dismiss = () => {
        dismissFirst();
    };

    return {
        rate,
        dismiss,
        isPending: mutation.isPending,
    };
}
