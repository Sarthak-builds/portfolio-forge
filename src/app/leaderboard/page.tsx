"use client";

import { Trophy, Loader2, Star, Sparkles, Filter } from "lucide-react";
import { useLeaderboard } from "@/app/leaderboard/hooks";
import { useLeaderboardStore } from "@/store/useLeaderboardStore";
import { LeaderboardTable } from "@/app/leaderboard/components/LeaderboardTable";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

export default function LeaderboardPage() {
    const activeFilter = useLeaderboardStore((s) => s.activeFilter);
    const setActiveFilter = useLeaderboardStore((s) => s.setActiveFilter);
    const entries = useLeaderboardStore((s) => s.entries);

    const { isLoading } = useLeaderboard(activeFilter);

    return (
        <div className="flex flex-col gap-8 md:gap-12 max-w-7xl mx-auto pb-20 px-4 md:px-0">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 md:-mt-7">
                 <div className="space-y-1">
                    <h1 className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground">
                        Leaderboard
                    </h1>
                    <p className="text-muted-foreground font-medium max-w-lg text-[11px] md:text-xs leading-relaxed">
                           The definitive ranking of developer excellence. Forged by code, ranked by the community.
                    </p>
                </div>

                <div className="bg-muted/50 p-1 rounded-xl border border-border w-fit">
                    <Tabs defaultValue={activeFilter} onValueChange={(v) => setActiveFilter(v as any)}>
                        <TabsList className="bg-transparent border-none p-0 h-8 md:h-9">
                            <TabsTrigger value="all-time" className="rounded-lg font-bold data-[state=active]:bg-foreground data-[state=active]:text-background text-[10px] md:text-[11px] uppercase tracking-widest px-3 md:px-4 transition-all">All Time</TabsTrigger>
                            <TabsTrigger value="monthly" className="rounded-lg font-bold data-[state=active]:bg-foreground data-[state=active]:text-background text-[10px] md:text-[11px] uppercase tracking-widest px-3 md:px-4 transition-all">Monthly</TabsTrigger>
                            <TabsTrigger value="weekly" className="rounded-lg font-bold data-[state=active]:bg-foreground data-[state=active]:text-background text-[10px] md:text-[11px] uppercase tracking-widest px-3 md:px-4 transition-all">Weekly</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </div>

            {/* Content Section */}
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-purple-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10" />
                
                {isLoading ? (
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Skeleton key={i} className="h-20 w-full bg-muted/50 border border-border rounded-2xl" />
                        ))}
                    </div>
                ) : (
                    <LeaderboardTable entries={entries} />
                )}
            </div>

            {/* Rewards Teaser */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="p-6 md:p-8 rounded-3xl bg-card border border-border space-y-4 group hover:border-accent/30 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20">
                        <Star className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-foreground font-bold tracking-tight">Merit Based</h3>
                    <p className="text-[11px] md:text-xs text-muted-foreground font-medium leading-relaxed">Rankings are calculated using our proprietary merit formula considering engagement, diversity, and code quality.</p>
                </div>
                <div className="p-6 md:p-8 rounded-3xl bg-card border border-border space-y-4 group hover:border-amber-500/30 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                        <Trophy className="w-5 h-5 text-amber-500" />
                    </div>
                    <h3 className="text-foreground font-bold tracking-tight">Monthly Rewards</h3>
                    <p className="text-[11px] md:text-xs text-muted-foreground font-medium leading-relaxed">Top 3 monthly creators get exclusive profile badges and are featured on our global showcase page.</p>
                </div>
                <div className="p-6 md:p-8 rounded-3xl bg-card border border-border space-y-4 group hover:border-emerald-500/30 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                        <Sparkles className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h3 className="text-foreground font-bold tracking-tight">Verified Status</h3>
                    <p className="text-[11px] md:text-xs text-muted-foreground font-medium leading-relaxed">Creators in the Top 100 automaticially qualify for 'Verified Contributor' status in the community.</p>
                </div>
            </div>
        </div>
    );
}
