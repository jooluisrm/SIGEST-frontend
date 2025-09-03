import axiosInstance from "@/lib/axiosInstance";
import { TypeProfessorCadastro } from "@/types/professor";
import { toast } from "sonner"

export const getProfessores = async () => {
    const response = await axiosInstance.get('api/professors');
    console.log(response.data);
    return response.data.data;
};

export const postCadastrarProfessor = async (data: TypeProfessorCadastro) => {
    try {
        const response = await axiosInstance.post('api/professors', data);
        toast.success(response.data.mensagem);
        return response.data;
    } catch (error: any) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
    }
};