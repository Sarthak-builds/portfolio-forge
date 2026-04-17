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

export default function ExplorePage() {
    const storeCards = useExploreStore((s) => s.cards);
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [shuffledCards, setShuffledCards] = useState<any[]>([]);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/auth");
        }
    }, [isAuthenticated, router]);

    useEffect(() => {
        if (storeCards.length > 0 && shuffledCards.length === 0) {
            const shuffled = [...storeCards].sort(() => Math.random() - 0.5);
            setShuffledCards(shuffled);
        }
    }, [storeCards, shuffledCards.length]);

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

    if (shuffledCards.length === 0 || currentIndex >= shuffledCards.length) {
        return (
            <EmptyState 
                icon={Sparkles}
                title="The Forge is Cooling Down"
                description="You've explored all the modern portfolios in the feed. Check back soon for new creations."
                action={{
                    label: "Refresh Feed",
                    onClick: () => {
                        setCurrentIndex(0);
                        setShuffledCards([]);
                        refetch();
                    }
                }}
            />
        );
    }

    const currentCard = shuffledCards[currentIndex];

    const handleNext = () => {
        if (currentIndex < shuffledCards.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setCurrentIndex(shuffledCards.length);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    return (
        <div className="relative flex flex-col bg-background min-h-[calc(100vh-4rem)] -m-6 md:-m-12 lg:-m-16 overflow-x-hidden">
            {/* Navigation Arrows - Bounded to this container */}
            {currentIndex > 0 && (
                <button 
                    onClick={handlePrev}
                    className="absolute left-2 top-[40vh] -translate-y-1/2 z-50 p-2 rounded-full bg-foreground/5 hover:bg-foreground text-foreground hover:text-background transition-all active:scale-90 shadow-2xl backdrop-blur-xl border border-border/20"
                >
                    <ChevronRight className="w-5 h-5 rotate-180" />
                </button>
            )}

            <button 
                onClick={handleNext}
                className="absolute right-2 top-[40vh] -translate-y-1/2 z-50 p-2 rounded-full bg-foreground/5 hover:bg-foreground text-foreground hover:text-background transition-all active:scale-90 shadow-2xl backdrop-blur-xl border border-border/20"
            >
                <ChevronRight className="w-5 h-5" />
            </button>

            {/* Content Area - Scrollable for comments */}
            <div className="flex-1 overflow-y-auto hide-scrollbar p-0">
                <div className="w-full">
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
