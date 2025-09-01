import axiosInstance from "@/lib/axiosInstance";
import { TypeProfessorCadastro } from "@/types/professor";

export const getProfessores = async () => {
    const response = await axiosInstance.get('api/professors');
    console.log(response.data);
    return response.data.data;
};

export const postCadastrarProfessor = async (data: TypeProfessorCadastro) => {
    const response = await axiosInstance.post('api/professors', data);
    return response.data;
};