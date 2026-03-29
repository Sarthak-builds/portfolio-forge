import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Star, TrendingUp } from "lucide-react";

import { DashboardPortfolio } from "@/app/dashboard/lib/types";

interface StatsOverviewProps {
  portfolio: DashboardPortfolio | null;
}

export function StatsOverview({ portfolio }: StatsOverviewProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Views</CardTitle>
          <Eye className="h-4 w-4 text-zinc-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{portfolio?.views || 0}</div>
          <p className="text-xs text-zinc-500">Analytics from backend</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          <Star className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{portfolio?.score ? portfolio.score.toFixed(1) : "0.0"}</div>
          <p className="text-xs text-zinc-500">Based on recent ratings</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Status</CardTitle>
          <TrendingUp className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{portfolio ? "Active" : "None"}</div>
          <p className="text-xs text-emerald-600 font-medium">Create via form below</p>
        </CardContent>
      </Card>
    </div>
  );
}
