import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Star, TrendingUp } from "lucide-react";

import { DashboardPortfolio } from "@/app/dashboard/lib/types";

interface StatsOverviewProps {
  portfolio: DashboardPortfolio | null;
}

export function StatsOverview({ portfolio }: StatsOverviewProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="dark:bg-zinc-900 dark:border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium dark:text-zinc-300">Total Views</CardTitle>
          <Eye className="h-4 w-4 text-zinc-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold dark:text-zinc-50">{portfolio?.views || 0}</div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Analytics from backend</p>
        </CardContent>
      </Card>
      <Card className="dark:bg-zinc-900 dark:border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium dark:text-zinc-300">Average Rating</CardTitle>
          <Star className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold dark:text-zinc-50">{portfolio?.score ? portfolio.score.toFixed(1) : "0.0"}</div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Based on recent ratings</p>
        </CardContent>
      </Card>
      <Card className="dark:bg-zinc-900 dark:border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium dark:text-zinc-300">Status</CardTitle>
          <TrendingUp className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold dark:text-zinc-50">{portfolio ? "Active" : "None"}</div>
          <p className="text-xs text-emerald-600 font-medium dark:text-emerald-400">Create via form below</p>
        </CardContent>
      </Card>
    </div>
  );
}
