import axiosInstance from "@/lib/axiosInstance";
import { ApiStatus } from "@/types/status";

export const getApiStatus = async () => {
  const response = await axiosInstance.get<ApiStatus>("api/status");
  return response.data;
};
