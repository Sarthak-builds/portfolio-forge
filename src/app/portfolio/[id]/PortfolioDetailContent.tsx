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
            <div className="flex flex-col min-h-screen">
                <div className="w-full h-[80vh] p-2 md:p-4">
                    <Skeleton className="w-full h-full rounded-2xl md:rounded-[2.5rem] bg-muted/50" />
                </div>
                <div className="max-w-5xl mx-auto w-full p-6 md:p-12 space-y-8">
                    <div className="flex items-center gap-4">
                        <Skeleton className="w-10 h-10 rounded-full bg-muted" />
                        <div className="space-y-2">
                            <Skeleton className="w-24 h-3 bg-muted" />
                            <Skeleton className="w-32 h-4 bg-muted" />
                        </div>
                    </div>
                    <Skeleton className="w-full h-32 bg-muted rounded-2xl" />
                </div>
            </div>
        );
    }

    if (!portfolio) return null;

    return (
        <div className="flex flex-col min-h-screen pb-20 overflow-x-hidden">
            {/* Cinematic Stage - 80% Height */}
            <div className="w-full h-[80vh] relative group/stage p-2 md:p-4">
                <Button 
                    variant="ghost" 
                    onClick={() => router.back()}
                    className="absolute top-4 left-4 md:top-8 md:left-8 z-50 rounded-full bg-background/40 backdrop-blur-xl border border-border text-foreground hover:bg-muted active:scale-95 transition-all lg:opacity-0 group-hover/stage:opacity-100 h-9 px-4"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Return</span>
                </Button>
                
                <div className="w-full h-full rounded-xl md:rounded-[2rem] overflow-hidden border border-border shadow-2xl bg-card">
                    <IframeViewer url={portfolio.liveUrl || portfolio.url} title={portfolio.name || portfolio.title} />
                </div>
            </div>

            {/* Optimized Content Section */}
            <div className="max-w-6xl mx-auto w-full px-4 md:px-8 py-8 md:py-16 space-y-12 md:space-y-20">
                
                {/* 1. Header & Quick Info */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-border/50">
                    <div className="space-y-4 flex-1">
                        <div className="space-y-2">
                            <h1 className="text-3xl md:text-5xl font-black text-foreground tracking-tighter leading-[0.9]">
                                {portfolio.name || portfolio.title}
                            </h1>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1.5 text-[9px] font-black text-accent uppercase tracking-widest">
                                    <Globe className="w-3 h-3" />
                                    Deployment Active
                                </div>
                                <div className="h-1 w-1 rounded-full bg-border" />
                                <div className="flex items-center gap-1.5 text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                                    <Calendar className="w-3 h-3" />
                                    Forged {portfolio.created_at ? format(new Date(portfolio.created_at), 'MMM yyyy') : 'Recently'}
                                </div>
                            </div>
                        </div>

                        <p className="text-sm md:text-base text-foreground/60 leading-relaxed font-medium max-w-2xl italic">
                            {portfolio.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                            {(portfolio.stack || portfolio.tech_stack || [])?.map((tag: string) => (
                                <Badge key={tag} variant="secondary" className="bg-muted/50 text-muted-foreground border-border text-[8px] font-black uppercase tracking-widest px-2 py-0.5">
                                    #{tag}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Integrated Stats Card */}
                    <div className="flex items-center gap-2 bg-muted/20 p-1.5 rounded-2xl border border-border self-start md:self-auto">
                        <div className="px-4 py-2 rounded-xl bg-card border border-border/50 shadow-sm text-center min-w-[100px]">
                            <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest mb-1">Global Rank</p>
                            <p className="text-lg font-black text-foreground tracking-tighter leading-none">#{portfolio.rank || "???"}</p>
                        </div>
                        <div className="px-4 py-2 rounded-xl bg-accent/10 border border-accent/20 text-center min-w-[100px]">
                            <p className="text-[8px] font-black text-accent uppercase tracking-widest mb-1">Forge Score</p>
                            <div className="flex items-center justify-center gap-1 leading-none">
                                <Star className="w-3 h-3 text-accent fill-accent" />
                                <p className="text-lg font-black text-accent tracking-tighter">{portfolio.score?.toFixed(1) || "0.0"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Engagement Grid & Architect */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
                    <a href={`/profile/${portfolio.user?.id}`} className="md:col-span-1 flex items-center gap-3 p-4 rounded-3xl bg-card border border-border hover:bg-muted/30 transition-all group">
                        <UserAvatar name={portfolio.user?.name} image={portfolio.user?.avatarUrl} size="md" />
                        <div className="flex-1 min-w-0">
                            <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-1">Architect</p>
                            <p className="text-sm font-black text-foreground tracking-tight truncate leading-none">{portfolio.user?.name}</p>
                        </div>
                        <ChevronLeft className="w-3 h-3 text-muted-foreground rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>

                    <div className="md:col-span-3 grid grid-cols-3 gap-3">
                        <div className="p-4 rounded-3xl bg-muted/10 border border-border/50 flex flex-col justify-center items-center text-center space-y-1">
                            <div className="flex items-center gap-1.5 text-[8px] font-black text-muted-foreground uppercase tracking-widest">
                                <Eye className="w-3 h-3" />
                                Reach
                            </div>
                            <p className="text-xl font-black text-foreground tracking-tighter leading-none">{portfolio.views || 0}</p>
                        </div>
                        <div className="p-4 rounded-3xl bg-muted/10 border border-border/50 flex flex-col justify-center items-center text-center space-y-1">
                            <div className="flex items-center gap-1.5 text-[8px] font-black text-muted-foreground uppercase tracking-widest">
                                <Heart className="w-3 h-3 text-red-500" />
                                Likes
                            </div>
                            <p className="text-xl font-black text-foreground tracking-tighter leading-none">{portfolio.likes ?? portfolio._count?.likes ?? 0}</p>
                        </div>
                        <div className="p-4 rounded-3xl bg-muted/10 border border-border/50 flex flex-col justify-center items-center text-center space-y-1">
                            <div className="flex items-center gap-1.5 text-[8px] font-black text-muted-foreground uppercase tracking-widest">
                                <Bookmark className="w-3 h-3 text-amber-500" />
                                Saved
                            </div>
                            <p className="text-xl font-black text-foreground tracking-tighter leading-none">{portfolio.bookmarks ?? portfolio._count?.bookmarks ?? 0}</p>
                        </div>
                    </div>
                </div>

                {/* 3. Community Feed & Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
                    
                    {/* Interaction Bar */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="p-6 md:p-8 rounded-[2rem] bg-card border border-border shadow-sm lg:sticky lg:top-24 space-y-8">
                            <div className="space-y-1">
                                <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">The Forge Arena</h3>
                                <p className="text-xs text-muted-foreground/60 font-medium">Rate the architecture, support the creator, and save this work to your archives.</p>
                            </div>
                            
                            <RatingActions 
                                portfolioId={id as string}
                                onDismiss={() => router.back()}
                                onLike={() => likeMutation.mutate()}
                                onBookmark={() => bookmarkMutation.mutate()}
                                onRate={(score) => rateMutation.mutate(score)}
                                isPending={rateMutation.isPending || likeMutation.isPending || bookmarkMutation.isPending}
                            />
                            
                            <div className="pt-6 border-t border-border flex flex-col gap-2">
                                <a href={portfolio.liveUrl || portfolio.url} target="_blank" rel="noreferrer">
                                    <Button className="w-full h-11 bg-foreground text-background hover:opacity-90 font-black text-[10px] uppercase tracking-widest rounded-xl transition-all active:scale-95 shadow-sm">
                                        <Globe className="w-3.5 h-3.5 mr-2" />
                                        Launch Masterpiece
                                    </Button>
                                </a>
                                {(portfolio.githubUrl || portfolio.github_url) && (
                                    <a href={portfolio.githubUrl || portfolio.github_url} target="_blank" rel="noreferrer">
                                        <Button variant="outline" className="w-full h-11 rounded-xl border-border bg-muted/30 hover:bg-muted font-black text-[10px] uppercase tracking-widest transition-all active:scale-95">
                                            <Github className="w-3.5 h-3.5 mr-2 text-foreground" />
                                            Source Code
                                        </Button>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Community Feed */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="flex items-center justify-between px-1">
                            <h3 className="text-lg font-black text-foreground tracking-tighter flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-accent" />
                                Community Feed
                                <span className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{comments.length}</span>
                            </h3>
                        </div>

                        {/* Transmission Input */}
                        <form onSubmit={handleCommentSubmit} className="relative group">
                            <textarea
                                placeholder="Transmit your feedback..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="w-full min-h-[100px] bg-muted/5 border border-border rounded-2xl p-4 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-accent/40 transition-all placeholder:text-muted-foreground/40 resize-none font-medium leading-relaxed"
                            />
                            <Button 
                                type="submit"
                                disabled={!newComment.trim() || addCommentMutation.isPending}
                                className="absolute right-3 bottom-3 h-9 px-6 bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all active:scale-95 shadow-lg"
                            >
                                <Sparkles className="w-3 h-3 mr-2" />
                                Transmit
                            </Button>
                        </form>

                        {/* Transmissions List */}
                        <div className="space-y-4">
                            {comments.length === 0 ? (
                                <div className="text-center py-16 rounded-[2rem] border border-dashed border-border bg-muted/5">
                                    <MessageSquare className="w-8 h-8 text-muted-foreground/20 mx-auto mb-3" />
                                    <p className="text-[9px] text-muted-foreground font-black uppercase tracking-[0.2em]">Frequency Silent</p>
                                </div>
                            ) : (
                                comments.map((comment: any) => (
                                    <div key={comment.id} className="flex gap-4 p-5 rounded-3xl bg-card border border-border/80 hover:border-accent/30 transition-all duration-300">
                                        <UserAvatar name={comment.user?.name} image={comment.user?.avatarUrl} size="sm" className="shrink-0" />
                                        <div className="space-y-2 flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                                <div className="space-y-0.5">
                                                    <p className="text-[11px] font-black text-foreground tracking-tight leading-none">{comment.user?.name}</p>
                                                    <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest leading-none">
                                                        {comment.createdAt ? format(new Date(comment.createdAt), 'MMM d, yyyy') : 'Recently'}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="text-xs text-foreground/70 leading-relaxed font-medium">
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
        </div>
    );
}
