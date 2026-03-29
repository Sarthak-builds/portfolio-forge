"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Compass, Trophy, LogOut } from "lucide-react";
import { AuthButton } from "@/app/auth/components/auth-button";
import { ThemeToggle } from "@/components/theme-toggle";

export function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    
    // Define paths where the sidebar should NOT show (landing and auth)
    const isAuthPath = pathname?.startsWith("/auth");
    const isLandingPage = pathname === "/";
    
    if (isAuthPath || isLandingPage) {
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-screen bg-background text-foreground transition-colors selection:bg-zinc-200 dark:selection:bg-zinc-800">
            {/* Sidebar */}
            <aside className="hidden w-64 flex-col border-r border-border bg-card dark:bg-zinc-950 md:flex">
                <div className="flex h-16 flex-col justify-center px-6 border-b border-border/50">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="h-8 w-8 rounded-lg bg-zinc-950 dark:bg-zinc-50 flex items-center justify-center transition-transform group-hover:scale-105">
                          <span className="text-white dark:text-zinc-950 font-black text-xs">PF</span>
                        </div>
                        <span className="text-xl font-bold tracking-tighter text-zinc-950 dark:text-zinc-50">Portfolio Forge</span>
                    </Link>
                </div>
                <div className="flex flex-1 flex-col justify-between py-6">
                    <nav className="flex flex-col gap-1.5 px-4 text-sm font-medium">
                        <Link
                            href="/dashboard"
                            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 ${
                                pathname === "/dashboard" 
                                ? "bg-zinc-100 text-zinc-950 shadow-sm dark:bg-zinc-900 dark:text-zinc-50" 
                                : "text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-50 dark:hover:bg-zinc-900/50"
                            }`}
                        >
                            <LayoutDashboard className="h-4 w-4" />
                            My Dashboard
                        </Link>
                        <Link
                            href="/explore"
                            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 ${
                                pathname === "/explore" 
                                ? "bg-zinc-100 text-zinc-950 shadow-sm dark:bg-zinc-900 dark:text-zinc-50" 
                                : "text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-50 dark:hover:bg-zinc-900/50"
                            }`}
                        >
                            <Compass className="h-4 w-4" />
                            Explore Feed
                        </Link>
                        <Link
                            href="/leaderboard"
                            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 ${
                                pathname === "/leaderboard" 
                                ? "bg-zinc-100 text-zinc-950 shadow-sm dark:bg-zinc-900 dark:text-zinc-50" 
                                : "text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-50 dark:hover:bg-zinc-900/50"
                            }`}
                        >
                            <Trophy className="h-4 w-4" />
                            Leaderboard
                        </Link>
                    </nav>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex flex-1 flex-col">
                <header className="flex h-16 items-center justify-between border-b border-border/50 bg-background/80 backdrop-blur-md px-4 md:px-8 sticky top-0 z-20">
                    <div className="md:hidden">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-zinc-950 dark:bg-zinc-50 flex items-center justify-center">
                              <span className="text-white dark:text-zinc-950 font-black text-xs">PF</span>
                            </div>
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                          {pathname?.split('/').filter(Boolean).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' / ') || 'Home'}
                        </p>
                    </div>
                    <div className="ml-auto flex items-center gap-4">
                        <ThemeToggle />
                        <div className="h-4 w-[1px] bg-border/60 mx-1" />
                        <AuthButton />
                    </div>
                </header>
                <main className="flex-1 p-4 md:p-8 lg:p-10">
                    <div className="mx-auto max-w-5xl animate-in fade-in slide-in-from-bottom-2 duration-500">
                        {children}
                    </div>
                </main>
            </div>

            {/* Mobile bottom nav */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 md:hidden">
                <Link href="/dashboard" className="flex flex-col items-center gap-1 text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100">
                    <LayoutDashboard className="h-5 w-5" />
                    <span className="text-[10px] font-medium">Stats</span>
                </Link>
                <Link href="/explore" className="flex flex-col items-center gap-1 text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100">
                    <Compass className="h-5 w-5" />
                    <span className="text-[10px] font-medium">Explore</span>
                </Link>
                <Link href="/leaderboard" className="flex flex-col items-center gap-1 text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100">
                    <Trophy className="h-5 w-5" />
                    <span className="text-[10px] font-medium">Rank</span>
                </Link>
            </nav>
        </div>
    );
}
