"use client";

import { X, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RatingActionsProps {
    onSwipeLeft: () => void;
    onSwipeRight: () => void;
    onRate: (score: number) => void;
}

export function RatingActions({ onSwipeLeft, onSwipeRight, onRate }: RatingActionsProps) {
    return (
        <div className="flex justify-center items-center gap-6 mt-8">
            <Button
                variant="outline"
                size="icon"
                className="h-14 w-14 rounded-full border-2 border-red-500/20 text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-500 transition-all shadow-sm"
                onClick={onSwipeLeft}
            >
                <X className="h-6 w-6" />
            </Button>

            <div className="flex flex-col items-center -mt-4 gap-2">
                <div className="flex gap-1.5 bg-white px-4 py-2 rounded-full border border-zinc-200 shadow-sm">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            onClick={() => onRate(star)}
                            className="h-5 w-5 text-zinc-300 hover:text-amber-400 cursor-pointer transition-colors"
                        />
                    ))}
                </div>
            </div>

            <Button
                variant="outline"
                size="icon"
                className="h-14 w-14 rounded-full border-2 border-emerald-500/20 text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-500 transition-all shadow-sm"
                onClick={onSwipeRight}
            >
                <Heart className="h-6 w-6" />
            </Button>
        </div>
    );
}
