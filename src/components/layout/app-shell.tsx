"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Compass, Trophy, LogOut, Sun, Moon, ChevronLeft, ChevronRight, Zap, MessageSquareText, Users, Flame } from "lucide-react";
import { AuthButton } from "@/app/auth/components/auth-button";
import { useAuthStore } from "@/app/auth/lib/useAuthstore";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [featureIndex, setFeatureIndex] = useState(0);

    const comingSoonFeatures = [
        "The Gauntlet Weekly",
        "Peer Review Scraps",
        "Recruiter God Mode",
        "Real-Time Heatmaps"
    ];
    
    useEffect(() => {
        setMounted(true);
        const interval = setInterval(() => {
            setFeatureIndex((prev) => (prev + 1) % comingSoonFeatures.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

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
            <aside 
                className={cn(
                    "hidden md:flex flex-col border-r border-border  sticky top-0 h-screen transition-all duration-500 z-40",
                    isCollapsed ? "w-20" : "w-64"
                )}
            >
                <div className={cn(
                    "flex h-16 items-center border-b border-border transition-all duration-500",
                    isCollapsed ? "justify-center px-0" : "px-8 justify-between"
                )}>
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="h-8 w-8 rounded-lg bg-foreground flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm shrink-0">
                          <span className="text-background font-semibold text-[10px]">PF</span>
                        </div>
                        {!isCollapsed && (
                            <motion.span 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-sm font-medium tracking-tight uppercase whitespace-nowrap"
                            >
                                Portfolio Forge
                            </motion.span>
                        )}
                    </Link>
                    
                    {!isCollapsed && (
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => setIsCollapsed(true)}
                            className="h-8 w-8 rounded-lg hover:bg-muted text-muted-foreground m-1"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                    )}
                </div>

                {isCollapsed && (
                    <div className="flex justify-center py-4 border-b border-border">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => setIsCollapsed(false)}
                            className="h-8 w-8 rounded-lg hover:bg-muted text-muted-foreground"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                )}

                <div className="flex flex-1 flex-col justify-between py-8 px-4 overflow-hidden">
                    <nav className="space-y-1">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    title={isCollapsed ? item.name : ""}
                                    className={cn(
                                        "flex items-center gap-3 rounded-xl transition-all duration-300 group relative",
                                        isCollapsed ? "justify-center px-0 py-3" : "px-4 py-2.5",
                                        isActive 
                                        ? "text-foreground bg-muted font-bold" 
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                    )}
                                >
                                    {isActive && !isCollapsed && (
                                        <div className="absolute left-1 w-1 h-4 bg-accent rounded-full" />
                                    )}
                                    <item.icon className={cn(
                                        "h-4 w-4 transition-colors shrink-0",
                                        isActive ? "text-accent" : "group-hover:text-foreground"
                                    )} />
                                    {!isCollapsed && (
                                        <motion.span 
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="text-xs uppercase tracking-widest whitespace-nowrap"
                                        >
                                            {item.name}
                                        </motion.span>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="mt-auto">
                        {!isCollapsed ? (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="px-4 py-6 bg-accent/5 rounded-2xl border border-accent/10 text-center relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 p-2 opacity-10">
                                    <Zap className="h-12 w-12 text-accent" />
                                </div>
                                <p className="text-[9px] font-black text-accent uppercase tracking-[0.2em] mb-3 relative z-10">Global Events</p>
                                <div className="h-12 flex items-center justify-center relative z-10">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={featureIndex}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.5 }}
                                            className="text-[10px] text-foreground font-black uppercase tracking-widest text-center"
                                        >
                                            {comingSoonFeatures[featureIndex]}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                                <p className="text-[8px] text-muted-foreground font-bold mt-2 uppercase tracking-tighter italic">Coming Summer '26</p>
                            </motion.div>
                        ) : (
                            <div className="flex justify-center">
                                <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent animate-pulse">
                                    <Zap className="h-5 w-5" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex flex-1 flex-col transition-all duration-500">
                <header className="flex h-16 items-center justify-between border-b border-border bg-background/80 backdrop-blur-md px-6 md:px-12 sticky top-0 z-30 transition-all duration-500">
                    <div className="md:hidden">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-foreground flex items-center justify-center">
                              <span className="text-background font-black text-xs">PF</span>
                            </div>
                        </Link>
                    </div>
                    
                    <div className="hidden md:flex items-center gap-3">
                        {/* Breadcrumb removed as requested */}
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

                <main className="flex-1 p-6 md:p-12 lg:p-16 overflow-x-hidden">
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
