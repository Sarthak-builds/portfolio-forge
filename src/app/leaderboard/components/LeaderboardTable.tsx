"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { LeaderboardEntry } from "@/app/leaderboard/lib/types";

interface LeaderboardTableProps {
    entries: LeaderboardEntry[];
}

export function LeaderboardTable({ entries }: LeaderboardTableProps) {
    return (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm overflow-hidden transition-colors">
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent dark:border-zinc-800">
                        <TableHead className="w-[80px] text-center dark:text-zinc-400">Rank</TableHead>
                        <TableHead className="dark:text-zinc-400">Creator</TableHead>
                        <TableHead className="dark:text-zinc-400">Portfolio</TableHead>
                        <TableHead className="dark:text-zinc-400">Tech Stack</TableHead>
                        <TableHead className="text-right dark:text-zinc-400">Score</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {entries.map((entry) => (
                        <TableRow key={entry.id} className="dark:border-zinc-800 dark:hover:bg-zinc-900/50 transition-colors">
                            <TableCell className="font-bold text-center">
                                <span className={`
                                    flex h-8 w-8 items-center justify-center rounded-full mx-auto
                                    ${entry.rank === 1 ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400" : 
                                      entry.rank === 2 ? "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400" :
                                      entry.rank === 3 ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400" :
                                      "text-zinc-500 dark:text-zinc-400"}
                                `}>
                                    {entry.rank}
                                </span>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8 border dark:border-zinc-800">
                                        <AvatarImage src={entry.user.avatarUrl} />
                                        <AvatarFallback className="dark:bg-zinc-800 dark:text-zinc-400">{entry.user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="font-medium dark:text-zinc-200">{entry.user.name}</div>
                                </div>
                            </TableCell>
                            <TableCell className="font-medium dark:text-zinc-200">{entry.title}</TableCell>
                            <TableCell>
                                <div className="flex flex-wrap gap-1">
                                    {entry.tech_stack?.slice(0, 3).map((tech) => (
                                        <Badge key={tech} variant="secondary" className="text-[10px] px-1 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800">
                                            {tech}
                                        </Badge>
                                    ))}
                                    {entry.tech_stack && entry.tech_stack.length > 3 && (
                                        <span className="text-[10px] text-zinc-400">+{entry.tech_stack.length - 3}</span>
                                    )}
                                </div>
                            </TableCell>
                            <TableCell className="text-right font-bold text-zinc-900 dark:text-zinc-100">
                                {entry.score.toFixed(1)}
                            </TableCell>
                            <TableCell>
                                <a 
                                    href={entry.url} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="p-2 text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
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
