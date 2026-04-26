"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useApi } from "@/lib/api/use-api";
import { IframeViewer } from "@/components/custom/IframeViewer";
import { UserAvatar } from "@/components/custom/UserAvatar";
import { StatsBadge } from "@/components/custom/StatsBadge";
import { CommentDrawer } from "@/components/custom/CommentDrawer";
import { RatingActions } from "@/app/explore/components/RatingActions";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
    ChevronLeft, 
    Github, 
    Star, 
    Eye, 
    Heart, 
    Bookmark, 
    MessageSquare, 
    Calendar,
    Globe,
    Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { toast } from "sonner";
import { useState } from "react";
export default function PortfolioDetailContent() {
    const { id } = useParams();
    const router = useRouter();
    const { fetchPortfolio, fetchComments, commentPortfolio, ratePortfolio, likePortfolio, bookmarkPortfolio } = useApi();
    const [newComment, setNewComment] = useState("");

    const { data: portfolio, isLoading, refetch: refetchPortfolio } = useQuery({
        queryKey: ["portfolio", id],
        queryFn: () => fetchPortfolio(id as string),
        enabled: !!id,
    });

    const { data: comments = [], refetch: refetchComments } = useQuery({
        queryKey: ["comments", id],
        queryFn: () => fetchComments(id as string),
        enabled: !!id,
    });

    const addCommentMutation = useMutation({
        mutationFn: (content: string) => commentPortfolio({ id: id as string, content }),
        onSuccess: () => {
            setNewComment("");
            refetchComments();
            refetchPortfolio();
            toast.success("Comment posted");
        },
    });

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        addCommentMutation.mutate(newComment);
    };

    const rateMutation = useMutation({
        mutationFn: (score: number) => ratePortfolio({ id: id as string, score }),
        onSuccess: () => {
            refetchPortfolio();
            toast.success("Rating submitted");
        },
    });

    const likeMutation = useMutation({
        mutationFn: () => likePortfolio(id as string),
        onSuccess: (data) => {
            refetchPortfolio();
            toast.success(data.liked ? "Liked successfully" : "Like removed");
        },
    });

    const bookmarkMutation = useMutation({
        mutationFn: () => bookmarkPortfolio(id as string),
        onSuccess: (data) => {
            refetchPortfolio();
            toast.success(data.bookmarked ? "Bookmarked successfully" : "Bookmark removed");
        },
    });

    if (isLoading) {
        return (
            <div className="flex flex-col lg:flex-row h-[90vh]">
                <div className="flex-1 p-4 lg:p-8">
                    <Skeleton className="w-full h-full rounded-2xl lg:rounded-3xl bg-muted/50" />
                </div>
                <div className="w-full lg:w-96 p-4 lg:p-8 border-t lg:border-t-0 lg:border-l border-border space-y-8">
                    <div className="flex items-center gap-4">
                        <Skeleton className="w-12 h-12 rounded-full bg-muted" />
                        <div className="space-y-2">
                            <Skeleton className="w-32 h-4 bg-muted" />
                            <Skeleton className="w-24 h-3 bg-muted" />
                        </div>
                    </div>
                    <Skeleton className="w-full h-32 bg-muted rounded-2xl" />
                    <Skeleton className="w-full h-48 bg-muted rounded-2xl" />
                </div>
            </div>
        );
    }

    if (!portfolio) return null;

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] overflow-hidden">
            {/* Main Stage */}
            <div className="flex-1 relative group/stage p-2 lg:p-6 overflow-hidden">
                <Button 
                    variant="ghost" 
                    onClick={() => router.back()}
                    className="absolute top-4 left-4 lg:top-8 lg:left-8 z-50 rounded-full bg-background/40 backdrop-blur-xl border border-border text-foreground hover:bg-muted active:scale-95 transition-all lg:opacity-0 group-hover/stage:opacity-100"
                >
                    <ChevronLeft className="w-5 h-5 mr-1" />
                    Back
                </Button>
                
                <div className="w-full h-full rounded-xl lg:rounded-3xl overflow-hidden border border-border shadow-2xl bg-card">
                    <IframeViewer url={portfolio.liveUrl || portfolio.url} title={portfolio.name || portfolio.title} />
                </div>
            </div>

            {/* Side Panel */}
            <div className="w-full lg:w-[450px] border-t lg:border-t-0 lg:border-l border-border bg-card flex flex-col shrink-0 h-[60vh] lg:h-full rounded-lg">
                <ScrollArea className="flex-1">
                    <div className="p-6 lg:p-8 space-y-8 lg:space-y-10">
                        {/* Header & Creator */}
                        <div className="space-y-6">
                            <div className="flex items-start justify-between gap-4">
                                <div className="space-y-1">
                                    <h1 className="text-2xl lg:text-3xl font-black text-foreground tracking-tighter leading-tight">
                                        {portfolio.name || portfolio.title}
                                    </h1>
                                    <div className="flex items-center gap-2 text-[10px] font-black text-accent uppercase tracking-widest">
                                        <Globe className="w-3 h-3" />
                                        Deployment Active
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <StatsBadge icon={Star} count={portfolio.score?.toFixed(1) || "0.0"} variant="amber" />
                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Global Rank: #{portfolio.rank || "???"}</p>
                                </div>
                            </div>

                            <a href={`/profile/${portfolio.user?.id}`} className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border border-border hover:bg-muted/50 transition-all group">
                                <UserAvatar name={portfolio.user?.name} image={portfolio.user?.avatarUrl} size="md" />
                                <div className="flex-1">
                                    <p className="text-sm font-black text-foreground tracking-tight">{portfolio.user?.name}</p>
                                    <p className="text-xs text-muted-foreground font-medium tracking-tight line-clamp-1">Architect & Developer</p>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ChevronLeft className="w-4 h-4 text-muted-foreground rotate-180" />
                                </div>
                            </a>
                        </div>

                        {/* Engagement Stats Grid */}
                        <div className="grid grid-cols-3 gap-3">
                            <div className="p-4 rounded-2xl bg-muted/30 border border-border space-y-1">
                                <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                                    <Eye className="w-3 h-3" />
                                    Reach
                                </div>
                                <p className="text-xl font-black text-foreground tracking-tighter">{portfolio.views || 0}</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-muted/30 border border-border space-y-1">
                                <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                                    <Heart className="w-3 h-3 text-red-500" />
                                    Likes
                                </div>
                                <p className="text-xl font-black text-foreground tracking-tighter">{portfolio.likes ?? portfolio._count?.likes ?? 0}</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-muted/30 border border-border space-y-1">
                                <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                                    <Bookmark className="w-3 h-3 text-amber-500" />
                                    Saved
                                </div>
                                <p className="text-xl font-black text-foreground tracking-tighter">{portfolio.bookmarks ?? portfolio._count?.bookmarks ?? 0}</p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                <Sparkles className="w-3.5 h-3.5" />
                                Project Manifest
                            </h3>
                            <p className="text-sm text-foreground/70 leading-relaxed font-medium">
                                {portfolio.description}
                            </p>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {(portfolio.stack || portfolio.tech_stack || [])?.map((tech: string) => (
                                    <Badge key={tech} variant="secondary" className="bg-muted text-muted-foreground border-border text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5">
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Comments Section */}
                        <div className="space-y-6 pt-6 border-t border-border">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                    <MessageSquare className="w-3.5 h-3.5" />
                                    Community Feed ({comments.length})
                                </h3>
                            </div>

                            {/* Add Comment Input */}
                            <form onSubmit={handleCommentSubmit} className="relative group">
                                <input
                                    type="text"
                                    placeholder="Share your thoughts..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    className="w-full h-12 bg-muted/30 border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent transition-all pr-12"
                                />
                                <Button 
                                    type="submit"
                                    disabled={!newComment.trim() || addCommentMutation.isPending}
                                    size="icon"
                                    className="absolute right-1.5 top-1.5 h-9 w-9 bg-accent hover:bg-accent/90 rounded-lg transition-all active:scale-95"
                                >
                                    <Globe className="w-4 h-4 rotate-90" />
                                </Button>
                            </form>

                            {/* Comments List */}
                            <div className="space-y-4">
                                {comments.length === 0 ? (
                                    <div className="text-center py-8 rounded-2xl border border-dashed border-border bg-muted/10">
                                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">No transmissions yet.</p>
                                    </div>
                                ) : (
                                    comments.map((comment: any) => (
                                        <div key={comment.id} className="flex gap-3 p-4 rounded-2xl bg-muted/20 border border-border/50 group hover:bg-muted/30 transition-all">
                                            <UserAvatar name={comment.user?.name} image={comment.user?.avatarUrl} size="sm" className="shrink-0" />
                                            <div className="space-y-1 flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-2">
                                                    <p className="text-xs font-black text-foreground tracking-tight truncate">{comment.user?.name}</p>
                                                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter whitespace-nowrap">
                                                        {comment.createdAt ? format(new Date(comment.createdAt), 'MMM d') : 'Recently'}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-foreground/80 leading-relaxed font-medium break-words italic">
                                                    "{comment.content}"
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Meta */}
                        <div className="pt-6 border-t border-border space-y-3 pb-8">
                            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-3 h-3" />
                                    Forged Date
                                </div>
                                <span className="text-foreground/60">{portfolio.created_at ? format(new Date(portfolio.created_at), 'MMM yyyy') : 'Recently'}</span>
                            </div>
                        </div>
                    </div>
                </ScrollArea>

                {/* Rating Bar - Fixed at bottom of sidebar */}
                <div className="p-6 border-t border-border bg-card/80 backdrop-blur-xl">
                    <RatingActions 
                        portfolioId={id as string}
                        onDismiss={() => router.back()}
                        onLike={() => likeMutation.mutate()}
                        onBookmark={() => bookmarkMutation.mutate()}
                        onRate={(score) => rateMutation.mutate(score)}
                        isPending={rateMutation.isPending || likeMutation.isPending || bookmarkMutation.isPending}
                    />
                </div>
            </div>
        </div>
    );
}
