"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2, LayoutDashboard, Settings, ExternalLink } from "lucide-react";
import { StatsOverview } from "@/app/dashboard/components/StatsOverview";
import { PortfolioForm } from "@/app/dashboard/components/PortfolioForm";
import { useDashboard } from "@/app/dashboard/hooks/use-dashboard";
import { Button } from "@/components/ui/button";

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
            router.push("/auth");
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated || portfoliosLoading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-12 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                        Workspace
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
                        Project Dashboard
                    </h1>
                    <p className="text-zinc-500 font-medium max-w-xl leading-relaxed">
                        Precision tools to manage your digital presence. Monitor your engagement and update your project for the global forge.
                    </p>
                </div>
                
                {currentPortfolio && (
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="h-11 px-6 rounded-xl border-white/5 bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-all active:scale-95">
                            <Settings className="w-4 h-4 mr-2" />
                            Settings
                        </Button>
                        <a href={currentPortfolio.url} target="_blank" rel="noreferrer">
                            <Button className="h-11 px-6 rounded-xl bg-white text-black hover:bg-zinc-200 font-bold text-sm transition-all active:scale-95">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                View Live
                            </Button>
                        </a>
                    </div>
                )}
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-1 w-12 bg-indigo-500 rounded-full" />
                    <h2 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500">Live Analytics</h2>
                </div>
                <StatsOverview portfolio={currentPortfolio} />
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-1 w-12 bg-purple-500 rounded-full" />
                    <h2 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500">Project Configuration</h2>
                </div>
                <PortfolioForm 
                    portfolio={currentPortfolio}
                    onSubmit={onSubmit}
                    isPending={createPortfolioMutation.isPending}
                    isSuccess={createPortfolioMutation.isSuccess}
                    isError={createPortfolioMutation.isError}
                />
            </div>

            {/* Subtle Footer Spacer */}
            <div className="h-20" />
        </div>
    );
}
