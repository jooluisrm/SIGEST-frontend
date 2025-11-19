import axiosInstance from "@/lib/axiosInstance";
import { GetDisciplinasResponse } from "@/types/disciplina";

export const getDisciplina = async (url: string = 'api/disciplinas'): Promise<GetDisciplinasResponse> => {
    const response = await axiosInstance.get<GetDisciplinasResponse>(url);
    return response.data;
};