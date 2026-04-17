"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Heart, Bookmark, MessageSquare, TrendingUp, Trophy } from "lucide-react";
import { DashboardPortfolio } from "@/app/dashboard/lib/types";
import { motion } from "motion/react";

interface StatsOverviewProps {
  portfolio: DashboardPortfolio | null;
}

export function StatsOverview({ portfolio }: StatsOverviewProps) {
  const stats = [
    {
      title: "Discovery",
      value: portfolio?.views || 0,
      icon: Eye,
      color: "text-blue-500",
      description: "Portfolio reach"
    },
    {
      title: "Appreciation",
      value: portfolio?.likes || 0,
      icon: Heart,
      color: "text-accent",
      description: "Total likes"
    },
    {
      title: "Bookmarks",
      value: portfolio?.bookmarks || 0,
      icon: Bookmark,
      color: "text-amber-500",
      description: "Saved for later"
    },
    {
      title: "Feedback",
      value: portfolio?.comments_count || 0,
      icon: MessageSquare,
      color: "text-emerald-500",
      description: "Total comments"
    },
    {
      title: "Forge Score",
      value: portfolio?.score ? Number(portfolio.score).toFixed(1) : "0.0",
      icon: Trophy,
      color: "text-accent",
      description: "Community weight"
    },
    {
      title: "Global Rank",
      value: portfolio?.rank ? `#${portfolio.rank}` : "Pending",
      icon: TrendingUp,
      color: "text-blue-600",
      description: "Forge position"
    }
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, i) => (
        <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
        >
            <Card className="bg-card border-border shadow-sm hover:shadow-xl hover:border-accent/20 transition-all group overflow-hidden h-32 rounded-[2rem] relative">
                <div className="absolute top-1/2 -right-4 -translate-y-1/2 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                    <stat.icon className="h-24 w-24" />
                </div>
                
                <CardContent className="h-full flex flex-col justify-center px-8 relative z-10">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{stat.title}</span>
                        <stat.icon className={`h-4 w-4 ${stat.color} opacity-40 group-hover:opacity-100 transition-opacity`} />
                    </div>
                    <div className="text-4xl font-black text-foreground tracking-tighter mb-1">{stat.value}</div>
                    <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">{stat.description}</p>
                </CardContent>
            </Card>
        </motion.div>
      ))}
    </div>
  );
}
