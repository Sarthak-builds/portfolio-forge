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
    ExternalLink, 
    Github, 
    Star, 
    Eye, 
    Heart, 
    Bookmark, 
    MessageSquare, 
    Calendar,
    Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { toast } from "sonner";

export default function PortfolioDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { fetchPortfolio, fetchComments, commentPortfolio, ratePortfolio } = useApi();

    const { data: portfolio, isLoading } = useQuery({
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
            refetchComments();
            toast.success("Comment posted");
        },
    });

    const rateMutation = useMutation({
        mutationFn: (score: number) => ratePortfolio({ id: id as string, score }),
        onSuccess: () => {
            toast.success("Rating submitted");
        },
    });

    if (isLoading) {
        return (
            <div className="flex h-[90vh] bg-black">
                <div className="flex-1 p-8">
                    <Skeleton className="w-full h-full rounded-3xl bg-zinc-900/50" />
                </div>
                <div className="w-96 p-8 border-l border-white/5 space-y-8">
                    <div className="flex items-center gap-4">
                        <Skeleton className="w-12 h-12 rounded-full bg-zinc-900" />
                        <div className="space-y-2">
                            <Skeleton className="w-32 h-4 bg-zinc-900" />
                            <Skeleton className="w-24 h-3 bg-zinc-900" />
                        </div>
                    </div>
                    <Skeleton className="w-full h-32 bg-zinc-900 rounded-2xl" />
                    <Skeleton className="w-full h-48 bg-zinc-900 rounded-2xl" />
                </div>
            </div>
        );
    }

    if (!portfolio) return null;

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] bg-[#050505] overflow-hidden">
            {/* Main Stage */}
            <div className="flex-1 relative bg-black group/stage p-4 lg:p-6 overflow-hidden">
                <Button 
                    variant="ghost" 
                    onClick={() => router.back()}
                    className="absolute top-8 left-8 z-50 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 active:scale-95 transition-all opacity-0 group-hover/stage:opacity-100"
                >
                    <ChevronLeft className="w-5 h-5 mr-1" />
                    Back
                </Button>
                
                <div className="w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden border border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                    <IframeViewer url={portfolio.url} title={portfolio.title} />
                </div>
            </div>

            {/* Side Panel */}
            <div className="w-full lg:w-[400px] border-l border-white/5 bg-[#0a0a0a] flex flex-col shrink-0">
                <ScrollArea className="flex-1">
                    <div className="p-8 space-y-10">
                        {/* Header & Creator */}
                        <div className="space-y-6">
                            <div className="flex items-start justify-between gap-4">
                                <div className="space-y-1">
                                    <h1 className="text-3xl font-black text-white tracking-tighter leading-tight">
                                        {portfolio.title}
                                    </h1>
                                    <div className="flex items-center gap-2 text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                                        <Globe className="w-3 h-3" />
                                        Deployment Active
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <StatsBadge icon={Star} count={portfolio.score?.toFixed(1) || "0.0"} variant="amber" />
                                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Global Rank: #12</p>
                                </div>
                            </div>

                            <a href={`/profile/${portfolio.user?.id}`} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all group">
                                <UserAvatar name={portfolio.user?.name} image={portfolio.user?.avatarUrl} size="md" />
                                <div className="flex-1">
                                    <p className="text-sm font-black text-white tracking-tight">{portfolio.user?.name}</p>
                                    <p className="text-xs text-zinc-500 font-medium tracking-tight line-clamp-1">Fullstack Engineer & UI Designer</p>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ChevronLeft className="w-4 h-4 text-zinc-400 rotate-180" />
                                </div>
                            </a>
                        </div>

                        {/* Engagement Stats Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 space-y-1">
                                <div className="flex items-center gap-2 text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                                    <Eye className="w-3 h-3" />
                                    Reach
                                </div>
                                <p className="text-xl font-black text-white tracking-tighter">{portfolio.views || 0}</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 space-y-1">
                                <div className="flex items-center gap-2 text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                                    <Heart className="w-3 h-3 text-red-400" />
                                    Love
                                </div>
                                <p className="text-xl font-black text-white tracking-tighter">{portfolio.likes || 0}</p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                <Sparkles className="w-3.5 h-3.5" />
                                Project Manifest
                            </h3>
                            <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                                {portfolio.description}
                            </p>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {portfolio.tech_stack?.map((tech: string) => (
                                    <Badge key={tech} variant="secondary" className="bg-zinc-900 text-zinc-500 border-white/5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5">
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Links */}
                        <div className="flex items-center gap-3">
                            <a href={portfolio.url} target="_blank" rel="noreferrer" className="flex-1">
                                <Button className="w-full h-12 bg-white text-black hover:bg-zinc-200 font-black text-sm rounded-xl">
                                    <Globe className="w-4 h-4 mr-2" />
                                    Project Site
                                </Button>
                            </a>
                            {portfolio.github_url && (
                                <a href={portfolio.github_url} target="_blank" rel="noreferrer">
                                    <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-white/10 bg-white/5 hover:bg-white/10">
                                        <Github className="w-5 h-5 text-zinc-300" />
                                    </Button>
                                </a>
                            )}
                        </div>

                        {/* Meta */}
                        <div className="pt-6 border-t border-white/5 space-y-3">
                            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-3 h-3" />
                                    Forged Date
                                </div>
                                <span className="text-zinc-400">{portfolio.created_at ? format(new Date(portfolio.created_at), 'MMM yyyy') : 'Recently'}</span>
                            </div>
                        </div>
                    </div>
                </ScrollArea>

                {/* Rating Bar - Fixed at bottom of sidebar */}
                <div className="p-6 border-t border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl">
                    <RatingActions 
                        portfolioId={id as string}
                        onDismiss={() => {}}
                        onLike={() => {}}
                        onRate={(score) => rateMutation.mutate(score)}
                        isPending={rateMutation.isPending}
                    />
                </div>
            </div>
        </div>
    );
}

// Sparkles import fix
import { Sparkles } from "lucide-react";
