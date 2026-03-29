"use client";

import { Trophy, Loader2 } from "lucide-react";
import { useLeaderboard } from "@/app/leaderboard/hooks";
import { useLeaderboardStore } from "@/store/useLeaderboardStore";
import { LeaderboardTable } from "@/app/leaderboard/components/LeaderboardTable";

export default function LeaderboardPage() {
    const activeFilter = useLeaderboardStore((s) => s.activeFilter);
    const entries = useLeaderboardStore((s) => s.entries);

    const { isLoading } = useLeaderboard(activeFilter);

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-zinc-950 flex items-center gap-3">
                    <Trophy className="h-8 w-8 text-amber-500" />
                    Global Leaderboard
                </h1>
                <p className="text-zinc-500 mt-2">
                    The top ranked portfolios based on community engagement and ratings.
                </p>
            </div>

            <LeaderboardTable entries={entries} />
        </div>
    );
}
