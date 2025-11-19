import axiosInstance from "@/lib/axiosInstance";
import { GetAlunosResponse } from "@/types/aluno";

export const getAlunos = async (url: string = 'api/alunos'): Promise<GetAlunosResponse> => {
    const response = await axiosInstance.get<GetAlunosResponse>(url);
    return response.data;
}
