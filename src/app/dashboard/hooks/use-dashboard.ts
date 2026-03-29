"use client";

import { useAuthStore } from "@/app/auth/lib/useAuthstore";
import { useApi } from "@/lib/api/use-api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useDashboard() {
    const { user, isAuthenticated } = useAuthStore();
    const { fetchUserPortfolios, createPortfolio } = useApi();

    const { data: portfolios, isLoading: portfoliosLoading, refetch } = useQuery({
        queryKey: ['user-portfolios', user?.id],
        queryFn: () => fetchUserPortfolios(user?.id as string),
        enabled: !!user?.id && isAuthenticated,
    });

    const createPortfolioMutation = useMutation({
        mutationFn: createPortfolio,
        onSuccess: () => {
            refetch();
        }
    });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const stackList = formData.get('stack')?.toString().split(',').map((s) => s.trim()).filter(Boolean) || [];

        const data: any = {
            title: formData.get('title'),
            url: formData.get('url'),
            githubUrl: formData.get('github'),
            techStack: stackList,
            description: formData.get('description'),
        };

        createPortfolioMutation.mutate(data);
    };

    const currentPortfolio = portfolios && Array.isArray(portfolios) && portfolios.length > 0 ? portfolios[0] : null;

    return {
        user,
        isAuthenticated,
        portfoliosLoading: portfoliosLoading || (isAuthenticated && !user?.id),
        currentPortfolio,
        onSubmit,
        createPortfolioMutation
    };
}
