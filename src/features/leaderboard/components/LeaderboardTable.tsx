"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ExternalLink } from "lucide-react";

interface LeaderboardTableProps {
    entries: any[];
}

export function LeaderboardTable({ entries }: LeaderboardTableProps) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Top Developers</CardTitle>
                        <CardDescription>Updated continually by the community.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px] text-center">Rank</TableHead>
                            <TableHead>Portfolio Creator</TableHead>
                            <TableHead className="hidden md:table-cell">Primary Stack</TableHead>
                            <TableHead className="text-right">Score</TableHead>
                            <TableHead className="w-[80px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {entries.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-6 text-zinc-500">
                                    No portfolios have been ranked yet.
                                </TableCell>
                            </TableRow>
                        )}
                        {entries.map((portfolio: any, index: number) => {
                            const rank = index + 1;
                            return (
                                <TableRow key={portfolio.id} className={rank <= 3 ? "bg-zinc-50" : ""}>
                                    <TableCell className="text-center font-medium">
                                        {rank === 1 && <span className="text-amber-500 font-bold text-lg">1</span>}
                                        {rank === 2 && <span className="text-zinc-400 font-bold text-lg">2</span>}
                                        {rank === 3 && <span className="text-amber-700 font-bold text-lg">3</span>}
                                        {rank > 3 && <span className="text-zinc-500">{rank}</span>}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9 border border-zinc-100">
                                                <AvatarFallback>{(portfolio.title || "P").charAt(0).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-zinc-900 leading-none">{portfolio.title || "Untitled"}</span>
                                                <span className="text-xs text-zinc-500 mt-1">{portfolio.url || "No link"}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <div className="flex gap-1 flex-wrap">
                                            {(portfolio.tech_stack || []).slice(0, 3).map((tech: string, i: number) => (
                                                <Badge key={i} variant="secondary" className="bg-zinc-100 text-[10px] text-zinc-600 font-normal">{tech}</Badge>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right font-mono font-medium">
                                        {portfolio.score ? portfolio.score.toFixed(1) : "0.0"}
                                    </TableCell>
                                    <TableCell>
                                        <a href={portfolio.url?.startsWith('http') ? portfolio.url : `https://${portfolio.url}`} target="_blank" rel="noreferrer">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-900">
                                                <ExternalLink className="h-4 w-4" />
                                            </Button>
                                        </a>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
