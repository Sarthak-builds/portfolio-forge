"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Compass, Trophy, LogOut, Settings } from "lucide-react";
import { AuthButton } from "@/app/auth/components/auth-button";
import { UserAvatar } from "@/components/custom/UserAvatar";
import { useAuthStore } from "@/app/auth/lib/useAuthstore";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { user, isAuthenticated, logout } = useAuthStore();
    
    // Define paths where the sidebar should NOT show (landing and auth)
    const isAuthPath = pathname?.startsWith("/auth");
    const isLandingPage = pathname === "/";
    
    if (isAuthPath || isLandingPage) {
        return <>{children}</>;
    }

    const navigation = [
        { name: "My Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Explore Feed", href: "/explore", icon: Compass },
        { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
    ];

    return (
        <div className="flex min-h-screen bg-[#0a0a0a] text-zinc-100 selection:bg-indigo-500/30">
            {/* Sidebar Desktop */}
            <aside className="hidden w-64 flex-col border-r border-white/5 bg-[#0a0a0a] md:flex sticky top-0 h-screen">
                <div className="flex h-20 items-center px-8">
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="h-9 w-9 rounded-xl bg-white flex items-center justify-center transition-transform group-hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                          <span className="text-black font-black text-xs">PF</span>
                        </div>
                        <span className="text-lg font-bold tracking-tight text-white">Portfolio Forge</span>
                    </Link>
                </div>

                <div className="flex flex-1 flex-col justify-between py-6 px-4">
                    <nav className="space-y-1">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 group relative",
                                        isActive 
                                        ? "text-white bg-white/5" 
                                        : "text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.02]"
                                    )}
                                >
                                    {isActive && (
                                        <div className="absolute left-0 w-1 h-5 bg-indigo-500 rounded-r-full" />
                                    )}
                                    <item.icon className={cn(
                                        "h-4 w-4 transition-colors",
                                        isActive ? "text-indigo-400" : "group-hover:text-zinc-300"
                                    )} />
                                    <span className="text-sm font-semibold tracking-tight">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="mt-auto space-y-4">
                        {isAuthenticated && user && (
                            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                <div className="flex items-center gap-3 mb-4">
                                    <UserAvatar name={user.name} image={user.avatarUrl} size="sm" glow />
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-sm font-bold text-white truncate">{user.name}</span>
                                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Creator</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <button 
                                        onClick={() => logout()}
                                        className="flex items-center gap-2 w-full px-2 py-1.5 text-xs font-bold text-zinc-500 hover:text-red-400 transition-colors"
                                    >
                                        <LogOut className="h-3.5 w-3.5" />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                        
                        <div className="px-4 py-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-center">
                            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Coming Soon</p>
                            <p className="text-[11px] text-indigo-300/60 font-medium">Community Challenges</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex flex-1 flex-col">
                <header className="flex h-16 items-center justify-between border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md px-6 md:px-10 sticky top-0 z-30">
                    <div className="md:hidden">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center">
                              <span className="text-black font-black text-xs">PF</span>
                            </div>
                        </Link>
                    </div>
                    
                    <div className="hidden md:flex items-center gap-2">
                        <span className="text-[11px] font-bold text-zinc-600 uppercase tracking-[0.2em]">Platform</span>
                        <div className="h-1 w-1 rounded-full bg-zinc-800" />
                        <span className="text-[11px] font-bold text-white uppercase tracking-[0.2em]">
                            {pathname?.split('/').filter(Boolean)[0] || 'Home'}
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="h-8 w-[1px] bg-white/5 mx-1" />
                        <AuthButton />
                    </div>
                </header>

                <main className="flex-1 p-6 md:p-10 lg:p-12">
                    <div className="mx-auto max-w-6xl animate-in fade-in slide-in-from-bottom-2 duration-700">
                        {children}
                    </div>
                </main>
            </div>

            {/* Mobile bottom nav */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-20 items-center justify-around border-t border-white/5 bg-black/95 backdrop-blur-lg md:hidden px-6 pb-2">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link 
                            key={item.href}
                            href={item.href} 
                            className={cn(
                                "flex flex-col items-center gap-1.5 transition-colors",
                                isActive ? "text-indigo-400" : "text-zinc-500"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">{item.name.split(' ').pop()}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
