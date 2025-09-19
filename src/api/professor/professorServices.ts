import axiosInstance from "@/lib/axiosInstance";
import { GetProfessoresResponse, TypeProfessorCadastro } from "@/types/professor";
import { toast } from "sonner"

export const getProfessores = async (url: string = 'api/professors'): Promise<GetProfessoresResponse> => {
    // Agora o get usa a URL recebida. O axios é inteligente: se a URL for completa 
    // (http://...), ele a usará diretamente.
    const response = await axiosInstance.get<GetProfessoresResponse>(url);
    return response.data;
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