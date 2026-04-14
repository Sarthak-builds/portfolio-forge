"use client";

import React, { useState } from "react";
import { X, Heart, Star, MessageSquare, Bookmark, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommentDrawer } from "@/components/custom/CommentDrawer";
import { useBookmarkStore } from "@/store/useBookmarkStore";
import { useApi } from "@/lib/api/use-api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface RatingActionsProps {
    portfolioId?: string;
    onDismiss: () => void;
    onLike: () => void;
    onBookmark: () => void;
    onRate: (score: number) => void;
    isPending?: boolean;
}

export function RatingActions({ portfolioId, onDismiss, onLike, onBookmark, onRate, isPending }: RatingActionsProps) {
    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const { toggleBookmark, isBookmarked } = useBookmarkStore();
    const { fetchComments, commentPortfolio } = useApi();

    const { data: comments = [], refetch: refetchComments } = useQuery({
        queryKey: ["comments", portfolioId],
        queryFn: () => fetchComments(portfolioId as string),
        enabled: !!portfolioId && isCommentOpen,
    });

    const addCommentMutation = useMutation({
        mutationFn: (content: string) => commentPortfolio({ id: portfolioId as string, content }),
        onSuccess: () => {
            refetchComments();
            toast.success("Comment posted to the forge");
        },
    });

    const handleBookmark = () => {
        if (!portfolioId) return;
        toggleBookmark(portfolioId);
        onBookmark(); // Sync with backend
        toast.success(isBookmarked(portfolioId) ? "Removed from bookmarks" : "Saved to bookmarks");
    };

    return (
        <>
            <div className="flex items-center gap-3 px-2">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onDismiss}
                    disabled={isPending}
                    className="h-12 w-12 rounded-full text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all active:scale-95"
                >
                    <X className="h-6 w-6" />
                </Button>

                <div className="h-8 w-[1px] bg-white/5 mx-1" />

                <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full border border-white/5">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onClick={() => !isPending && onRate(star)}
                            disabled={isPending}
                            className={cn(
                                "p-1.5 rounded-md transition-all group",
                                isPending ? "opacity-50 cursor-not-allowed" : "hover:scale-125"
                            )}
                        >
                            <Star className={cn(
                                "h-5 w-5 transition-colors",
                                isPending ? "text-zinc-800" : "text-zinc-600 group-hover:text-amber-400 fill-current group-hover:fill-amber-400/20"
                            )} />
                        </button>
                    ))}
                </div>

                <div className="h-8 w-[1px] bg-white/5 mx-1" />

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => portfolioId && setIsCommentOpen(true)}
                    disabled={!portfolioId}
                    className="h-12 w-12 rounded-full text-zinc-500 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all active:scale-95"
                >
                    <MessageSquare className="h-5 w-5" />
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleBookmark}
                    disabled={!portfolioId}
                    className={cn(
                        "h-12 w-12 rounded-full transition-all active:scale-95",
                        portfolioId && isBookmarked(portfolioId) 
                        ? "text-amber-400 bg-amber-400/10" 
                        : "text-zinc-500 hover:text-amber-400 hover:bg-amber-400/10"
                    )}
                >
                    <Bookmark className={cn("h-5 w-5", portfolioId && isBookmarked(portfolioId) && "fill-current")} />
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onLike}
                    disabled={isPending}
                    className="h-12 w-12 rounded-full text-zinc-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all active:scale-95"
                >
                    <Heart className="h-6 w-6" />
                </Button>
            </div>

            <CommentDrawer
                isOpen={isCommentOpen}
                onOpenChange={setIsCommentOpen}
                portfolioId={portfolioId || ""}
                comments={comments}
                onAddComment={(content) => addCommentMutation.mutate(content)}
                isSubmitting={addCommentMutation.isPending}
            />
        </>
    );
}
