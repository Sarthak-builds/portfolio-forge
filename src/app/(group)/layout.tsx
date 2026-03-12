import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { LayoutDashboard, Compass, Trophy } from "lucide-react";

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-zinc-50/50">
            <aside className="hidden w-64 flex-col border-r border-zinc-200 bg-white md:flex">
                <div className="flex h-16 flex-col justify-center px-6 border-b border-zinc-100">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-xl font-bold tracking-tighter text-zinc-950">Portfolio Forge</span>
                    </Link>
                </div>
                <div className="flex flex-1 flex-col justify-between py-6">
                    <nav className="flex flex-col gap-2 px-4 text-sm font-medium text-zinc-600">
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:bg-zinc-100"
                        >
                            <LayoutDashboard className="h-4 w-4" />
                            My Stats
                        </Link>
                        <Link
                            href="/explore"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-500 transition-all hover:text-zinc-900 hover:bg-zinc-100"
                        >
                            <Compass className="h-4 w-4" />
                            Explore
                        </Link>
                        <Link
                            href="/leaderboard"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-500 transition-all hover:text-zinc-900 hover:bg-zinc-100"
                        >
                            <Trophy className="h-4 w-4" />
                            Leaderboard
                        </Link>
                    </nav>
                </div>
            </aside>
            <div className="flex flex-1 flex-col">
                <header className="flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-4 md:px-6">
                    <div className="md:hidden">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-xl font-bold tracking-tighter text-zinc-950">PF</span>
                        </Link>
                    </div>
                    <div className="ml-auto flex items-center gap-4">
                        <UserButton />
                    </div>
                </header>
                <main className="flex-1 p-4 md:p-6 lg:p-8">
                    <div className="mx-auto max-w-5xl">
                        {children}
                    </div>
                </main>
            </div>
            <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-zinc-200 bg-white md:hidden">
                <Link href="/dashboard" className="flex flex-col items-center gap-1 text-zinc-600 hover:text-zinc-950">
                    <LayoutDashboard className="h-5 w-5" />
                    <span className="text-[10px] font-medium">Stats</span>
                </Link>
                <Link href="/explore" className="flex flex-col items-center gap-1 text-zinc-500 hover:text-zinc-950">
                    <Compass className="h-5 w-5" />
                    <span className="text-[10px] font-medium">Explore</span>
                </Link>
                <Link href="/leaderboard" className="flex flex-col items-center gap-1 text-zinc-500 hover:text-zinc-950">
                    <Trophy className="h-5 w-5" />
                    <span className="text-[10px] font-medium">Rank</span>
                </Link>
            </nav>
        </div>
    );
}
