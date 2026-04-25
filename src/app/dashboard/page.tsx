"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, Settings, ExternalLink, Activity, Layout, Eye } from "lucide-react";
import { StatsOverview } from "@/app/dashboard/components/StatsOverview";
import { PortfolioForm } from "@/app/dashboard/components/PortfolioForm";
import { useDashboard } from "@/app/dashboard/hooks/use-dashboard";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/app/auth/lib/useAuthstore";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";

export default function DashboardPage() {
    const router = useRouter();
    const { isAuthenticated, user, setCredentials } = useAuthStore();
    const [mounted, setMounted] = useState(false);
    const {
        portfoliosLoading,
        currentPortfolio,
        onSubmit,
        onDelete,
        createPortfolioMutation,
        deletePortfolioMutation
    } = useDashboard();

    useEffect(() => {
        setMounted(true);
    }, []);

    // Handle OAuth Token from URL
    useEffect(() => {
        if (!mounted) return;

        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if (token) {
            const verifySession = async () => {
                try {
                    const res = await apiClient.get("auth/me", {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    setCredentials(res.data, token);
                    // Clean URL
                    window.history.replaceState({}, document.title, window.location.pathname);
                    toast.success("Login successful via Google");
                } catch (err) {
                    console.error("Dashboard OAuth verification failed:", err);
                    router.push("/auth/sign-in?error=oauth_failed");
                }
            };
            verifySession();
        } else if (!isAuthenticated) {
            router.push("/auth/sign-in");
        }
    }, [mounted, isAuthenticated, setCredentials, router]);

    if (!mounted || (!isAuthenticated && !new URLSearchParams(window.location.search).get('token')) || portfoliosLoading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-10 max-w-7xl mx-auto sm:-mt-7 w-full overflow-x-hidden">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground">
                        Dashboard
                    </h1>
                    <p className="text-muted-foreground font-medium max-w-lg text-xs leading-relaxed">
                        Precision tools to manage your digital presence. Monitor your engagement and update your project for the global forge.
                    </p>
                </div>
                
                {currentPortfolio && (
                    <div className="flex items-center gap-3">
                        <Link href={`/portfolio/${currentPortfolio.id}`}>
                            {/* <Button className="h-10 px-6 rounded-xl bg-accent/10 hover:bg-accent/20 text-accent font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 shadow-sm border border-accent/20">
                                <Eye className="w-3.5 h-3.5 mr-2" />
                                Public View
                            </Button> */}
                        </Link>
                        <a href={currentPortfolio.url} target="_blank" rel="noreferrer">
                            <Button className="h-10 px-6 rounded-xl bg-foreground text-background hover:opacity-90 font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 shadow-sm">
                                <ExternalLink className="w-3.5 h-3.5 mr-2" />
                                Launch Site
                            </Button>
                        </a>
                    </div>
                )}            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-6 w-6 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Activity className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <h2 className="text-[12px] font-black uppercase tracking-[0.2em] text-muted-foreground">Live Insights</h2>
                </div>
                <StatsOverview portfolio={currentPortfolio} />
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-6 w-6 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Layout className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <h2 className="text-[12px] font-black uppercase tracking-[0.2em] text-muted-foreground">my Portfolio</h2>
                </div>
                <PortfolioForm 
                    portfolio={currentPortfolio}
                    onSubmit={onSubmit}
                    onDelete={onDelete}
                    isPending={createPortfolioMutation.isPending}
                    isSuccess={createPortfolioMutation.isSuccess}
                    isError={createPortfolioMutation.isError}
                    error={createPortfolioMutation.error}
                    isDeletePending={deletePortfolioMutation.isPending}
                />
            </div>

            {/* Subtle Footer Spacer */}
            <div className="h-10" />
        </div>
    );
}
