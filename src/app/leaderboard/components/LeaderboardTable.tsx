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
import { ExternalLink, Trophy, Medal, Star, Eye, Heart, MessageSquare } from "lucide-react";
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
        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm transition-all duration-500 hover:shadow-xl">
            <Table>
                <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                        <TableHead className="w-[80px] text-center text-muted-foreground font-black uppercase tracking-widest text-[9px]">Rank</TableHead>
                        <TableHead className="text-muted-foreground font-black uppercase tracking-widest text-[9px]">Architect</TableHead>
                        <TableHead className="text-muted-foreground font-black uppercase tracking-widest text-[9px]">Project</TableHead>
                        <TableHead className="text-center text-muted-foreground font-black uppercase tracking-widest text-[9px]">Stats</TableHead>
                        <TableHead className="text-right text-muted-foreground font-black uppercase tracking-widest text-[9px]">Forge Score</TableHead>
                        <TableHead className="w-[80px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {entries.map((entry, index) => (
                        <TableRow key={entry.id} className="border-border hover:bg-muted/30 transition-colors group">
                            <TableCell className="text-center py-4">
                                <div className="flex items-center justify-center">
                                    {getRankIcon(index + 1)}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <UserAvatar name={entry.user.name} image={entry.user.avatarUrl} size="sm" />
                                    <div className="font-bold text-foreground tracking-tight text-xs">{entry.user.name}</div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="space-y-0">
                                    <Link href={`/portfolio/${entry.id}`} className="font-bold text-foreground tracking-tight hover:text-accent transition-colors text-xs">
                                        {entry.title}
                                    </Link>
                                    <div className="flex items-center gap-1 text-[8px] text-muted-foreground font-bold uppercase tracking-widest">
                                        <Eye className="w-2 h-2" />
                                        {entry.views || 0} Discovery
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center justify-center gap-4">
                                    <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground">
                                        <Heart className="w-3 h-3" />
                                        {entry.likes || 0}
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground">
                                        <MessageSquare className="w-3 h-3" />
                                        {entry.comments_count || 0}
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end">
                                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-accent/5 border border-accent/10 text-accent font-black text-[11px]">
                                        <Star className="w-3.5 h-3.5 fill-current" />
                                        <span>{entry.score.toFixed(1)}</span>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="text-right pr-4">
                                <a 
                                    href={entry.url} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="inline-flex p-2 rounded-xl text-muted-foreground hover:text-accent hover:bg-accent/5 transition-all active:scale-90"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                </a>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
