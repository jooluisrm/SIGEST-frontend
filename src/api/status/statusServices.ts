import axiosInstance from "@/lib/axiosInstance";
import { ApiStatus } from "@/types/status";

export const getStatus = async () => {
  const response = await axiosInstance.get<ApiStatus>("status");
  return response.data;
};
