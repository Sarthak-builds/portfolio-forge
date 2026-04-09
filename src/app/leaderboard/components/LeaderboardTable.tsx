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
import { ExternalLink, Trophy, Medal, Star, Eye } from "lucide-react";
import { LeaderboardEntry } from "@/app/leaderboard/lib/types";
import { UserAvatar } from "@/components/custom/UserAvatar";
import { StatsBadge } from "@/components/custom/StatsBadge";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface LeaderboardTableProps {
    entries: LeaderboardEntry[];
}

export function LeaderboardTable({ entries }: LeaderboardTableProps) {
    const getRankIcon = (rank: number) => {
        if (rank === 1) return <Trophy className="w-5 h-5 text-amber-500 fill-amber-500/10" />;
        if (rank === 2) return <Medal className="w-5 h-5 text-slate-300 fill-slate-300/10" />;
        if (rank === 3) return <Medal className="w-5 h-5 text-orange-400 fill-orange-400/10" />;
        return <span className="text-zinc-600 font-black text-sm">{rank}</span>;
    };

    return (
        <div className="rounded-3xl border border-white/5 bg-zinc-900/30 overflow-hidden backdrop-blur-sm">
            <Table>
                <TableHeader>
                    <TableRow className="border-white/5 hover:bg-transparent">
                        <TableHead className="w-[100px] text-center text-zinc-500 font-black uppercase tracking-widest text-[10px]">Rank</TableHead>
                        <TableHead className="text-zinc-500 font-black uppercase tracking-widest text-[10px]">Architect</TableHead>
                        <TableHead className="text-zinc-500 font-black uppercase tracking-widest text-[10px]">Project</TableHead>
                        <TableHead className="text-zinc-500 font-black uppercase tracking-widest text-[10px] hidden md:table-cell">Stack</TableHead>
                        <TableHead className="text-right text-zinc-500 font-black uppercase tracking-widest text-[10px]">Forge Score</TableHead>
                        <TableHead className="w-[100px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {entries.map((entry) => (
                        <TableRow key={entry.id} className="border-white/5 hover:bg-white/[0.02] transition-colors group">
                            <TableCell className="text-center py-6">
                                <div className="flex items-center justify-center">
                                    {getRankIcon(entry.rank)}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <UserAvatar name={entry.user.name} image={entry.user.avatarUrl} size="sm" glow={entry.rank <= 3} />
                                    <div className="font-black text-white tracking-tight">{entry.user.name}</div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="space-y-0.5">
                                    <Link href={`/portfolio/${entry.id}`} className="font-bold text-zinc-300 tracking-tight hover:text-indigo-400 transition-colors">
                                        {entry.title}
                                    </Link>
                                    <div className="flex items-center gap-1.5 text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                                        <Eye className="w-2.5 h-2.5" />
                                        {entry.views || 0} Discovery
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                <div className="flex flex-wrap gap-1">
                                    {entry.tech_stack?.slice(0, 3).map((tech) => (
                                        <Badge key={tech} variant="secondary" className="bg-white/5 text-zinc-500 border-none text-[9px] px-1.5 py-0 font-black uppercase tracking-tighter">
                                            {tech}
                                        </Badge>
                                    ))}
                                    {entry.tech_stack && entry.tech_stack.length > 3 && (
                                        <span className="text-[9px] text-zinc-700 font-black">+{entry.tech_stack.length - 3}</span>
                                    )}
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end">
                                    <StatsBadge icon={Star} count={entry.score.toFixed(1)} variant={entry.rank === 1 ? "amber" : "indigo"} />
                                </div>
                            </TableCell>
                            <TableCell className="text-right pr-6">
                                <a 
                                    href={entry.url} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="inline-flex p-2.5 rounded-xl bg-white/5 text-zinc-500 hover:text-white hover:bg-white/10 transition-all active:scale-90"
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
