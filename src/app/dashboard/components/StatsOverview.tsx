import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Heart, Bookmark, MessageSquare, TrendingUp, Trophy } from "lucide-react";
import { DashboardPortfolio } from "@/app/dashboard/lib/types";

interface StatsOverviewProps {
  portfolio: DashboardPortfolio | null;
}

export function StatsOverview({ portfolio }: StatsOverviewProps) {
  const stats = [
    {
      title: "Portfolio Views",
      value: portfolio?.views || 0,
      icon: Eye,
      color: "text-blue-400",
      description: "Total reach"
    },
    {
      title: "Total Likes",
      value: portfolio?.likes || 0,
      icon: Heart,
      color: "text-red-400",
      description: "Community love"
    },
    {
      title: "Bookmarks",
      value: portfolio?.bookmarks || 0,
      icon: Bookmark,
      color: "text-indigo-400",
      description: "Saved for later"
    },
    {
      title: "Comments",
      value: portfolio?.comments_count || 0,
      icon: MessageSquare,
      color: "text-emerald-400",
      description: "Rich feedback"
    },
    {
      title: "Overall Score",
      value: portfolio?.score ? portfolio.score.toFixed(1) : "0.0",
      icon: Trophy,
      color: "text-amber-400",
      description: "Ranking weight"
    },
    {
      title: "Current Rank",
      value: "#12", // Mock for now
      icon: TrendingUp,
      color: "text-indigo-500",
      description: "In the forge"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-zinc-900 border-white/5 shadow-xl hover:bg-zinc-900/80 transition-all group overflow-hidden relative">
          <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity`} />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{stat.title}</CardTitle>
            <stat.icon className={`h-3.5 w-3.5 ${stat.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-white tracking-tighter">{stat.value}</div>
            <p className="text-[10px] text-zinc-600 font-bold mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
