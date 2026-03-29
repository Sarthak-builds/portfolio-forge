import { useAuthStore } from "@/app/auth/lib/useAuthstore";
import { useApi } from "@/lib/api/use-api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useDashboard() {
    const { user, isLoading: isLoaded } = useAuthStore();
    const { fetchUserPortfolios, createPortfolio } = useApi();

    const { data: portfolios, isLoading: portfoliosLoading, refetch } = useQuery({
        queryKey: ['user-portfolios', user?.id],
        queryFn: () => fetchUserPortfolios(user?.id as string),
        enabled: !!user?.id,
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
            github_url: formData.get('github'),
            tech_stack: stackList,
            description: formData.get('description'),
        };

        createPortfolioMutation.mutate(data);
    };

    const currentPortfolio = portfolios && portfolios.length > 0 ? portfolios[0] : null;

    return {
        user,
        isLoaded,
        portfoliosLoading,
        currentPortfolio,
        onSubmit,
        createPortfolioMutation
    };
}
