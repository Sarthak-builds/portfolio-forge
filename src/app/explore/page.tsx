"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/auth/lib/useAuthstore";
import { useExploreStore } from "@/store/useExploreStore";
import { usePortfolioFeed, useRating } from "@/app/explore/hooks";
import { PortfolioCard } from "@/app/explore/components/PortfolioCard";
import { SkeletonCard } from "@/components/custom/SkeletonCard";
import { EmptyState } from "@/components/custom/EmptyState";
import { Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ExplorePage() {
    const cards = useExploreStore((s) => s.cards);
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/auth");
        }
    }, [isAuthenticated, router]);

    const { isLoading, refetch } = usePortfolioFeed();
    const { rate, like, bookmark, isPending } = useRating();

    if (!isAuthenticated) return null;

    if (isLoading) {
        return (
            <div className="flex flex-col gap-8 p-4 md:p-8 h-[calc(100vh-4rem)]">
                <SkeletonCard />
            </div>
        );
    }

    if (cards.length === 0 || currentIndex >= cards.length) {
        return (
            <EmptyState 
                icon={Sparkles}
                title="The Forge is Cooling Down"
                description="You've explored all the modern portfolios in the feed. Check back soon for new creations."
                action={{
                    label: "Refresh Feed",
                    onClick: () => {
                        setCurrentIndex(0);
                        refetch();
                    }
                }}
            />
        );
    }

    const currentCard = cards[currentIndex];

    const handleNext = () => {
        if (currentIndex < cards.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            // Re-fetch or show empty state
            setCurrentIndex(cards.length);
        }
    };

    return (
        <div className="h-[calc(100vh-4rem)] relative flex flex-col bg-background overflow-hidden">
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card/50 backdrop-blur-sm shrink-0">
                <div className="flex flex-col">
                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-accent">Discovery Mode</h2>
                    <p className="text-[10px] text-muted-foreground font-bold">{currentIndex + 1} of {cards.length} portfolios forged</p>
                </div>

                <Button 
                    onClick={handleNext}
                    className="h-10 px-6 rounded-xl bg-accent text-white hover:opacity-90 font-black text-[10px] uppercase tracking-widest shadow-lg shadow-accent/20 transition-all active:scale-95 group"
                >
                    Next Portfolio
                    <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
            </div>

            {/* Content Area - Scrollable for comments */}
            <div className="flex-1 overflow-y-auto hide-scrollbar p-4 md:p-8">
                <div className="max-w-6xl mx-auto">
                    <PortfolioCard
                        card={currentCard as any}
                        index={currentIndex}
                        isTop={true}
                        onLike={() => like(currentCard.id)}
                        onBookmark={() => bookmark(currentCard.id)}
                        onRate={(score) => rate(currentCard.id, score)}
                        isPending={isPending}
                    />
                </div>
            </div>
        </div>
    );
}
