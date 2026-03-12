"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "motion/react";
import { X, Heart, MessageSquare, Star, ExternalLink, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useApi } from "@/features/api/use-api";
import { useQuery, useMutation } from "@tanstack/react-query";

const COLORS = ["bg-blue-500", "bg-emerald-500", "bg-purple-500", "bg-amber-500", "bg-rose-500"];

export default function ExplorePage() {
    const { fetchPortfolios, ratePortfolio } = useApi();

    const [localCards, setLocalCards] = useState<any[]>([]);

    // Fetch feed
    const { data: portfoliosData, isLoading, refetch } = useQuery({
        queryKey: ['portfolios-feed'],
        queryFn: () => fetchPortfolios(),
    });

    useEffect(() => {
        if (portfoliosData) {
            // Apply random colors and map data
            const mapped = portfoliosData.map((p: any, i: number) => ({
                ...p,
                color: COLORS[i % COLORS.length]
            }));
            setLocalCards(mapped);
        }
    }, [portfoliosData]);

    const rateMutation = useMutation({
        mutationFn: ratePortfolio,
    });

    // Motion values for swipe animation (active top card)
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-18, 18]);
    const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

    const handleDragEnd = (event: any, info: any) => {
        if (info.offset.x > 100) {
            handleSwipe("right");
        } else if (info.offset.x < -100) {
            handleSwipe("left");
        }
    };

    const handleSwipe = (direction: "left" | "right") => {
        const topCard = localCards[0];
        if (!topCard) return;

        // If swiped right, we could send a default "like" rating if we want
        // For now, we just dismiss the card from view

        setTimeout(() => {
            setLocalCards((prev) => prev.slice(1));
        }, 200);
    };

    const handleRate = (score: number) => {
        const topCard = localCards[0];
        if (!topCard) return;

        rateMutation.mutate({ id: topCard.id, score });
        // After rating, it could either stay or dismiss. Let's dismiss for the "feed" behavior
        handleSwipe("right");
    };

    if (isLoading) {
        return <div className="flex h-[calc(100vh-12rem)] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-zinc-400" /></div>;
    }

    if (localCards.length === 0) {
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
                    {localCards.map((card, index) => {
                        const isTop = index === 0;
                        return (
                            <motion.div
                                key={card.id || index}
                                style={{
                                    x: isTop ? x : 0,
                                    rotate: isTop ? rotate : 0,
                                    opacity: isTop ? opacity : 1,
                                    scale: isTop ? 1 : 1 - index * 0.05,
                                    zIndex: localCards.length - index,
                                    transformOrigin: "bottom",
                                }}
                                drag={isTop ? "x" : false}
                                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                onDragEnd={isTop ? handleDragEnd : undefined}
                                className="absolute inset-0 w-full rounded-3xl shadow-xl overflow-hidden cursor-grab active:cursor-grabbing border border-zinc-200 bg-white"
                            >
                                {/* Visual Region */}
                                <div className={`w-full h-[60%] ${card.color} relative overflow-hidden flex items-center justify-center`}>
                                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "20px 20px" }} />
                                    <a href={card.url} target="_blank" rel="noreferrer" className="z-10 bg-white/90 hover:bg-white backdrop-blur-sm px-6 py-3 rounded-xl font-mono text-zinc-800 shadow-sm flex items-center gap-2 transition-colors cursor-pointer">
                                        {card.url ? new URL(card.url.startsWith('http') ? card.url : `https://${card.url}`).hostname : "Link"} <ExternalLink className="w-4 h-4 ml-2 opacity-50" />
                                    </a>
                                </div>

                                {/* Details Region */}
                                <div className="h-[40%] bg-white p-5 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10 border border-zinc-100">
                                                    <AvatarFallback>{(card.title || "P").charAt(0).toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <h3 className="font-bold text-lg leading-none text-zinc-900">{card.title || "Untitled Portfolio"}</h3>
                                                    <p className="text-sm text-zinc-500 mt-1">Creator</p>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-zinc-600 line-clamp-2 mt-3">{card.description || "No description provided."}</p>
                                    </div>

                                    <div className="flex flex-wrap gap-1.5 mt-auto">
                                        {(card.tech_stack || []).map((tech: string, i: number) => (
                                            <Badge key={i} variant="secondary" className="bg-zinc-100 text-zinc-600 font-normal hover:bg-zinc-200">{tech}</Badge>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center items-center gap-6 mt-8">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-14 w-14 rounded-full border-2 border-red-500/20 text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-500 transition-all shadow-sm"
                    onClick={() => handleSwipe("left")}
                >
                    <X className="h-6 w-6" />
                </Button>

                <div className="flex flex-col items-center -mt-4 gap-2">
                    {/* Star Rating mapped to handleRate */}
                    <div className="flex gap-1.5 bg-white px-4 py-2 rounded-full border border-zinc-200 shadow-sm">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                onClick={() => handleRate(star)}
                                className="h-5 w-5 text-zinc-300 hover:text-amber-400 cursor-pointer transition-colors"
                            />
                        ))}
                    </div>
                </div>

                <Button
                    variant="outline"
                    size="icon"
                    className="h-14 w-14 rounded-full border-2 border-emerald-500/20 text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-500 transition-all shadow-sm"
                    onClick={() => handleSwipe("right")}
                >
                    <Heart className="h-6 w-6" />
                </Button>
            </div>
        </div>
    );
}
