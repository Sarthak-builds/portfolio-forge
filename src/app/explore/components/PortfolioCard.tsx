"use client";

import { motion } from "motion/react";
import { ThumbsUp, Github, Star, Bookmark, MessageSquare, ChevronRight, ChevronLeft } from "lucide-react";
import { UserAvatar } from "@/components/custom/UserAvatar";
import { IframeViewer } from "@/components/custom/IframeViewer";
import { Badge } from "@/components/ui/badge";
import { Portfolio } from "@/app/explore/lib/types";
import { getHostname } from "@/app/explore/lib/utils";
import { useBookmarkStore } from "@/store/useBookmarkStore";
import { useAuthStore } from "@/app/auth/lib/useAuthstore";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useApi } from "@/lib/api/use-api";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";

interface PortfolioCardProps {
    card: Portfolio & { color?: string };
    index: number;
    isTop: boolean;
    onLike: () => void;
    onBookmark: () => void;
    onRate: (score: number) => void;
    onNext: () => void;
    onPrev?: () => void;
    isPending?: boolean;
}

export function PortfolioCard({ card, onLike, onBookmark, onRate, onNext, onPrev, isPending }: PortfolioCardProps) {
    const bookmarked = card.userInteraction?.hasBookmarked || false;
    const liked = card.userInteraction?.hasLiked || false;
    const userRating = card.userInteraction?.rating || 0;
    const [newComment, setNewComment] = useState("");
    const { fetchComments, commentPortfolio } = useApi();
    const { user: currentUser } = useAuthStore();
    const commentsRef = useRef<HTMLDivElement>(null);

    const { data: comments = [], refetch: refetchComments } = useQuery({
        queryKey: ["comments", card.id],
        queryFn: () => fetchComments(card.id),
    });

    const addCommentMutation = useMutation({
        mutationFn: (content: string) => commentPortfolio({ id: card.id, content }),
        onSuccess: () => {
            refetchComments();
            setNewComment("");
            toast.success("Comment posted");
        },
    });

    const scrollToComments = () => {
        commentsRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        addCommentMutation.mutate(newComment);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full flex flex-col bg-background"
        >
            {/* The Theatre Stage: Full Screen Preview */}
            <div className="relative h-[calc(100vh-3rem)] scale-95 mt-2 rounded-[32px] overflow-hidden bg-black border border-border shadow-2xl shrink-0 group mx-1">
                <IframeViewer url={card.url} title={card.title} />
                
                {/* Navigation Arrows - Bounded to the Preview Stage */}
                {onPrev && (
                    <button 
                        onClick={(e) => {
                            e.preventDefault();
                            onPrev();
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-all active:scale-90 shadow-2xl backdrop-blur-xl border border-white/10 opacity-0 group-hover:opacity-100"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                )}

                <button 
                    onClick={(e) => {
                        e.preventDefault();
                        onNext();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-all active:scale-90 shadow-2xl backdrop-blur-xl border border-white/10 opacity-0 group-hover:opacity-100"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>

                {/* Overlay Links */}
                <div className="absolute top-6 right-16 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {card.github_url && (
                        <a 
                            href={card.github_url} 
                            target="_blank" 
                            rel="noreferrer"
                            className="p-3 rounded-2xl bg-black/60 backdrop-blur-md text-white border border-white/10 hover:bg-black/80 transition-all"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                    )}
                </div>
            </div>

            {/* YouTube Inspired Info Section */}
            <div className="max-w-7xl mx-auto w-full px-6 py-8 flex flex-col gap-6">
                
                {/* 1. Channel & Actions Row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <UserAvatar 
                            name={card.user?.name} 
                            image={card.user?.avatarUrl} 
                            size="md" 
                            className="w-10 h-10 md:w-12 md:h-12 shrink-0"
                        />
                        <div className="flex flex-col">
                            <span className="text-sm md:text-base font-bold text-foreground leading-tight">{card.user?.name || 'Anonymous'}</span>
                            <span className="text-[10px] md:text-xs text-muted-foreground font-medium uppercase tracking-widest">{getHostname(card.url)}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 md:gap-3">
                        {/* Star Rating Info */}
                        <div className="flex items-center gap-1.5 md:gap-2 bg-muted/30 px-3 md:px-5 h-9 md:h-10 rounded-full border border-border/50">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => onRate(star)}
                                    disabled={isPending}
                                    className="p-0.5 hover:scale-125 transition-all text-muted-foreground hover:text-accent group/star"
                                >
                                    <Star className={cn(
                                        "w-3.5 h-3.5 md:w-4 md:h-4 transition-colors",
                                        userRating >= star ? "fill-current text-accent" : "text-muted-foreground/40 group-hover/star:text-accent/50"
                                    )} />
                                </button>
                            ))}
                            <div className="ml-1 md:ml-2 h-3 md:h-4 w-[1px] bg-border" />
                            <span className="ml-0.5 md:ml-1 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-foreground">
                                {card.score ? Number(card.score).toFixed(1) : "0.0"}
                            </span>
                        </div>

                        {/* Like Pill */}
                        <div className={cn(
                            "flex items-center rounded-full h-9 md:h-10 border border-border/50 overflow-hidden transition-all",
                            liked ? "bg-accent/10 border-accent/20" : "bg-muted/50"
                        )}>
                            <button 
                                onClick={onLike}
                                disabled={isPending}
                                className={cn(
                                    "flex items-center gap-2 px-4 md:px-6 h-full hover:bg-muted transition-colors",
                                    liked && "text-accent"
                                )}
                            >
                                <ThumbsUp className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">{liked ? 'Liked' : 'Like'}</span>
                            </button>
                        </div>

                        {/* Save Action */}
                        <button 
                            onClick={onBookmark}
                            className={cn(
                                "flex items-center gap-2 px-4 md:px-6 h-9 md:h-10 rounded-full bg-muted/50 hover:bg-muted border border-border/50 transition-all",
                                bookmarked && "text-accent bg-accent/5 border-accent/20"
                            )}
                        >
                            <Bookmark className={cn("w-3.5 h-3.5 md:w-4 md:h-4", bookmarked && "fill-current")} />
                            <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-foreground">Save</span>
                        </button>
                    </div>
                </div>

                {/* 2. Description Box (Portfolio Brief) */}
                <div className="bg-muted/30 rounded-2xl p-4 md:p-6 border border-border/40">
                    <div className="flex flex-col gap-4">
                        <div className="space-y-1">
                            <h2 className="text-lg md:text-xl tracking-tight text-foreground uppercase">
                                {card.title}
                            </h2>
                            <div className="flex flex-wrap items-center gap-2 md:gap-3">
                                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest opacity-60">Portfolio Brief</span>
                                <div className="flex flex-wrap gap-1.5 md:gap-2">
                                    {(card.tech_stack || []).slice(0, 5).map((tag) => (
                                        <Badge key={tag} variant="secondary" className="bg-foreground/5 text-foreground/60 border-none text-[7px] md:text-[8px] px-2 py-0.5 font-bold uppercase tracking-widest">
                                            #{tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className="text-xs md:text-sm text-foreground/80 leading-relaxed font-medium max-w-4xl">
                            {card.description || "This forge masterpiece was crafted with precision. Witness the architectural vision and seamless execution of this high-end portfolio."}
                        </p>
                    </div>
                </div>

                {/* 3. Comments Section */}
                <div ref={commentsRef} className=" max-w-4xl">
                    <div className="flex items-center gap-8">
                        <h4 className="text-xl font-medium">{comments.length} COMMENTS</h4>
                    </div>

                    {/* Add Comment */}
                    <div className="flex gap-3 ">
                        <UserAvatar 
                            name={currentUser?.name} 
                            image={currentUser?.avatarUrl} 
                            size="sm" 
                            className="w-10 h-10 shrink-0" 
                        />
                        <form onSubmit={handleCommentSubmit} className="flex-1 group">
                            <input
                                placeholder="Add a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleCommentSubmit(e);
                                    }
                                }}
                                className="w-full bg-transparent border-0 border-b border-border py-2 text-sm focus:outline-none focus:border-foreground focus:border-b-2 transition-all placeholder:text-muted-foreground/50"
                            />
                            <div className="flex justify-end gap-3 mt-2 opacity-0 group-focus-within:opacity-100 transition-opacity">
                                <Button variant="ghost" size="sm" onClick={() => setNewComment("")} className="text-[10px] font-bold uppercase tracking-widest">Cancel</Button>
                                <Button 
                                    type="submit" 
                                    size="sm" 
                                    disabled={!newComment.trim() || addCommentMutation.isPending} 
                                    className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-6 text-[10px] font-black uppercase tracking-widest"
                                >
                                    {addCommentMutation.isPending ? "Posting..." : "Comment"}
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Comment List */}
                    <div className="space-y-1">
                        {comments.length === 0 ? (
                            <div className="text-center py-10 opacity-40">
                                <p className="text-xs font-black uppercase tracking-[0.2em]">No comments yet</p>
                            </div>
                        ) : (
                            comments.map((comment: any) => (
                                <div key={comment.id} className="flex gap-2 group bg-black/5 rounded-xl px-3 py-4">
                                    <UserAvatar 
                                        name={comment.user.name} 
                                        image={comment.user.avatarUrl} 
                                        size="sm" 
                                        className="w-10 h-10 shrink-0" 
                                    />
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-foreground">@{comment.user.name.toLowerCase().replace(/\s+/g, '')}</span>
                                            <span className="text-[10px] text-muted-foreground font-medium">
                                                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                                            </span>
                                        </div>
                                        <p className="text-sm text-foreground/90 leading-relaxed font-normal">
                                            {comment.content}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
