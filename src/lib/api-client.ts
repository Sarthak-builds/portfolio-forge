import axios from "axios";

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001",
    headers: {
        "Content-Type": "application/json",
    },
});

// Response interceptor to handle standardized backend responses
apiClient.interceptors.response.use(
    (response) => {
        // If the backend uses { success, data, message }, return .data
        if (response.data && response.data.success === true && 'data' in response.data) {
            return {
                ...response,
                data: response.data.data
            };
        }
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);
