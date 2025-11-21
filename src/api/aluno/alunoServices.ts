import axiosInstance from "@/lib/axiosInstance";
import { GetAlunosResponse, TypeAlunoCadastro } from "@/types/aluno";

export const getAlunos = async (url: string = 'api/alunos'): Promise<GetAlunosResponse> => {
    const response = await axiosInstance.get<GetAlunosResponse>(url);
    return response.data;
}

export const postCadastrarAluno = async (data: TypeAlunoCadastro) => {
    const response = await axiosInstance.post('api/alunos', data);
    return response.data;
}

export const deleteAluno = async (id: number) => {
    const response = await axiosInstance.delete(`api/alunos/${id}`);
    return response.data;
}
