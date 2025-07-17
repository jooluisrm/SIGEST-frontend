import axiosInstance from "@/lib/axiosInstance";

export const getProfessores = async () => {
    const response = await axiosInstance.get('api/professors');
    console.log(response.data);
    return response.data;
};

export type TypeProfessorCadastro = {
    nome: string;
    data_nascimento: string; // formato ISO ou "YYYY-MM-DD"
    cpf: string;
    rg: string;
    genero: string;
    nome_pai: string;
    nome_mae: string;
    deficiencia?: string;
    logradouro: string;
    numero: string;
    bairro: string;
    complemento?: string;
    cidade: string;
    estado: string;
    telefone: string;
    celular: string;
    email: string;
    matricula_adpm?: string;
}

export const postCadastrarProfessor = async (data: TypeProfessorCadastro) => {
    const response = await axiosInstance.post('api/professors', data);
    return response.data;
};