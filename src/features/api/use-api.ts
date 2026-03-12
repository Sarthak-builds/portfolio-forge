import { useAuth } from "@clerk/nextjs";
import { useCallback } from "react";
import { apiClient } from "@/lib/api-client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useApi() {
    const { getToken, isLoaded, isSignedIn } = useAuth();
    const queryClient = useQueryClient();

    const getAuthHeaders = useCallback(async () => {
        if (!isLoaded || !isSignedIn) return {};
        const token = await getToken();
        return token ? { Authorization: `Bearer ${token}` } : {};
    }, [getToken, isLoaded, isSignedIn]);

    // GET /users/me
    const fetchUserMe = useCallback(async () => {
        const headers = await getAuthHeaders();
        const res = await apiClient.get('/users/me', { headers });
        return res.data;
    }, [getAuthHeaders]);

    // GET /users/{clerk_id}/portfolios
    const fetchUserPortfolios = useCallback(async (clerkId: string) => {
        const res = await apiClient.get(`/users/${clerkId}/portfolios`);
        return res.data;
    }, []);

    // GET /portfolios
    const fetchPortfolios = useCallback(async (params?: Record<string, any>) => {
        const res = await apiClient.get('/portfolios', { params });
        return res.data;
    }, []);

    // GET /portfolios/{id}
    const fetchPortfolio = useCallback(async (id: string) => {
        const res = await apiClient.get(`/portfolios/${id}`);
        return res.data;
    }, []);

    // GET /leaderboard
    const fetchLeaderboard = useCallback(async (filter: string = "all-time") => {
        const res = await apiClient.get('/leaderboard', { params: { filter } });
        return res.data;
    }, []);

    // POST /portfolios
    const createPortfolio = async (data: any) => {
        const headers = await getAuthHeaders();
        const res = await apiClient.post('/portfolios', data, { headers });
        return res.data;
    };

    // POST /portfolios/{id}/rate
    const ratePortfolio = async ({ id, score }: { id: string; score: number }) => {
        const headers = await getAuthHeaders();
        const res = await apiClient.post(`/portfolios/${id}/rate`, { score }, { headers });
        return res.data;
    };

    // POST /portfolios/{id}/comments
    const commentPortfolio = async ({ id, content }: { id: string; content: string }) => {
        const headers = await getAuthHeaders();
        const res = await apiClient.post(`/portfolios/${id}/comments`, { content }, { headers });
        return res.data;
    };

    return {
        getAuthHeaders,
        fetchUserMe,
        fetchUserPortfolios,
        fetchPortfolios,
        fetchPortfolio,
        fetchLeaderboard,
        createPortfolio,
        ratePortfolio,
        commentPortfolio,
        queryClient,
    };
}
