"use client";

import { X, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RatingActionsProps {
    onDismiss: () => void;
    onLike: () => void;
    onRate: (score: number) => void;
    isPending?: boolean;
}

export function RatingActions({ onDismiss, onLike, onRate, isPending }: RatingActionsProps) {
    return (
        <div className="flex justify-center items-center gap-6 mt-8">
            <Button
                variant="outline"
                size="icon"
                disabled={isPending}
                className="h-12 w-12 rounded-xl border-border transition-all hover:bg-destructive hover:text-destructive-foreground active:scale-95"
                onClick={onDismiss}
            >
                <X className="h-5 w-5" />
            </Button>

            <div className="flex flex-col items-center -mt-2 gap-2">
                <div className="flex gap-1.5 bg-card px-4 py-2.5 rounded-xl border border-border shadow-sm">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            onClick={() => !isPending && onRate(star)}
                            className={`h-5 w-5 transition-colors cursor-pointer ${
                                isPending ? "text-muted opacity-50" : "text-muted-foreground hover:text-amber-400"
                            }`}
                        />
                    ))}
                </div>
            </div>

            <Button
                variant="outline"
                size="icon"
                disabled={isPending}
                className="h-12 w-12 rounded-xl border-border transition-all hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-600 active:scale-95"
                onClick={onLike}
            >
                <Heart className="h-5 w-5" />
            </Button>
        </div>
    );
}
