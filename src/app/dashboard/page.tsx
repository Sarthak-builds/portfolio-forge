"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { StatsOverview } from "@/app/dashboard/components/StatsOverview";
import { PortfolioForm } from "@/app/dashboard/components/PortfolioForm";
import { useDashboard } from "@/app/dashboard/hooks/use-dashboard";

export default function DashboardPage() {
    const router = useRouter();
    const {
        user,
        isAuthenticated,
        portfoliosLoading,
        currentPortfolio,
        onSubmit,
        createPortfolioMutation
    } = useDashboard();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/auth/sign-in");
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated || portfoliosLoading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-zinc-200" />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-zinc-950">
                    Welcome back, {user?.name || "Creator"}
                </h1>
                <p className="text-zinc-500 mt-2">
                    Manage your portfolio pipeline and view your latest engagement stats.
                </p>
            </div>

            <StatsOverview portfolio={currentPortfolio} />

            <PortfolioForm 
                portfolio={currentPortfolio}
                onSubmit={onSubmit}
                isPending={createPortfolioMutation.isPending}
                isSuccess={createPortfolioMutation.isSuccess}
                isError={createPortfolioMutation.isError}
            />
        </div>
    );
}
