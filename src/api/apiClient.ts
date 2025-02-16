import axios, { InternalAxiosRequestConfig, AxiosHeaders } from "axios";
import { redirect } from "next/navigation";

const apiClient = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}api`,
    withCredentials: true,
});

export const getAuthToken = (): string => {
    if (typeof window !== "undefined") {
        return window.localStorage.getItem("accessToken") ?? "";
    }
    return "";
};

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const isAuthRequest =
        config.url &&
        (config.url.includes("signin") ||
            config.url.includes("signup") ||
            config.url.includes("forget_password") ||
            config.url.includes("reset_password") ||
            config.url.includes("verify_email"));

    if (!isAuthRequest) {
        if (!config.headers) {
            config.headers = new AxiosHeaders();
        }

        config.headers.set("Authorization", `token ${getAuthToken()}`);
    }

    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (!error.response) return Promise.reject(error);

        const { response } = error;
        const token = getAuthToken();

        if (response.status === 401 && token) {
            redirect("/login");
        }

        if (response.status === 400) {
            return response;
        }

        return Promise.reject(error);
    }
);

export { apiClient };
