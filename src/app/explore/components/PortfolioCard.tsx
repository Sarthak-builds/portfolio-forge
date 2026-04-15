"use client";

import { motion } from "motion/react";
import { ExternalLink, Github, Star, Heart, Bookmark, MessageSquare } from "lucide-react";
import { UserAvatar } from "@/components/custom/UserAvatar";
import { IframeViewer } from "@/components/custom/IframeViewer";
import { Badge } from "@/components/ui/badge";
import { Portfolio } from "@/app/explore/lib/types";
import { getHostname } from "@/app/explore/lib/utils";
import { useBookmarkStore } from "@/store/useBookmarkStore";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { CommentDrawer } from "@/components/custom/CommentDrawer";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useApi } from "@/lib/api/use-api";
import { toast } from "sonner";

interface PortfolioCardProps {
    card: Portfolio & { color?: string };
    index: number;
    isTop: boolean;
    onLike: () => void;
    onBookmark: () => void;
    onRate: (score: number) => void;
    isPending?: boolean;
}

export function PortfolioCard({ card, onLike, onBookmark, onRate, isPending }: PortfolioCardProps) {
    const { isBookmarked } = useBookmarkStore();
    const bookmarked = isBookmarked(card.id);
    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const { fetchComments, commentPortfolio } = useApi();

    const { data: comments = [], refetch: refetchComments } = useQuery({
        queryKey: ["comments", card.id],
        queryFn: () => fetchComments(card.id),
        enabled: isCommentOpen,
    });

    const addCommentMutation = useMutation({
        mutationFn: (content: string) => commentPortfolio({ id: card.id, content }),
        onSuccess: () => {
            refetchComments();
            toast.success("Comment posted");
        },
    });

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full h-full max-h-[85vh] flex flex-col bg-card rounded-2xl border border-border shadow-sm overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:border-accent/20"
        >
            {/* The Theatre Stage: Full Width Preview */}
            <div className="relative flex-1 w-full bg-black overflow-hidden group-hover:brightness-110 transition-all duration-500">
                <IframeViewer url={card.url} title={card.title} />
                
                {/* Overlay Links - visible on hover */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {card.github_url && (
                        <a 
                            href={card.github_url} 
                            target="_blank" 
                            rel="noreferrer"
                            className="p-2 rounded-lg bg-black/60 backdrop-blur-md text-white border border-white/10 hover:bg-black/80 transition-all"
                        >
                            <Github className="w-4 h-4" />
                        </a>
                    )}
                </div>
            </div>

            {/* The Info Bar: YouTube Inspired */}
            <div className="p-4 flex flex-col gap-3 bg-card shrink-0 border-t border-border">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4">
                        <UserAvatar 
                            name={card.user?.name} 
                            image={card.user?.avatarUrl} 
                            size="md" 
                            className="shrink-0 ring-2 ring-transparent group-hover:ring-accent/20 transition-all"
                        />
                        <div className="space-y-1 min-w-0">
                            <Link href={`/portfolio/${card.id}`} className="block">
                                <h3 className="text-base font-bold text-foreground tracking-tight line-clamp-1 hover:text-accent transition-colors font-sans">
                                    {card.title}
                                </h3>
                            </Link>
                            <p className="text-[10px] text-muted-foreground font-medium flex items-center gap-1.5 flex-wrap">
                                <span className="uppercase tracking-widest">{card.user?.name || 'Anonymous'}</span>
                                <span className="opacity-40">•</span>
                                <span className="font-bold text-accent uppercase tracking-[0.2em] text-[8px]">{getHostname(card.url)}</span>
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                        {/* Interactive Rating Component */}
                        <div className="flex items-center gap-1 bg-muted/30 px-2 py-1 rounded-lg border border-border">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => onRate(star)}
                                    disabled={isPending}
                                    className="p-1 hover:scale-110 transition-all text-muted-foreground hover:text-accent group/star"
                                >
                                    <Star className={cn(
                                        "w-3.5 h-3.5 transition-colors",
                                        (card.score || 0) >= star ? "fill-accent text-accent" : "text-muted-foreground group-hover/star:text-accent/50"
                                    )} />
                                </button>
                            ))}
                            <span className="ml-2 text-[10px] font-black text-foreground">{card.score ? Number(card.score).toFixed(1) : "0.0"}</span>
                        </div>
                    </div>
                </div>

                {/* Tags & Actions Row */}
                <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5 overflow-hidden">
                        {(card.tech_stack || []).slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-muted text-muted-foreground border-none text-[8px] px-2 py-0 font-bold uppercase tracking-widest">
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    <div className="flex items-center gap-0.5">
                        <button 
                            onClick={onLike}
                            disabled={isPending}
                            className={cn(
                                "p-2 rounded-full transition-all active:scale-90",
                                "text-muted-foreground hover:text-accent hover:bg-accent/5"
                            )}
                        >
                            <Heart className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => setIsCommentOpen(true)}
                            className="p-2 rounded-full text-muted-foreground hover:text-accent hover:bg-accent/5 transition-all active:scale-90"
                        >
                            <MessageSquare className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={onBookmark}
                            className={cn(
                                "p-2 rounded-full transition-all active:scale-90",
                                bookmarked 
                                ? "text-accent bg-accent/10" 
                                : "text-muted-foreground hover:text-accent hover:bg-accent/5"
                            )}
                        >
                            <Bookmark className={cn("w-4 h-4", bookmarked && "fill-current")} />
                        </button>
                    </div>
                </div>
            </div>

            <CommentDrawer
                isOpen={isCommentOpen}
                onOpenChange={setIsCommentOpen}
                portfolioId={card.id}
                comments={comments}
                onAddComment={(content) => addCommentMutation.mutate(content)}
                isSubmitting={addCommentMutation.isPending}
            />
        </motion.div>
    );
}
