"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuthStore } from "@/app/auth/lib/useAuthstore";
import { AuthButton } from "@/app/auth/components/auth-button";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-background text-foreground relative w-full overflow-hidden selection:bg-zinc-200 dark:selection:bg-zinc-800 transition-colors">
      <BackgroundBeams />
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-zinc-950 dark:bg-zinc-50 flex items-center justify-center">
              <span className="text-white dark:text-zinc-950 font-black text-xs">PF</span>
            </div>
            <span className="text-xl font-bold tracking-tighter">Portfolio Forge</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/explore" className="hover:text-foreground transition-colors">Explore</Link>
            <Link href="/leaderboard" className="hover:text-foreground transition-colors">Leaderboard</Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="h-4 w-[1px] bg-border/60 mx-1 hidden sm:block" />
            <AuthButton />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center pt-24 pb-12 px-4 text-center relative z-10">
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-sm font-medium text-muted-foreground mb-4 transition-colors hover:bg-muted cursor-pointer animate-in fade-in slide-in-from-top-4 duration-700">
            ✨ The Gamified Ecosystem for Creative Professionals
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight lg:leading-[1.1] text-foreground animate-in fade-in slide-in-from-bottom-4 duration-700">
            Showcase your work. <br className="hidden md:inline" />
            <span className="text-muted-foreground">Discover inspiration.</span>
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 mx-auto font-medium animate-in fade-in slide-in-from-bottom-6 duration-700">
            Revolutionize how you share your portfolio with swipe-based discovery. Receive community-driven ratings, get rich feedback, and climb the global leaderboards based on engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {mounted && isAuthenticated ? (
              <>
                <Link href="/dashboard">
                  <Button size="lg" className="rounded-xl px-8 text-base font-bold shadow-lg">
                    Manage My Stats
                  </Button>
                </Link>
                <Link href="/explore">
                  <Button size="lg" variant="outline" className="rounded-xl px-8 text-base font-bold border-border">
                    Open Explore Feed
                  </Button>
                </Link>
              </>
            ) : mounted ? (
              <>
                <Link href="/auth/sign-up">
                  <Button size="lg" className="rounded-xl px-8 text-base font-bold shadow-lg">
                    Join the Community
                  </Button>
                </Link>
                <Link href="/explore">
                  <Button size="lg" variant="outline" className="rounded-xl px-8 text-base font-bold border-border">
                    Start Swiping
                  </Button>
                </Link>
              </>
            ) : (
                <div className="h-12 w-64" />
            )}
          </div>
        </div>

        {/* Feature Preview or Graphic placeholder */}
        <div className="mt-20 w-full max-w-5xl mx-auto relative group animate-in zoom-in-95 duration-1000">
          <div className="absolute -inset-1 bg-gradient-to-r from-zinc-200 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative rounded-3xl border border-border bg-card p-2 shadow-2xl overflow-hidden">
            <div className="rounded-2xl border border-dashed border-border/50 bg-muted/30 aspect-video flex items-center justify-center overflow-hidden">
              <p className="text-muted-foreground font-medium text-lg">Swipe-Style Discovery Feed Preview</p>
            </div>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-border mt-20 py-8 text-center text-sm text-muted-foreground relative z-10">
        <p>© {new Date().getFullYear()} Portfolio Forge</p>
      </footer>
    </div>
  );
}
