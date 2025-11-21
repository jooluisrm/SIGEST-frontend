import axiosInstance from "@/lib/axiosInstance";
import { GetDisciplinasResponse, TypeDisciplinaCadastro } from "@/types/disciplina";
import { toast } from "sonner";

export const getDisciplina = async (url: string = 'api/disciplinas'): Promise<GetDisciplinasResponse> => {
    const response = await axiosInstance.get<GetDisciplinasResponse>(url);
    return response.data;
};

export const postCadastrarDisciplina = async (data: TypeDisciplinaCadastro) => {
    try {
        const response = await axiosInstance.post('api/disciplinas', data);
        toast.success(response.data.mensagem || "Disciplina cadastrada com sucesso!");
        return response.data;
    } catch (error: any) {
        console.log(error.response?.data?.message);
        toast.error(error.response?.data?.message || "Erro ao cadastrar disciplina");
        throw error;
    }
};

export const putAtualizarDisciplina = async (id: number, data: TypeDisciplinaCadastro) => {
    try {
        const response = await axiosInstance.put(`api/disciplinas/${id}`, data);
        toast.success(response.data.mensagem || "Disciplina atualizada com sucesso!");
        return response.data;
    } catch (error: any) {
        console.log(error.response?.data?.message);
        toast.error(error.response?.data?.message || "Erro ao atualizar disciplina");
        throw error;
    }
};

export const deleteDisciplina = async (id: number) => {
    const response = await axiosInstance.delete(`api/disciplinas/${id}`);
    return response.data;
}