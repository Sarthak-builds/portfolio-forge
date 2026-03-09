import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, TrendingUp, TrendingDown, Minus, ExternalLink } from "lucide-react";

const LEADERBOARD_DATA = [
    { rank: 1, name: "Sarah Connor", username: "@sarah.c", avatar: "https://i.pravatar.cc/150?u=sarah", score: 9840, change: "up", delta: 12, stack: ["React", "Three.js"] },
    { rank: 2, name: "John Smith", username: "@jsmith", avatar: "https://i.pravatar.cc/150?u=john", score: 9210, change: "same", delta: 0, stack: ["Next.js", "Tailwind"] },
    { rank: 3, name: "Emily Chen", username: "@emilyc", avatar: "https://i.pravatar.cc/150?u=emily", score: 8950, change: "up", delta: 4, stack: ["Vue", "Nuxt"] },
    { rank: 4, name: "Michael Chang", username: "@mike.ch", avatar: "https://i.pravatar.cc/150?u=mike", score: 8820, change: "down", delta: 2, stack: ["SvelteKit"] },
    { rank: 5, name: "Alex Designer", username: "@alexd", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d", score: 8400, change: "up", delta: 8, stack: ["Figma", "Framer"] },
    { rank: 6, name: "You (Creator)", username: "@creator", avatar: "", score: 6200, change: "up", delta: 5, stack: ["Next.js", "TypeScript"] },
];

export default function LeaderboardPage() {
    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-zinc-950 flex items-center gap-3">
                    <Trophy className="h-8 w-8 text-amber-500" />
                    Global Leaderboard
                </h1>
                <p className="text-zinc-500 mt-2">
                    The top ranked portfolios this week based on community engagement and ratings.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Top Developers</CardTitle>
                            <CardDescription>Updated daily at midnight UTC.</CardDescription>
                        </div>
                        <div className="flex space-x-2">
                            <Button variant="outline" size="sm">This Week</Button>
                            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">All Time</Button>
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
                                <TableHead className="w-[100px] text-center">Trend</TableHead>
                                <TableHead className="w-[80px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {LEADERBOARD_DATA.map((user) => (
                                <TableRow key={user.username} className={user.rank === 6 ? "bg-zinc-50 font-medium" : ""}>
                                    <TableCell className="text-center">
                                        {user.rank === 1 && <span className="text-amber-500 font-bold text-lg">1</span>}
                                        {user.rank === 2 && <span className="text-zinc-400 font-bold text-lg">2</span>}
                                        {user.rank === 3 && <span className="text-amber-700 font-bold text-lg">3</span>}
                                        {user.rank > 3 && <span className="text-zinc-500 font-medium">{user.rank}</span>}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9 border border-zinc-100">
                                                <AvatarImage src={user.avatar} />
                                                <AvatarFallback>{user.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-zinc-900 leading-none">{user.name}</span>
                                                <span className="text-xs text-zinc-500 mt-1">{user.username}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <div className="flex gap-1">
                                            {user.stack.map(tech => (
                                                <Badge key={tech} variant="secondary" className="bg-zinc-100 text-[10px] text-zinc-600 font-normal">{tech}</Badge>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right font-mono font-medium">
                                        {user.score.toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-center">
                                            {user.change === "up" && (
                                                <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200 gap-1 flex items-center pr-2">
                                                    <TrendingUp className="h-3 w-3" /> {user.delta}
                                                </Badge>
                                            )}
                                            {user.change === "down" && (
                                                <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 gap-1 flex items-center pr-2">
                                                    <TrendingDown className="h-3 w-3" /> {user.delta}
                                                </Badge>
                                            )}
                                            {user.change === "same" && (
                                                <Badge variant="outline" className="text-zinc-400 border-zinc-200 gap-1 flex items-center pr-2">
                                                    <Minus className="h-3 w-3" /> --
                                                </Badge>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-900">
                                            <ExternalLink className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
