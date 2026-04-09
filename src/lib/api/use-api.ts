import { apiClient } from "@/lib/api-client";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/app/auth/lib/useAuthstore";

export function useApi() {
    const { token, isAuthenticated } = useAuthStore();
    const queryClient = useQueryClient();

    const getAuthHeaders = () => {
        if (!isAuthenticated || !token) return {};
        return { Authorization: `Bearer ${token}` };
    };

    // GET /users/me
    const fetchUserMe = async () => {
        const headers = getAuthHeaders();
        const res = await apiClient.get('/users/me', { headers });
        return res.data;
    };

    // GET /users/{id}/portfolios
    const fetchUserPortfolios = async (userId: string) => {
        const res = await apiClient.get(`/users/${userId}/portfolios`);
        return res.data;
    };

    // GET /portfolios
    const fetchPortfolios = async (params?: Record<string, any>) => {
        const res = await apiClient.get('/portfolios', { params });
        return res.data;
    };

    // GET /portfolios/{id}
    const fetchPortfolio = async (id: string) => {
        const res = await apiClient.get(`/portfolios/${id}`);
        return res.data;
    };

    // GET /leaderboard
    const fetchLeaderboard = async (filter: string = "all-time") => {
        const res = await apiClient.get('/leaderboard', { params: { filter } });
        return res.data;
    };

    // POST /portfolios
    const createPortfolio = async (data: any) => {
        const headers = getAuthHeaders();
        const res = await apiClient.post('/portfolios', data, { headers });
        return res.data;
    };

    // POST /portfolios/{id}/like
    const likePortfolio = async (id: string) => {
        const headers = getAuthHeaders();
        const res = await apiClient.post(`/portfolios/${id}/like`, {}, { headers });
        return res.data;
    };

    // POST /portfolios/{id}/bookmark
    const bookmarkPortfolio = async (id: string) => {
        const headers = getAuthHeaders();
        const res = await apiClient.post(`/portfolios/${id}/bookmark`, {}, { headers });
        return res.data;
    };

    // GET /portfolios/{id}/comments
    const fetchComments = async (id: string) => {
        const res = await apiClient.get(`/portfolios/${id}/comments`);
        return res.data;
    };

    // POST /portfolios/{id}/rate
    const ratePortfolio = async ({ id, score }: { id: string; score: number }) => {
        const headers = getAuthHeaders();
        const res = await apiClient.post(`/portfolios/${id}/rate`, { score }, { headers });
        return res.data;
    };

    // POST /portfolios/{id}/comments
    const commentPortfolio = async ({ id, content }: { id: string; content: string }) => {
        const headers = getAuthHeaders();
        const res = await apiClient.post(`/portfolios/${id}/comments`, { content }, { headers });
        return res.data;
    };

    // PATCH /portfolios/{id}
    const updatePortfolio = async ({ id, data }: { id: string; data: any }) => {
        const headers = getAuthHeaders();
        const res = await apiClient.patch(`/portfolios/${id}`, data, { headers });
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
        likePortfolio,
        bookmarkPortfolio,
        fetchComments,
        updatePortfolio,
        queryClient,
    };
}
