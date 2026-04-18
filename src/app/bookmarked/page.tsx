"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/auth/lib/useAuthstore";
import { useApi } from "@/lib/api/use-api";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Bookmark, ExternalLink, Globe, User, MessageSquare, Heart, Star, Sparkles } from "lucide-react";
import { EmptyState } from "@/components/custom/EmptyState";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function BookmarkedPage() {
    const { isAuthenticated } = useAuthStore();
    const { fetchBookmarks } = useApi();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/auth");
        }
    }, [isAuthenticated, router]);

    const { data: bookmarks = [], isLoading } = useQuery({
        queryKey: ['bookmarked-portfolios'],
        queryFn: fetchBookmarks,
        enabled: isAuthenticated,
    });

    if (!isAuthenticated) return null;

    if (isLoading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
        );
    }

    if (bookmarks.length === 0) {
        return (
            <div className="pt-20">
                <EmptyState 
                    icon={Bookmark}
                    title="No Masterpieces Saved"
                    description="Your archive is currently empty. Explore the forge to discover and save high-end portfolios that inspire you."
                    action={{
                        label: "Explore the Forge",
                        onClick: () => router.push("/explore")
                    }}
                />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-12 max-w-7xl mx-auto pb-20 -mt-9">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
               
                 <div className="space-y-1">
                    <h1 className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground">
                        Bookmarked
                    </h1>
                    <p className="text-muted-foreground font-medium max-w-lg text-xs leading-relaxed">
                        Your curated collection of top-tier developer excellence. Forged by code, saved by you.
                    </p>
                </div>
            </div>

            {/* Grid of Bookmarked Portfolios */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {bookmarks.map((bookmark: any) => {
                    const p = bookmark.portfolio;
                    return (
                        <div key={bookmark.id} className="group relative flex flex-col bg-card border border-border rounded-[2rem] overflow-hidden hover:shadow-2xl hover:border-accent/30 transition-all duration-500">
                            {/* Preview Image / Placeholder */}
                            <div className="relative aspect-video bg-muted overflow-hidden">
                                <div className="w-full h-full flex items-center justify-center">
                                        <Globe className="w-10 h-10 text-muted-foreground/20" />
                                    </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                    <div className="flex gap-2 w-full">
                                        <a 
                                            href={p.liveUrl} 
                                            target="_blank" 
                                            rel="noreferrer" 
                                            className="flex-1 h-10 bg-white text-black font-black text-[10px] uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 hover:bg-accent hover:text-white transition-colors"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                            Live Preview
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4 flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="h-6 w-6 rounded-lg bg-accent/10 flex items-center justify-center">
                                            <User className="w-3 h-3 text-accent" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                            {p.user?.name || 'Anonymous'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-accent/5 text-accent font-black text-[10px]">
                                        <Star className="w-3 h-3 fill-current" />
                                        {p.score ? Number(p.score).toFixed(1) : "0.0"}
                                    </div>
                                </div>

                                <div className=" border-t border-border flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1.5 text-muted-foreground font-bold text-[10px]">
                                            <Heart className="w-3 h-3" />
                                            {p._count?.likes || 0}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-muted-foreground font-bold text-[10px]">
                                            <MessageSquare className="w-3 h-3" />
                                            {p._count?.comments || 0}
                                        </div>
                                    </div>
                                    <Link href={`/explore?id=${p.id}`}>
                                        <Button variant="ghost" className="h-8 px-4 text-[10px] font-black uppercase tracking-widest text-accent hover:text-accent hover:bg-accent/5 rounded-lg">
                                            View Details
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
