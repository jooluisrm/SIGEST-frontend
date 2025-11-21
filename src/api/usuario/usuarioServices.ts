import axiosInstance from "@/lib/axiosInstance";
import { GetServidoresResponse, TypeServidorCadastro } from "@/types/servidor";

export const getUsuarios = async (url: string = 'api/servidors'): Promise<GetServidoresResponse> => {
    const response = await axiosInstance.get<GetServidoresResponse>(url);
    return response.data;
}

export const postCadastrarUsuario = async (data: TypeServidorCadastro) => {
    const response = await axiosInstance.post('api/servidors', data);
    return response.data;
}

export const deleteUsuario = async (id: number) => {
    const response = await axiosInstance.delete(`api/servidors/${id}`);
    return response.data;
}