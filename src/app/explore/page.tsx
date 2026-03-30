"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "motion/react";
import { useAuthStore } from "@/app/auth/lib/useAuthstore";
import { useSwipe } from "@/app/explore/hooks/use-swipe";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExploreStore } from "@/store/useExploreStore";
import { usePortfolioFeed, useRating } from "@/app/explore/hooks";
import { PortfolioCard } from "@/app/explore/components/PortfolioCard";
import { RatingActions } from "@/app/explore/components/RatingActions";

export default function ExplorePage() {
    const cards = useExploreStore((s) => s.cards);
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/auth/sign-in");
        }
    }, [isAuthenticated, router]);

    const { isLoading, refetch } = usePortfolioFeed();
    const { rate, dismiss, isPending } = useRating();
    const { x, rotate, opacity, handleDragEnd } = useSwipe(dismiss);

    if (!isAuthenticated) return null;

    const topCard = cards[0];

    if (isLoading) {
        return (
            <div className="flex h-[calc(100vh-12rem)] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
            </div>
        );
    }

    if (cards.length === 0) {
        return (
            <div className="flex h-[calc(100vh-12rem)] flex-col items-center justify-center text-center">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">You're all caught up!</h2>
                <p className="text-zinc-500 max-w-sm mt-2">
                    Check back later for more amazing portfolios to discover and rate.
                </p>
                <Button onClick={() => refetch()} variant="outline" className="mt-6 dark:border-zinc-700 dark:text-zinc-300">
                    Refresh Feed
                </Button>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 top-12 bottom-12 md:bottom-0 md:left-64 flex flex-col overflow-hidden bg-zinc-100 dark:bg-zinc-950 z-10">
            <div className="relative flex-1 w-full h-full z-0 sm:p-4 pb-0">
                <AnimatePresence>
                    {cards.map((card, index) => (
                        <PortfolioCard
                            key={card.id || index}
                            card={card as any}
                            index={index}
                            isTop={index === 0}
                            x={x}
                            rotate={rotate}
                            opacity={opacity}
                            onDragEnd={handleDragEnd}
                        />
                    ))}
                </AnimatePresence>
            </div>

            <div className="relative z-20 w-full flex justify-center py-4 sm:py-6 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-zinc-950 dark:via-zinc-950/80 pointer-events-none shrink-0 border-t border-zinc-200/50 dark:border-zinc-800/50 sm:border-transparent pb-4 sm:pb-8">
                <div className="pointer-events-auto  rounded-full">
                    <RatingActions
                        onDismiss={dismiss}
                        onLike={dismiss}
                        onRate={(score) => topCard && rate(topCard.id, score)}
                        isPending={isPending}
                    />
                </div>
            </div>
        </div>
    );
}
