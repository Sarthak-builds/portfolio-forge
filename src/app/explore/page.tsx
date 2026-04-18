"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/app/auth/lib/useAuthstore";
import { useExploreStore } from "@/store/useExploreStore";
import { usePortfolioFeed, useRating } from "@/app/explore/hooks";
import { useApi } from "@/lib/api/use-api";
import { PortfolioCard } from "@/app/explore/components/PortfolioCard";
import { SkeletonCard } from "@/components/custom/SkeletonCard";
import { EmptyState } from "@/components/custom/EmptyState";
import { Sparkles } from "lucide-react";

function ExploreContent() {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const router = useRouter();
    const searchParams = useSearchParams();
    const targetId = searchParams.get("id");

    const storeCards = useExploreStore((s) => s.cards);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [shuffledCards, setShuffledCards] = useState<any[]>([]);
    const { trackView } = useApi();

    useEffect(() => {
        if (storeCards.length > 0) {
            if (shuffledCards.length === 0) {
                if (targetId) {
                    const targetCard = storeCards.find(c => c.id === targetId);
                    if (targetCard) {
                        // Put target card at the beginning, then shuffle the rest
                        const others = storeCards.filter(c => c.id !== targetId).sort(() => Math.random() - 0.5);
                        setShuffledCards([targetCard, ...others]);
                        return;
                    }
                }
                
                const shuffled = [...storeCards].sort(() => Math.random() - 0.5);
                setShuffledCards(shuffled);
            } else {
                // Update existing shuffled cards with new data from storeCards to reflect likes/scores
                const updated = shuffledCards.map(sc => {
                    const fresh = storeCards.find(s => s.id === sc.id);
                    return fresh ? { ...sc, ...fresh } : sc;
                });
                // Check if they are actually different before setting state to avoid loops
                if (JSON.stringify(updated) !== JSON.stringify(shuffledCards)) {
                    setShuffledCards(updated);
                }
            }
        }
    }, [storeCards, shuffledCards, targetId]);

    const currentCard = shuffledCards[currentIndex];

    useEffect(() => {
        if (currentCard?.id && isAuthenticated) {
            trackView(currentCard.id).catch(console.error);
        }
    }, [currentCard?.id, trackView, isAuthenticated]);

    const { isLoading, refetch } = usePortfolioFeed();
    const { rate, like, bookmark, isPending } = useRating();

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

    return (
        <div className="relative flex flex-col bg-background min-h-[calc(100vh-4rem)] -m-6 md:-m-12 lg:-m-16 overflow-x-hidden">
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
                        onNext={handleNext}
                        onPrev={currentIndex > 0 ? handlePrev : undefined}
                        isPending={isPending}
                    />
                </div>
            </div>
        </div>
    );
}

export default function ExplorePage() {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/auth");
        }
    }, [isAuthenticated, router]);

    return (
        <Suspense fallback={<div className="flex items-center justify-center h-screen"><SkeletonCard /></div>}>
            <ExploreContent />
        </Suspense>
    );
}
