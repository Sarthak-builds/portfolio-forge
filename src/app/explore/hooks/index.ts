import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@/lib/api/use-api';
import { useExploreStore } from '@/store/useExploreStore';
import { assignCardColors } from '@/app/explore/lib/utils';
import { Portfolio } from '@/app/explore/lib/types';
import { toast } from 'sonner';

/**
 * Manages fetching the portfolio feed and loading it into the Zustand store.
 */
export function usePortfolioFeed() {
    const { fetchExploreFeed } = useApi();
    const setCards = useExploreStore((s) => s.setCards);
    const setHasMore = useExploreStore((s) => s.setHasMore);

    const query = useQuery({
        queryKey: ['portfolio-feed'],
        queryFn: async () => {
            const data = await fetchExploreFeed();
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
                score: p.score,
                userInteraction: p.userInteraction
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
export function useRating() {
    const { ratePortfolio, likePortfolio, bookmarkPortfolio } = useApi();
    const queryClient = useQueryClient();
    const updateCard = useExploreStore((s) => s.updateCard);
    const cards = useExploreStore((s) => s.cards);

    const rateMutation = useMutation({
        mutationFn: ({ id, score }: { id: string; score: number }) => ratePortfolio({ id, score }),
        onMutate: async ({ id, score }) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: ['portfolio-feed'] });

            const currentCard = cards.find(c => c.id === id);
            if (currentCard) {
                // Optimistically update the store
                updateCard(id, {
                    userInteraction: {
                        ...currentCard.userInteraction!,
                        rating: score
                    }
                });
            }
            return { currentCard };
        },
        onSuccess: (data: any, variables) => {
            const currentCard = cards.find(c => c.id === variables.id);
            if (currentCard) {
                updateCard(variables.id, {
                    score: data.updatedScore || currentCard.score,
                    userInteraction: {
                        ...currentCard.userInteraction!,
                        rating: variables.score
                    }
                });
            }
            // Silent refresh in background
            queryClient.invalidateQueries({ queryKey: ['portfolio-feed'] });
            toast.success("Successfully rated this masterpiece");
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || error.message || "Rating failed";
            toast.error(message);
        }
    });

    const likeMutation = useMutation({
        mutationFn: (id: string) => likePortfolio(id),
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ['portfolio-feed'] });
            const currentCard = cards.find(c => c.id === id);
            if (currentCard) {
                const newLiked = !currentCard.userInteraction?.hasLiked;
                updateCard(id, {
                    userInteraction: {
                        ...currentCard.userInteraction!,
                        hasLiked: newLiked
                    }
                });
            }
            return { currentCard };
        },
        onSuccess: (data: any, id) => {
            const currentCard = cards.find(c => c.id === id);
            if (currentCard) {
                updateCard(id, {
                    score: data.score || currentCard.score,
                    userInteraction: {
                        ...currentCard.userInteraction!,
                        hasLiked: data.liked
                    }
                });
            }
            queryClient.invalidateQueries({ queryKey: ['portfolio-feed'] });
            const message = data?.liked ? "Portfolio Liked" : "Like removed";
            toast.success(message);
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || error.message || "Like failed";
            toast.error(message);
        }
    });

    const bookmarkMutation = useMutation({
        mutationFn: (id: string) => bookmarkPortfolio(id),
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ['portfolio-feed'] });
            const currentCard = cards.find(c => c.id === id);
            if (currentCard) {
                const newBookmarked = !currentCard.userInteraction?.hasBookmarked;
                updateCard(id, {
                    userInteraction: {
                        ...currentCard.userInteraction!,
                        hasBookmarked: newBookmarked
                    }
                });
            }
            return { currentCard };
        },
        onSuccess: (data: any, id) => {
            const currentCard = cards.find(c => c.id === id);
            if (currentCard) {
                updateCard(id, {
                    score: data.score || currentCard.score,
                    userInteraction: {
                        ...currentCard.userInteraction!,
                        hasBookmarked: data.bookmarked
                    }
                });
            }
            queryClient.invalidateQueries({ queryKey: ['portfolio-feed'] });
            const message = data?.bookmarked ? "Bookmarked for later" : "Bookmark removed";
            toast.success(message);
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || error.message || "Bookmark failed";
            toast.error(message);
        }
    });

    const rate = (id: string, score: number) => {
        rateMutation.mutate({ id, score });
    };

    const like = (id: string) => {
        likeMutation.mutate(id);
    };

    const bookmark = (id: string) => {
        bookmarkMutation.mutate(id);
    };

    const dismiss = () => {
        // Now manual
    };

    return {
        rate,
        like,
        bookmark,
        dismiss,
        isPending: rateMutation.isPending || likeMutation.isPending || bookmarkMutation.isPending,
    };
}
