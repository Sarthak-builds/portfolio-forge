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
import { useState, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useApi } from "@/lib/api/use-api";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

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
    const [newComment, setNewComment] = useState("");
    const { fetchComments, commentPortfolio } = useApi();
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
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full flex flex-col bg-card rounded-2xl border border-border shadow-sm group transition-all duration-500 hover:shadow-2xl hover:border-accent/20"
        >
            {/* The Theatre Stage: Full Width Preview */}
            <div className="relative h-[70vh] w-full bg-black overflow-hidden group-hover:brightness-105 transition-all duration-500 shrink-0">
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
            <div className="p-6 flex flex-col gap-6 bg-card shrink-0 border-t border-border">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex gap-4">
                        <UserAvatar 
                            name={card.user?.name} 
                            image={card.user?.avatarUrl} 
                            size="lg" 
                            className="shrink-0 ring-2 ring-transparent group-hover:ring-accent/20 transition-all"
                        />
                        <div className="space-y-1 min-w-0">
                            <h3 className="text-xl font-bold text-foreground tracking-tight line-clamp-1 font-sans">
                                {card.title}
                            </h3>
                            <p className="text-xs text-muted-foreground font-medium flex items-center gap-2 flex-wrap">
                                <span className="uppercase tracking-widest">{card.user?.name || 'Anonymous'}</span>
                                <span className="opacity-40">•</span>
                                <span className="font-bold text-accent uppercase tracking-[0.2em] text-[10px]">{getHostname(card.url)}</span>
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-3 shrink-0">
                        {/* Interactive Rating Component */}
                        <div className="flex items-center gap-1.5 bg-muted/30 px-3 py-1.5 rounded-xl border border-border">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => onRate(star)}
                                    disabled={isPending}
                                    className="p-1 hover:scale-110 transition-all text-muted-foreground hover:text-accent group/star"
                                >
                                    <Star className={cn(
                                        "w-4 h-4 transition-colors",
                                        (card.score || 0) >= star ? "fill-accent text-accent" : "text-muted-foreground group-hover/star:text-accent/50"
                                    )} />
                                </button>
                            ))}
                            <span className="ml-2 text-xs font-black text-foreground">{card.score ? Number(card.score).toFixed(1) : "0.0"}</span>
                        </div>
                    </div>
                </div>

                {/* Tags & Actions Row */}
                <div className="flex items-center justify-between py-2 border-y border-border/50">
                    <div className="flex flex-wrap gap-2 overflow-hidden">
                        {(card.tech_stack || []).slice(0, 5).map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-muted text-muted-foreground border-none text-[9px] px-3 py-0.5 font-bold uppercase tracking-widest">
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <button 
                            onClick={onLike}
                            disabled={isPending}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-full transition-all active:scale-95 font-bold text-xs uppercase tracking-widest",
                                "text-foreground bg-muted/50 hover:bg-muted"
                            )}
                        >
                            <Heart className="w-4 h-4" />
                            Like
                        </button>
                        <button 
                            onClick={scrollToComments}
                            className="flex items-center gap-2 px-4 py-2 rounded-full text-foreground bg-muted/50 hover:bg-muted transition-all active:scale-95 font-bold text-xs uppercase tracking-widest"
                        >
                            <MessageSquare className="w-4 h-4" />
                            {comments.length}
                        </button>
                        <button 
                            onClick={onBookmark}
                            className={cn(
                                "p-2.5 rounded-full transition-all active:scale-95",
                                bookmarked 
                                ? "text-accent bg-accent/10" 
                                : "text-foreground bg-muted/50 hover:bg-muted"
                            )}
                        >
                            <Bookmark className={cn("w-4 h-4", bookmarked && "fill-current")} />
                        </button>
                    </div>
                </div>

                {/* Inline Comments Section */}
                <div ref={commentsRef} className="space-y-8 pt-4">
                    <div className="flex flex-col gap-6">
                        <h4 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                            Comments
                            <span className="text-muted-foreground">{comments.length}</span>
                        </h4>

                        {/* Add Comment Form */}
                        <div className="flex gap-4">
                            <UserAvatar size="md" className="shrink-0" />
                            <form onSubmit={handleCommentSubmit} className="flex-1 space-y-3">
                                <Textarea
                                    placeholder="Add a comment..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    className="min-h-[40px] bg-transparent border-0 border-b border-border rounded-none focus-visible:ring-0 focus-visible:border-accent transition-all resize-none px-0 py-2 text-sm"
                                />
                                <div className="flex justify-end gap-2">
                                    <Button 
                                        type="button" 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => setNewComment("")}
                                        className="text-[10px] font-black uppercase tracking-widest"
                                    >
                                        Cancel
                                    </Button>
                                    <Button 
                                        type="submit" 
                                        size="sm"
                                        disabled={!newComment.trim() || addCommentMutation.isPending}
                                        className="bg-accent text-accent-foreground hover:opacity-90 rounded-full px-6 text-[10px] font-black uppercase tracking-widest"
                                    >
                                        Comment
                                    </Button>
                                </div>
                            </form>
                        </div>

                        {/* Comments List */}
                        <div className="space-y-6 pt-4">
                            {comments.length === 0 ? (
                                <p className="text-center py-10 text-xs text-muted-foreground font-medium uppercase tracking-widest">No comments yet</p>
                            ) : (
                                comments.map((comment: any) => (
                                    <div key={comment.id} className="flex gap-4">
                                        <Avatar className="w-9 h-9 shrink-0 border border-border">
                                            <AvatarImage src={comment.user.avatarUrl} />
                                            <AvatarFallback className="text-[10px] font-bold">
                                                {comment.user.name.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center gap-2">
                                                <p className="text-xs font-black text-foreground">{comment.user.name}</p>
                                                <p className="text-[10px] text-muted-foreground font-medium">
                                                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                                                </p>
                                            </div>
                                            <p className="text-sm text-foreground/80 leading-relaxed">
                                                {comment.content}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
