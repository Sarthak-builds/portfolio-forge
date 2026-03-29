"use client";

import { useAuthStore } from "@/app/auth/lib/useAuthstore";
import { Loader2 } from "lucide-react";
import { useApi } from "@/features/api/use-api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { StatsOverview } from "@/features/portfolio/components/StatsOverview";
import { PortfolioForm } from "@/features/portfolio/components/PortfolioForm";

export default function DashboardPage() {
    const { user, isLoading: isLoaded } = useAuthStore();
    const { fetchUserPortfolios, createPortfolio } = useApi();

    // Fetch user portfolios wrapper hook
    const { data: portfolios, isLoading: portfoliosLoading, refetch } = useQuery({
        queryKey: ['user-portfolios', user?.id],
        queryFn: () => fetchUserPortfolios(user?.id as string),
        enabled: !!user?.id,
    });

    const createPortfolioMutation = useMutation({
        mutationFn: createPortfolio,
        onSuccess: () => {
            refetch(); // Reload the data on success
        }
    });

    // Form Submit Handler
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const stackList = formData.get('stack')?.toString().split(',').map((s) => s.trim()).filter(Boolean) || [];

        const data: any = {
            title: formData.get('title'),
            url: formData.get('url'),
            github_url: formData.get('github'),
            tech_stack: stackList,
            description: formData.get('description'),
        };

        // Check if there is already a portfolio we are updating?
        // Basic backend POST creates a new one. We'll stick to create as per the POST /portfolios route.
        createPortfolioMutation.mutate(data);
    };

    if (!isLoaded || portfoliosLoading) {
        return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-zinc-500" /></div>;
    }

    // Grab stats from the first portfolio if exists, else defaults
    const currentPortfolio = portfolios && portfolios.length > 0 ? portfolios[0] : null;

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
