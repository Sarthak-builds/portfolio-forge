"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Trophy, Medal, Star, Eye, Heart, MessageSquare, Globe, Compass } from "lucide-react";
import { LeaderboardEntry } from "@/app/leaderboard/lib/types";
import { UserAvatar } from "@/components/custom/UserAvatar";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface LeaderboardTableProps {
    entries: LeaderboardEntry[];
}

export function LeaderboardTable({ entries }: LeaderboardTableProps) {
    const getRankIcon = (rank: number) => {
        if (rank === 1) return <Trophy className="w-4 h-4 text-accent fill-accent/10" />;
        if (rank === 2) return <Medal className="w-4 h-4 text-slate-400 fill-slate-400/10" />;
        if (rank === 3) return <Medal className="w-4 h-4 text-orange-400 fill-orange-400/10" />;
        return <span className="text-muted-foreground font-black text-[10px]">{rank}</span>;
    };

    return (
        <div className="rounded-2xl border border-border bg-card shadow-sm transition-all duration-500 hover:shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
                <Table className="min-w-[600px] md:min-w-full">
                    <TableHeader>
                        <TableRow className="border-border hover:bg-transparent">
                            <TableHead className="w-[60px] md:w-[80px] text-center text-muted-foreground font-medium uppercase tracking-widest text-[10px] md:text-[11px]">Rank</TableHead>
                            <TableHead className="text-muted-foreground font-medium uppercase tracking-widest text-[10px] md:text-[11px]">Architect</TableHead>
                            <TableHead className="text-muted-foreground font-medium uppercase tracking-widest text-[10px] md:text-[11px]">Project</TableHead>
                            <TableHead className="text-center text-muted-foreground font-medium uppercase tracking-widest text-[10px] md:text-[11px]">Stats</TableHead>
                            <TableHead className="text-right text-muted-foreground font-medium uppercase tracking-widest text-[10px] md:text-[11px]">Forge Score</TableHead>
                            <TableHead className="w-[60px] md:w-[80px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {entries.map((entry, index) => (
                            <TableRow key={entry.id} className="border-border even:bg-muted/20 hover:bg-muted/30 transition-colors group">
                                <TableCell className="text-center py-4 px-2 md:px-4">
                                    <div className="flex items-center justify-center">
                                        {getRankIcon(index + 1)}
                                    </div>
                                </TableCell>
                                <TableCell className="px-2 md:px-4">
                                    <div className="flex items-center gap-2">
                                        <UserAvatar name={entry.user.name} image={entry.user.avatarUrl} size="sm" />
                                        <div className="font-bold text-foreground tracking-tight text-xs md:text-sm truncate max-w-[100px] md:max-w-none">
                                            {entry.user.name}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="px-2 md:px-4">
                                    <div className="space-y-0">
                                        <div className="flex items-center gap-2">
                                            <div className="font-bold text-foreground tracking-tight hover:text-accent transition-colors text-xs md:text-sm truncate max-w-[150px]">
                                                {entry.title}
                                            </div>
                                            <Link 
                                                href={`/explore?id=${entry.id}`}
                                                className="inline-flex p-1.5 md:p-2 rounded-xl text-muted-foreground hover:text-accent hover:bg-accent/5 transition-all active:scale-90"
                                            >
                                                <ExternalLink className="w-3" />
                                            </Link>
                                        </div>
                                        <div className="flex items-center gap-1 text-[8px] md:text-[9px] text-muted-foreground font-bold uppercase tracking-widest">
                                            <Eye className="w-2 h-2" />
                                            {entry.views || 0} views
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="px-2 md:px-4">
                                    <div className="flex items-center justify-center gap-4">
                                        <div className="flex items-center gap-1 text-[10px] md:text-[11px] font-bold text-muted-foreground">
                                            <Heart className="w-3 h-3 text-red-500 fill-red-500/10" />
                                            {entry.likes || 0}
                                        </div>
                                        <div className="flex items-center gap-1 text-[10px] md:text-[11px] font-bold text-muted-foreground">
                                            <MessageSquare className="w-3 h-3 text-accent fill-accent/10" />
                                            {entry.comments_count || 0}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right px-2 md:px-4">
                                    <div className="flex justify-end">
                                        <div className="inline-flex items-center gap-1 px-1.5 md:px-2 py-0.5 md:py-1 rounded-lg bg-accent/5 border border-accent/10 text-accent font-black text-[10px] md:text-[11px]">
                                            <Star className="w-3 md:w-3.5 h-3 md:h-3.5 fill-current" />
                                            <span>{entry.score.toFixed(1)}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right pr-4 px-2">
                                    <a href={entry.url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                                        <Compass className="h-4 w-4" />
                                    </a>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
