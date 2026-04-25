import axios from "axios";
import { useAuthStore } from "@/app/auth/lib/useAuthstore";

const getBaseURL = () => {
    const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    return url.endsWith('/') ? url : `${url}/`;
};

export const apiClient = axios.create({
    baseURL: getBaseURL(),
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// Request interceptor to add token
apiClient.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;
        if (token && token !== "cookie-based") {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

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
