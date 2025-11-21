import axiosInstance from "@/lib/axiosInstance";
import { GetServidoresResponse, TypeServidorCadastro } from "@/types/servidor";
import { toast } from "sonner";

export const getUsuarios = async (url: string = 'api/servidors'): Promise<GetServidoresResponse> => {
    const response = await axiosInstance.get<GetServidoresResponse>(url);
    return response.data;
}

export const postCadastrarUsuario = async (data: TypeServidorCadastro) => {
    try {
        const response = await axiosInstance.post('api/servidors', data);
        toast.success(response.data.mensagem || "Usuário cadastrado com sucesso!");
        return response.data;
    } catch (error: any) {
        console.log(error.response?.data?.message);
        toast.error(error.response?.data?.message || "Erro ao cadastrar usuário");
        throw error;
    }
}

export const putAtualizarUsuario = async (id: number, data: TypeServidorCadastro) => {
    try {
        const response = await axiosInstance.put(`api/servidors/${id}`, data);
        toast.success(response.data.mensagem || "Usuário atualizado com sucesso!");
        return response.data;
    } catch (error: any) {
        console.log(error.response?.data?.message);
        toast.error(error.response?.data?.message || "Erro ao atualizar usuário");
        throw error;
    }
}

export const deleteUsuario = async (id: number) => {
    const response = await axiosInstance.delete(`api/servidors/${id}`);
    return response.data;
}