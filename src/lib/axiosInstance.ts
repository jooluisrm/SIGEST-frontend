import axios, { InternalAxiosRequestConfig } from "axios";
import {
  clearStoredUser,
  getStoredToken,
  getStoredTokenType,
} from "@/lib/auth-storage";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL não está definida.");
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = getStoredToken();
      const tokenType = getStoredTokenType() || "Bearer";

      if (token) {
        config.headers.Authorization = `${tokenType} ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      clearStoredUser();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
