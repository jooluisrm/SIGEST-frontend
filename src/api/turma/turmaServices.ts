import axiosInstance from "@/lib/axiosInstance";
import { GetTurmasResponse, TypeTurmaCadastro } from "@/types/turma";
import { toast } from "sonner";

// GET 
export const getTurmas = async (url: string = "api/classrooms"): Promise<GetTurmasResponse> => {
    const response = await axiosInstance.get<GetTurmasResponse>(url);
    return response.data;
};

// POST
export const postCadastrarTurma = async (data: TypeTurmaCadastro) => {
    try {
        const response = await axiosInstance.post("api/classrooms", data);
        toast.success(response.data.mensagem || "Turma cadastrada com sucesso!");
        return response.data;
    } catch (error: any) {
        console.log(error.response?.data?.message);
        toast.error(error.response?.data?.message || "Erro ao cadastrar turma");
        throw error;
    }
};

// PUT 
export const putAtualizarTurma = async (id: number, data: TypeTurmaCadastro) => {
    try {
        const response = await axiosInstance.put(`api/classrooms/${id}`, data);
        toast.success(response.data.mensagem || "Turma atualizada com sucesso!");
        return response.data;
    } catch (error: any) {
        console.log(error.response?.data?.message);
        toast.error(error.response?.data?.message || "Erro ao atualizar turma");
        throw error;
    }
};

// DELETE
export const deleteTurma = async (id: number) => {
    const response = await axiosInstance.delete(`api/classrooms/${id}`);
    return response.data;
};
