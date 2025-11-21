import axiosInstance from "@/lib/axiosInstance";
import { GetAlunosResponse, TypeAlunoCadastro } from "@/types/aluno";
import { toast } from "sonner";

export const getAlunos = async (url: string = 'api/alunos'): Promise<GetAlunosResponse> => {
    const response = await axiosInstance.get<GetAlunosResponse>(url);
    return response.data;
}

export const postCadastrarAluno = async (data: TypeAlunoCadastro) => {
    try {
        const response = await axiosInstance.post('api/alunos', data);
        toast.success(response.data.mensagem || "Aluno cadastrado com sucesso!");
        return response.data;
    } catch (error: any) {
        console.log(error.response?.data?.message);
        toast.error(error.response?.data?.message || "Erro ao cadastrar aluno");
        throw error;
    }
}

export const putAtualizarAluno = async (id: number, data: TypeAlunoCadastro) => {
    try {
        const response = await axiosInstance.put(`api/alunos/${id}`, data);
        toast.success(response.data.mensagem || "Aluno atualizado com sucesso!");
        return response.data;
    } catch (error: any) {
        console.log(error.response?.data?.message);
        toast.error(error.response?.data?.message || "Erro ao atualizar aluno");
        throw error;
    }
}

export const deleteAluno = async (id: number) => {
    const response = await axiosInstance.delete(`api/alunos/${id}`);
    return response.data;
}
