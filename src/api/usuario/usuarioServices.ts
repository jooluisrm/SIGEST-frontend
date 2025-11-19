import axiosInstance from "@/lib/axiosInstance";
import { GetServidoresResponse } from "@/types/servidor";

export const getUsuarios = async (url: string = 'api/servidors'): Promise<GetServidoresResponse> => {
    const response = await axiosInstance.get<GetServidoresResponse>(url);
    return response.data;
}
