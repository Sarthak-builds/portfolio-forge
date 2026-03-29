import { useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useApi } from '@/features/api/use-api';
import { useExploreStore } from '@/store/useExploreStore';
import { assignCardColors } from '@/features/explore/utils';
import { Portfolio } from '@/features/explore/lib/types';

/**
 * Manages fetching the portfolio feed and loading it into the Zustand store.
 */
export function usePortfolioFeed() {
  const { fetchPortfolios } = useApi();
  const { setCards } = useExploreStore();

  const query = useQuery<Portfolio[]>({
    queryKey: ['portfolios-feed'],
    queryFn: () => fetchPortfolios(),
  });

  useEffect(() => {
    if (query.data) {
      setCards(assignCardColors(query.data));
    }
  }, [query.data, setCards]);

  return query;
}

/**
 * Handles rating a portfolio and removing it from the feed.
 */
export function useRating() {
  const { ratePortfolio } = useApi();
  const { removeTopCard, markRated } = useExploreStore();

  const mutation = useMutation({
    mutationFn: ({ id, score }: { id: string; score: number }) =>
      ratePortfolio({ id, score }),
    onSuccess: (_data, variables) => {
      markRated(variables.id);
    },
  });

  const rate = (id: string, score: number) => {
    mutation.mutate({ id, score });
    setTimeout(() => removeTopCard(), 200);
  };

  const dismiss = () => {
    setTimeout(() => removeTopCard(), 200);
  };

  return { rate, dismiss, isPending: mutation.isPending };
}
