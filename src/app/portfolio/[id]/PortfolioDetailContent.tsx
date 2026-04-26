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
                <div className="w-full h-[80vh] p-4">
                    <Skeleton className="w-full h-full rounded-3xl bg-muted/50" />
                </div>
                <div className="max-w-5xl mx-auto w-full p-8 space-y-8">
                    <div className="flex items-center gap-4">
                        <Skeleton className="w-12 h-12 rounded-full bg-muted" />
                        <div className="space-y-2">
                            <Skeleton className="w-32 h-4 bg-muted" />
                            <Skeleton className="w-24 h-3 bg-muted" />
                        </div>
                    </div>
                    <Skeleton className="w-full h-32 bg-muted rounded-2xl" />
                </div>
            </div>
        );
    }

    if (!portfolio) return null;

    return (
        <div className="flex flex-col min-h-screen pb-20">
            {/* Main Stage - 80% Height */}
            <div className="w-full h-[80vh] relative group/stage p-2 lg:p-4">
                <Button 
                    variant="ghost" 
                    onClick={() => router.back()}
                    className="absolute top-6 left-6 z-50 rounded-full bg-background/40 backdrop-blur-xl border border-border text-foreground hover:bg-muted active:scale-95 transition-all lg:opacity-0 group-hover/stage:opacity-100"
                >
                    <ChevronLeft className="w-5 h-5 mr-1" />
                    Back
                </Button>
                
                <div className="w-full h-full rounded-2xl lg:rounded-[2.5rem] overflow-hidden border border-border/50 shadow-2xl bg-card">
                    <IframeViewer url={portfolio.liveUrl || portfolio.url} title={portfolio.name || portfolio.title} />
                </div>
            </div>

            {/* Content Section - Below Preview */}
            <div className="max-w-6xl mx-auto w-full px-6 lg:px-8 py-12 space-y-16">
                {/* Header & Main Info */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                    <div className="space-y-6 flex-1">
                        <div className="space-y-2">
                            <h1 className="text-4xl lg:text-6xl font-black text-foreground tracking-tighter leading-none">
                                {portfolio.name || portfolio.title}
                            </h1>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 text-[10px] font-black text-accent uppercase tracking-[0.2em]">
                                    <Globe className="w-3 h-3" />
                                    Deployment Active
                                </div>
                                <div className="h-1 w-1 rounded-full bg-border" />
                                <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                                    <Calendar className="w-3 h-3" />
                                    Forged {portfolio.created_at ? format(new Date(portfolio.created_at), 'MMM yyyy') : 'Recently'}
                                </div>
                            </div>
                        </div>

                        <p className="text-lg lg:text-xl text-foreground/70 leading-relaxed font-medium max-w-3xl">
                            {portfolio.description}
                        </p>

                        <div className="flex flex-wrap gap-2 pt-2">
                            {(portfolio.stack || portfolio.tech_stack || [])?.map((tech: string) => (
                                <Badge key={tech} variant="secondary" className="bg-muted text-muted-foreground border-border text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                                    #{tech}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 min-w-[240px]">
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border">
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Global Rank</p>
                            <p className="text-xl font-black text-foreground tracking-tighter">#{portfolio.rank || "???"}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-accent/5 border border-accent/20 flex items-center justify-between">
                            <p className="text-[10px] font-black text-accent uppercase tracking-widest">Forge Score</p>
                            <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-accent fill-accent" />
                                <p className="text-xl font-black text-accent tracking-tighter">{portfolio.score?.toFixed(1) || "0.0"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Creator Card & Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                    <a href={`/profile/${portfolio.user?.id}`} className="flex items-center gap-5 p-6 rounded-[2rem] bg-card border border-border hover:bg-muted/30 transition-all group">
                        <UserAvatar name={portfolio.user?.name} image={portfolio.user?.avatarUrl} size="lg" />
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-1">Architect</p>
                            <p className="text-xl font-black text-foreground tracking-tight truncate">{portfolio.user?.name}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronLeft className="w-5 h-5 text-muted-foreground rotate-180" />
                        </div>
                    </a>

                    <div className="lg:col-span-2 grid grid-cols-3 gap-4">
                        <div className="p-6 rounded-[2rem] bg-muted/20 border border-border flex flex-col justify-center items-center text-center space-y-1">
                            <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                                <Eye className="w-4 h-4" />
                                Reach
                            </div>
                            <p className="text-3xl font-black text-foreground tracking-tighter">{portfolio.views || 0}</p>
                        </div>
                        <div className="p-6 rounded-[2rem] bg-muted/20 border border-border flex flex-col justify-center items-center text-center space-y-1">
                            <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                                <Heart className="w-4 h-4 text-red-500" />
                                Likes
                            </div>
                            <p className="text-3xl font-black text-foreground tracking-tighter">{portfolio.likes ?? portfolio._count?.likes ?? 0}</p>
                        </div>
                        <div className="p-6 rounded-[2rem] bg-muted/20 border border-border flex flex-col justify-center items-center text-center space-y-1">
                            <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                                <Bookmark className="w-4 h-4 text-amber-500" />
                                Saved
                            </div>
                            <p className="text-3xl font-black text-foreground tracking-tighter">{portfolio.bookmarks ?? portfolio._count?.bookmarks ?? 0}</p>
                        </div>
                    </div>
                </div>

                {/* Engagement Bar & Comments */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
                    {/* Left: Actions */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="p-8 rounded-[2.5rem] bg-card border border-border shadow-sm sticky top-24">
                            <h3 className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] mb-8">Forge Interaction</h3>
                            <RatingActions 
                                portfolioId={id as string}
                                onDismiss={() => router.back()}
                                onLike={() => likeMutation.mutate()}
                                onBookmark={() => bookmarkMutation.mutate()}
                                onRate={(score) => rateMutation.mutate(score)}
                                isPending={rateMutation.isPending || likeMutation.isPending || bookmarkMutation.isPending}
                            />
                            
                            <div className="mt-8 pt-8 border-t border-border flex flex-col gap-3">
                                <a href={portfolio.liveUrl || portfolio.url} target="_blank" rel="noreferrer">
                                    <Button className="w-full h-14 bg-foreground text-background hover:opacity-90 font-black text-sm rounded-2xl transition-all active:scale-95">
                                        <Globe className="w-4 h-4 mr-2" />
                                        Launch Masterpiece
                                    </Button>
                                </a>
                                {(portfolio.githubUrl || portfolio.github_url) && (
                                    <a href={portfolio.githubUrl || portfolio.github_url} target="_blank" rel="noreferrer">
                                        <Button variant="outline" className="w-full h-14 rounded-2xl border-border bg-muted/30 hover:bg-muted font-black text-sm transition-all active:scale-95">
                                            <Github className="w-4 h-4 mr-2 text-foreground" />
                                            Source Repository
                                        </Button>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right: Community Feed */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="text-xl font-black text-foreground tracking-tighter flex items-center gap-3">
                                <MessageSquare className="w-6 h-6 text-accent" />
                                Community Feed
                                <span className="text-sm font-bold text-muted-foreground bg-muted px-3 py-1 rounded-full">{comments.length}</span>
                            </h3>
                        </div>

                        {/* Add Comment */}
                        <form onSubmit={handleCommentSubmit} className="relative group">
                            <textarea
                                placeholder="Forge a transmission..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="w-full min-h-[120px] bg-muted/20 border border-border rounded-[2rem] p-6 text-base focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all placeholder:text-muted-foreground/50 resize-none font-medium"
                            />
                            <Button 
                                type="submit"
                                disabled={!newComment.trim() || addCommentMutation.isPending}
                                className="absolute right-4 bottom-4 h-12 px-8 bg-accent text-accent-foreground hover:bg-accent/90 rounded-2xl font-black uppercase tracking-widest transition-all active:scale-95"
                            >
                                <Sparkles className="w-4 h-4 mr-2" />
                                Post
                            </Button>
                        </form>

                        {/* Comments List */}
                        <div className="space-y-6">
                            {comments.length === 0 ? (
                                <div className="text-center py-20 rounded-[3rem] border-2 border-dashed border-border bg-muted/5">
                                    <MessageSquare className="w-12 h-12 text-muted-foreground/20 mx-auto mb-4" />
                                    <p className="text-sm text-muted-foreground font-black uppercase tracking-[0.2em]">The feed is silent.</p>
                                </div>
                            ) : (
                                comments.map((comment: any) => (
                                    <div key={comment.id} className="flex gap-5 p-8 rounded-[2.5rem] bg-card border border-border group hover:border-accent/30 transition-all duration-500">
                                        <UserAvatar name={comment.user?.name} image={comment.user?.avatarUrl} size="md" className="shrink-0" />
                                        <div className="space-y-3 flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                                <div className="space-y-0.5">
                                                    <p className="text-sm font-black text-foreground tracking-tight">{comment.user?.name}</p>
                                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                                        {comment.createdAt ? format(new Date(comment.createdAt), 'MMM d, yyyy') : 'Recently'}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="text-base text-foreground/80 leading-relaxed font-medium">
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
