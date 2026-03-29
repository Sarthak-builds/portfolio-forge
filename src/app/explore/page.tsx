"use client";

import { AnimatePresence, useMotionValue, useTransform } from "motion/react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExploreStore } from "@/store/useExploreStore";
import { usePortfolioFeed, useRating } from "@/features/explore/lib/hooks";
import { PortfolioCard } from "@/features/explore/components/PortfolioCard";
import { RatingActions } from "@/features/explore/components/RatingActions";

export default function ExplorePage() {
    const cards = useExploreStore((s) => s.cards);

    const { isLoading, refetch } = usePortfolioFeed();
    const { rate, dismiss, isPending } = useRating();

    // Swipe motion values — attached to the top card only
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-18, 18]);
    const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

    const handleDragEnd = (_event: any, info: any) => {
        if (info.offset.x > 100) dismiss();
        else if (info.offset.x < -100) dismiss();
    };

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
                <div className="text-4xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-zinc-900">You're all caught up!</h2>
                <p className="text-zinc-500 max-w-sm mt-2">
                    Check back later for more amazing portfolios to discover and rate.
                </p>
                <Button onClick={() => refetch()} variant="outline" className="mt-6">
                    Refresh Feed
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center max-w-sm mx-auto w-full pt-4 md:pt-10">
            <div className="relative w-full aspect-[4/5] sm:aspect-square md:aspect-[3/4] max-h-[600px]">
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

            <RatingActions
                onDismiss={dismiss}
                onLike={dismiss}
                onRate={(score) => topCard && rate(topCard.id, score)}
                isPending={isPending}
            />
        </div>
    );
}
