import { useAuthStore } from "@/app/auth/lib/useAuthstore";
import { useApi } from "@/lib/api/use-api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PortfolioFormData } from "../lib/validation";
import { toast } from "sonner";

export function useDashboard() {
    const { user, isAuthenticated } = useAuthStore();
    const { fetchUserPortfolios, createPortfolio, updatePortfolio, deletePortfolio } = useApi();

    const { data: portfolios, isLoading: portfoliosLoading, refetch } = useQuery({
        queryKey: ['user-portfolios', user?.id],
        queryFn: async () => {
            try {
                return await fetchUserPortfolios(user?.id as string);
            } catch (error: any) {
                if (error.response?.status === 404) return null;
                throw error;
            }
        },
        enabled: !!user?.id && isAuthenticated,
        retry: false,
    });

    const currentPortfolio = portfolios ? (Array.isArray(portfolios) ? (portfolios.length > 0 ? portfolios[0] : null) : portfolios) : null;

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

    const deletePortfolioMutation = useMutation({
        mutationFn: (id: string) => deletePortfolio(id),
        onSuccess: () => {
            refetch();
            toast.success("Portfolio deleted from the forge");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to delete portfolio");
        }
    });

    const onDelete = () => {
        if (currentPortfolio?.id) {
            deletePortfolioMutation.mutate(currentPortfolio.id);
        }
    };

    return {
        user,
        isAuthenticated,
        portfoliosLoading: portfoliosLoading || (isAuthenticated && !user?.id),
        currentPortfolio,
        onSubmit,
        onDelete,
        createPortfolioMutation,
        deletePortfolioMutation
    };
}
