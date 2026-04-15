"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Compass, Trophy, LogOut, Sun, Moon } from "lucide-react";
import { AuthButton } from "@/app/auth/components/auth-button";
import { UserAvatar } from "@/components/custom/UserAvatar";
import { useAuthStore } from "@/app/auth/lib/useAuthstore";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { user, isAuthenticated, logout } = useAuthStore();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => setMounted(true), []);

    // Define paths where the sidebar should NOT show (landing and auth)
    const isAuthPath = pathname?.startsWith("/auth");
    const isLandingPage = pathname === "/";
    
    if (isAuthPath || isLandingPage) {
        return <>{children}</>;
    }

    const navigation = [
        { name: "Myspace", href: "/dashboard", icon: LayoutDashboard },
        { name: "Explore", href: "/explore", icon: Compass },
        { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
    ];

    return (
        <div className="flex min-h-screen bg-background text-foreground font-sans selection:bg-accent/20 transition-colors duration-500">
            {/* Sidebar Desktop */}
            <aside className="hidden w-64 flex-col border-r border-border bg-card md:flex sticky top-0 h-screen transition-all duration-500">
                <div className="flex h-16 items-center px-8 border-b border-border">
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="h-7 w-7 rounded-lg bg-foreground flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm">
                          <span className="text-background font-black text-[9px]">PF</span>
                        </div>
                        <span className="text-sm font-black tracking-tight uppercase">Portfolio Forge</span>
                    </Link>
                </div>

                <div className="flex flex-1 flex-col justify-between py-8 px-4">
                    <nav className="space-y-1">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 rounded-xl px-4 py-2.5 transition-all duration-300 group relative",
                                        isActive 
                                        ? "text-foreground bg-muted font-bold" 
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                    )}
                                >
                                    {isActive && (
                                        <div className="absolute left-1 w-1 h-4 bg-accent rounded-full" />
                                    )}
                                    <item.icon className={cn(
                                        "h-4 w-4 transition-colors",
                                        isActive ? "text-accent" : "group-hover:text-foreground"
                                    )} />
                                    <span className="text-xs uppercase tracking-widest">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="mt-auto space-y-6">
                        {isAuthenticated && user && (
                            <div className="bg-muted/30 rounded-2xl p-4 border border-border">
                                <div className="flex items-center gap-3 mb-4">
                                    <UserAvatar name={user.name} image={user.avatarUrl} size="sm" />
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-xs font-bold truncate">{user.name}</span>
                                        <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">Verified Architect</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => logout()}
                                    className="flex items-center gap-2 w-full px-2 py-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors"
                                >
                                    <LogOut className="h-3 w-3" />
                                    Sign out
                                </button>
                            </div>
                        )}
                        
                        <div className="px-4 py-4 bg-accent/5 rounded-2xl border border-accent/10 text-center group cursor-pointer hover:bg-accent/10 transition-all">
                            <p className="text-[9px] font-black text-accent uppercase tracking-[0.2em] mb-1">Global Events</p>
                            <p className="text-[10px] text-muted-foreground font-medium group-hover:text-foreground">Coming in Summer '26</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex flex-1 flex-col">
                <header className="flex h-16 items-center justify-between border-b border-border bg-background/80 backdrop-blur-md px-6 md:px-12 sticky top-0 z-30 transition-all duration-500">
                    <div className="md:hidden">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-foreground flex items-center justify-center">
                              <span className="text-background font-black text-xs">PF</span>
                            </div>
                        </Link>
                    </div>
                    
                    <div className="hidden md:flex items-center gap-3">
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Platform</span>
                        <div className="h-1 w-1 rounded-full bg-border" />
                        <span className="text-[10px] font-black text-foreground uppercase tracking-[0.3em]">
                            {pathname?.split('/').filter(Boolean)[0]?.replace('-', ' ') || 'Home'}
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        {mounted && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="h-9 w-9 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
                            >
                                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                            </Button>
                        )}
                        <div className="h-6 w-[1px] bg-border mx-1" />
                        <AuthButton />
                    </div>
                </header>

                <main className="flex-1 p-6 md:p-12 lg:p-16">
                    <div className="mx-auto max-w-6xl animate-in fade-in slide-in-from-bottom-2 duration-1000">
                        {children}
                    </div>
                </main>
            </div>

            {/* Mobile bottom nav */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-20 items-center justify-around border-t border-border bg-background/95 backdrop-blur-xl md:hidden px-6 pb-2">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link 
                            key={item.href}
                            href={item.href} 
                            className={cn(
                                "flex flex-col items-center gap-1.5 transition-colors",
                                isActive ? "text-accent" : "text-muted-foreground"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            <span className="text-[9px] font-black uppercase tracking-widest">{item.name.split(' ').pop()}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
