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
        const res = await apiClient.get('/auth/me', { headers });
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
        // Handle paginated response structure from backend
        return res.data?.portfolios || res.data;
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

    // POST /interactions/like/{id}
    const likePortfolio = async (id: string) => {
        const headers = getAuthHeaders();
        const res = await apiClient.post(`/interactions/like/${id}`, {}, { headers });
        return res.data;
    };

    // POST /interactions/bookmark/{id}
    const bookmarkPortfolio = async (id: string) => {
        const headers = getAuthHeaders();
        const res = await apiClient.post(`/interactions/bookmark/${id}`, {}, { headers });
        return res.data;
    };

    // GET /interactions/comment/{id}
    const fetchComments = async (id: string) => {
        const res = await apiClient.get(`/interactions/comment/${id}`);
        return res.data;
    };

    // POST /interactions/rate/{id}
    const ratePortfolio = async ({ id, score }: { id: string; score: number }) => {
        const headers = getAuthHeaders();
        const res = await apiClient.post(`/interactions/rate/${id}`, { score }, { headers });
        return res.data;
    };

    // POST /interactions/comment/{id}
    const commentPortfolio = async ({ id, content }: { id: string; content: string }) => {
        const headers = getAuthHeaders();
        const res = await apiClient.post(`/interactions/comment/${id}`, { content }, { headers });
        return res.data;
    };

    // PATCH /portfolios/{id}
    const updatePortfolio = async ({ id, data }: { id: string; data: any }) => {
        const headers = getAuthHeaders();
        const res = await apiClient.patch(`/portfolios/${id}`, data, { headers });
        return res.data;
    };

    // DELETE /portfolios/{id}
    const deletePortfolio = async (id: string) => {
        const headers = getAuthHeaders();
        const res = await apiClient.delete(`/portfolios/${id}`, { headers });
        return res.data;
    };

    // GET /interactions/bookmarks
    const fetchBookmarks = async () => {
        const headers = getAuthHeaders();
        const res = await apiClient.get('/interactions/bookmarks', { headers });
        return res.data;
    };

    // GET /portfolios/explore
    const fetchExploreFeed = async (page: number = 1) => {
        const headers = getAuthHeaders();
        const res = await apiClient.get('/portfolios/explore', { params: { page }, headers });
        return res.data;
    };

    // POST /portfolios/{id}/view
    const trackView = async (id: string) => {
        const headers = getAuthHeaders();
        const res = await apiClient.post(`/portfolios/${id}/view`, {}, { headers });
        return res.data;
    };

    return {
        getAuthHeaders,
        fetchUserMe,
        fetchUserPortfolios,
        fetchPortfolios,
        fetchExploreFeed,
        fetchPortfolio,
        fetchLeaderboard,
        createPortfolio,
        ratePortfolio,
        commentPortfolio,
        likePortfolio,
        bookmarkPortfolio,
        fetchBookmarks,
        fetchComments,
        trackView,
        updatePortfolio,
        deletePortfolio,
        queryClient,
    };
}
