"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "motion/react";
import { useAuthStore } from "@/app/auth/lib/useAuthstore";
import { useSwipe } from "@/app/explore/hooks/use-swipe";
import { useExploreStore } from "@/store/useExploreStore";
import { usePortfolioFeed, useRating } from "@/app/explore/hooks";
import { PortfolioCard } from "@/app/explore/components/PortfolioCard";
import { RatingActions } from "@/app/explore/components/RatingActions";
import { SkeletonCard } from "@/components/custom/SkeletonCard";
import { EmptyState } from "@/components/custom/EmptyState";
import { Sparkles, Compass } from "lucide-react";
import { GlowBackground } from "@/components/custom/GlowBackground";

export default function ExplorePage() {
    const cards = useExploreStore((s) => s.cards);
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/auth");
        }
    }, [isAuthenticated, router]);

    const { isLoading, refetch } = usePortfolioFeed();
    const { rate, like, bookmark, dismiss, isPending } = useRating();
    const { x, rotate, opacity, handleDragEnd } = useSwipe(dismiss);

    if (!isAuthenticated) return null;

    const topCard = cards[0];

    if (isLoading) {
        return (
            <div className="relative h-[80vh] w-full overflow-hidden">
                <SkeletonCard />
            </div>
        );
    }

    if (cards.length === 0) {
        return (
            <EmptyState 
                icon={Sparkles}
                title="The Forge is Cooling Down"
                description="You've explored all the modern portfolios in the feed. Check back soon for new creations from the community."
                action={{
                    label: "Refresh Feed",
                    onClick: () => refetch()
                }}
            />
        );
    }

    return (
        <div className="flex flex-col h-[calc(100vh-14rem)] relative">
            <div className="mb-10 flex flex-col items-center text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                    Live Feed
                </div>
                <h1 className="text-3xl font-black tracking-tighter text-white">Discover the Forge</h1>
                <p className="text-zinc-500 font-medium text-sm">Experience the best developer work on the planet.</p>
            </div>

            <div className="relative flex-1 w-full max-w-5xl mx-auto perspective-[1000px]">
                <AnimatePresence>
                    {cards.slice(0, 2).reverse().map((card, index) => {
                        // Real index for the array slice
                        const realIndex = cards.indexOf(card);
                        return (
                            <PortfolioCard
                                key={card.id || realIndex}
                                card={card as any}
                                index={realIndex}
                                isTop={realIndex === 0}
                                x={x}
                                rotate={rotate}
                                opacity={opacity}
                                onDragEnd={handleDragEnd}
                            />
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Float Action Bar */}
            <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 md:left-[calc(50%+128px)]">
                <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 p-2 rounded-full shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                    <RatingActions
                        onDismiss={() => dismiss()}
                        onLike={() => topCard && like(topCard.id)}
                        onBookmark={() => topCard && bookmark(topCard.id)}
                        onRate={(score) => topCard && rate(topCard.id, score)}
                        isPending={isPending}
                        portfolioId={topCard?.id}
                    />
                </div>
            </div>
        </div>
    );
}
