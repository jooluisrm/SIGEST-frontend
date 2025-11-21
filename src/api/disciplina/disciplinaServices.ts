import axiosInstance from "@/lib/axiosInstance";
import { GetDisciplinasResponse, TypeDisciplinaCadastro } from "@/types/disciplina";

export const getDisciplina = async (url: string = 'api/disciplinas'): Promise<GetDisciplinasResponse> => {
    const response = await axiosInstance.get<GetDisciplinasResponse>(url);
    return response.data;
};

export const postCadastrarDisciplina = async (data: TypeDisciplinaCadastro) => {
    const response = await axiosInstance.post('api/disciplinas', data);
    return response.data;
};