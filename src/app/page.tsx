"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GlowBackground } from "@/components/custom/GlowBackground";
import { AuthButton } from "@/app/auth/components/auth-button";
import { useAuthStore } from "@/app/auth/lib/useAuthstore";
import { 
  ArrowRight, 
  Sparkles, 
  Trophy, 
  Compass, 
  ShieldCheck, 
  Zap,
  Github,
  Star
} from "lucide-react";
import { UserAvatar } from "@/components/custom/UserAvatar";
import { StatsBadge } from "@/components/custom/StatsBadge";
import { cn } from "@/lib/utils";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: Compass,
      title: "Swipe Discovery",
      description: "Infinite feed of developer portfolios. Swipe right to like, left to skip. Discovery has never been this addictive."
    },
    {
      icon: Trophy,
      title: "Rank by Merit",
      description: "Climb the global leaderboard based on community engagement. Your score is a mix of likes, bookmarks, and comments."
    },
    {
      icon: Zap,
      title: "Embedded Previews",
      description: "View live portfolios directly inside the app with our sandboxed browser frame. No more tab clutter."
    },
    {
      icon: ShieldCheck,
      title: "Verified Creative",
      description: "Genuine work from genuine developers. Built-in GitHub verification ensures every portfolio is real."
    }
  ];

  const teaserRankings = [
    { name: "Alex Rivera", score: 98.4, avatar: "https://avatar.vercel.sh/alex", rank: 1 },
    { name: "Sarah Chen", score: 95.2, avatar: "https://avatar.vercel.sh/sarah", rank: 2 },
    { name: "Jordan Smit", score: 92.8, avatar: "https://avatar.vercel.sh/jordan", rank: 3 }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-white selection:bg-indigo-500/30 overflow-x-hidden">
      <GlowBackground />
      
      {/* Navbar */}
      <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-6 md:px-10">
          <div className="flex items-center gap-3 group">
            <div className="h-9 w-9 rounded-xl bg-white flex items-center justify-center transition-transform group-hover:scale-105 shadow-xl">
              <span className="text-black font-black text-xs">PF</span>
            </div>
            <span className="text-xl font-bold tracking-tighter hidden sm:block">Portfolio Forge</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-zinc-500 uppercase tracking-widest">
            <Link href="/explore" className="hover:text-white transition-colors">Explore</Link>
            <Link href="/leaderboard" className="hover:text-white transition-colors">Leaderboard</Link>
            <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <AuthButton />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-40 pb-20 px-6 text-center relative z-10 max-w-6xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold text-indigo-400 mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
            <Sparkles className="w-3.5 h-3.5" />
            The Definitive Gallery for Developers
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] animate-in fade-in slide-in-from-bottom-4 duration-1000">
            DISCOVER <br className="hidden md:block" />
            <span className="text-zinc-600">DEVELOPER</span> WORK
          </h1>
          
          <p className="max-w-2xl text-zinc-500 font-medium md:text-xl md:leading-relaxed mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            A premium discovery platform where the community ranks the best portfolios. 
            Build yours, share it, and climb the leaderboard.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            {mounted && (
              <>
                <Link href={isAuthenticated ? "/dashboard" : "/auth"}>
                  <Button size="lg" className="h-14 px-10 rounded-2xl bg-white text-black hover:bg-zinc-200 font-black text-base shadow-[0_0_40px_rgba(255,255,255,0.1)] active:scale-95 transition-all">
                    {isAuthenticated ? "Go to Dashboard" : "Add Your Portfolio"}
                  </Button>
                </Link>
                <Link href="/explore">
                  <Button size="lg" variant="outline" className="h-14 px-10 rounded-2xl border-white/5 bg-white/5 hover:bg-white/10 text-white font-black text-base active:scale-95 transition-all">
                    Explore Feed
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Hero Teaser Visual */}
          <div className="mt-24 w-full relative group animate-in zoom-in-95 duration-1000">
            <div className="absolute -inset-4 bg-indigo-500/10 rounded-[2.5rem] blur-3xl opacity-50" />
            <div className="relative rounded-[2rem] border border-white/10 bg-zinc-900 overflow-hidden shadow-2xl p-1">
              <div className="rounded-[1.75rem] border border-white/10 bg-black aspect-[16/9] flex flex-col">
                <div className="h-10 border-b border-white/5 bg-zinc-900/50 flex items-center px-4 gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20" />
                </div>
                <div className="flex-1 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900/50" />
                  <div className="z-10 flex flex-col items-center">
                    <Compass className="w-16 h-16 text-indigo-500/20 animate-pulse mb-4" />
                    <p className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-[10px]">Discovery Module Active</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-32 px-6 max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="p-8 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-indigo-500/20 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/5 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-all">
                  <feature.icon className="w-6 h-6 text-zinc-400 group-hover:text-indigo-400 transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 tracking-tight">{feature.title}</h3>
                <p className="text-sm text-zinc-500 font-medium leading-relaxed leading-relaxed leading-relaxed leading-relaxed leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Leaderboard Teaser */}
        <section className="py-32 px-6 max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-[10px] font-black text-amber-500 uppercase tracking-widest mb-8">
            Live Standings
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-16">Community Top Rated</h2>
          
          <div className="grid gap-4">
            {teaserRankings.map((rank) => (
              <div key={rank.rank} className="p-4 rounded-2xl bg-zinc-900/30 border border-white/5 flex items-center justify-between hover:bg-zinc-900/50 transition-all">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs border",
                    rank.rank === 1 ? "bg-amber-500/10 border-amber-500/30 text-amber-500" :
                    rank.rank === 2 ? "bg-zinc-200/10 border-white/20 text-zinc-300" :
                    "bg-orange-900/10 border-orange-900/30 text-orange-500"
                  )}>
                    {rank.rank}
                  </div>
                  <UserAvatar name={rank.name} image={rank.avatar} size="sm" />
                  <span className="font-bold text-zinc-200">{rank.name}</span>
                </div>
                <div className="flex items-center gap-6">
                  <StatsBadge icon={Star} count={rank.score} variant={rank.rank === 1 ? "amber" : "default"} />
                  <ArrowRight className="w-4 h-4 text-zinc-700" />
                </div>
              </div>
            ))}
          </div>
          
          <Link href="/leaderboard" className="inline-block mt-12 text-zinc-500 hover:text-white font-bold text-sm tracking-widest uppercase transition-colors">
            View full leaderboard
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 text-center text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em] relative z-10">
        <div className="flex justify-center gap-8 mb-8">
          <Link href="/explore" className="hover:text-zinc-400 transition-colors">Explore</Link>
          <Link href="/leaderboard" className="hover:text-zinc-400 transition-colors">Leaderboard</Link>
          <Link href="https://github.com" className="hover:text-zinc-400 transition-colors flex items-center gap-1.5">
            <Github className="w-3 h-3" /> GitHub
          </Link>
        </div>
        <p>© {new Date().getFullYear()} Portfolio Forge - All rights reserved</p>
      </footer>
    </div>
  );
}
