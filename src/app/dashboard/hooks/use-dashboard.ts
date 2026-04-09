import { useAuthStore } from "@/app/auth/lib/useAuthstore";
import { useApi } from "@/lib/api/use-api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PortfolioFormData } from "../lib/validation";
import { toast } from "sonner";

export function useDashboard() {
    const { user, isAuthenticated } = useAuthStore();
    const { fetchUserPortfolios, createPortfolio, updatePortfolio } = useApi();

    const { data: portfolios, isLoading: portfoliosLoading, refetch } = useQuery({
        queryKey: ['user-portfolios', user?.id],
        queryFn: () => fetchUserPortfolios(user?.id as string),
        enabled: !!user?.id && isAuthenticated,
    });

    const currentPortfolio = portfolios && Array.isArray(portfolios) && portfolios.length > 0 ? portfolios[0] : null;

    const createPortfolioMutation = useMutation({
        mutationFn: (data: PortfolioFormData) => {
            if (currentPortfolio?.id) {
                return updatePortfolio({ id: currentPortfolio.id, data });
            }
            return createPortfolio(data);
        },
        onSuccess: () => {
            refetch();
            toast.success(currentPortfolio ? "Portfolio updated in the forge" : "Portfolio forged successfully!");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Forge operation failed");
        }
    });

    const onSubmit = (data: PortfolioFormData) => {
        createPortfolioMutation.mutate(data);
    };

    return {
        user,
        isAuthenticated,
        portfoliosLoading: portfoliosLoading || (isAuthenticated && !user?.id),
        currentPortfolio,
        onSubmit,
        createPortfolioMutation
    };
}
