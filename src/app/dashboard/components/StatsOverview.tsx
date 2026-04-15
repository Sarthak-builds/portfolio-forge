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
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {stats.map((stat, i) => (
        <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
        >
            <Card className="bg-card border-border shadow-sm hover:shadow-md transition-all group overflow-hidden h-full rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4">
                    <CardTitle className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">{stat.title}</CardTitle>
                    <stat.icon className={`h-3 w-3 ${stat.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
                </CardHeader>
                <CardContent className="px-4 pb-4">
                    <div className="text-xl font-black text-foreground tracking-tighter">{stat.value}</div>
                    <p className="text-[8px] text-muted-foreground font-bold uppercase tracking-widest mt-0.5">{stat.description}</p>
                </CardContent>
            </Card>
        </motion.div>
      ))}
    </div>
  );
}
