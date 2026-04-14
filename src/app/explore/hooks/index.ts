import { useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useApi } from '@/lib/api/use-api';
import { useExploreStore } from '@/store/useExploreStore';
import { assignCardColors } from '@/app/explore/lib/utils';
import { Portfolio } from '@/app/explore/lib/types';
import { toast } from 'sonner';

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
            const portfolios = Array.isArray(data) ? data : (data?.portfolios || []);
            
            // Map backend fields to frontend fields
            return portfolios.map((p: any) => ({
                id: p.id,
                title: p.name,
                description: p.description,
                url: p.liveUrl || null,
                github_url: p.githubUrl,
                tech_stack: p.stack,
                user: p.user,
                views: p.views,
                score: p.score
            })) as Portfolio[];
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
/**
 * Manages the rating actions and updates the local store instantly (optimistic).
 */
export function useRating() {
    const { ratePortfolio, likePortfolio, bookmarkPortfolio } = useApi();
    const dismissFirst = useExploreStore((s) => s.dismissFirst);

    const rateMutation = useMutation({
        mutationFn: ({ id, score }: { id: string; score: number }) => ratePortfolio({ id, score }),
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Rating failed");
        }
    });

    const likeMutation = useMutation({
        mutationFn: (id: string) => likePortfolio(id),
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Like failed");
        }
    });

    const bookmarkMutation = useMutation({
        mutationFn: (id: string) => bookmarkPortfolio(id),
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Bookmark failed");
        }
    });

    const rate = (id: string, score: number) => {
        rateMutation.mutate({ id, score });
        dismissFirst();
    };

    const like = (id: string) => {
        likeMutation.mutate(id);
        dismissFirst();
    };

    const bookmark = (id: string) => {
        bookmarkMutation.mutate(id);
    };

    const dismiss = () => {
        dismissFirst();
    };

    return {
        rate,
        like,
        bookmark,
        dismiss,
        isPending: rateMutation.isPending || likeMutation.isPending,
    };
}
