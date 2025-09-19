import { ApiLinks, ApiMeta } from "./getRequestType";

export type TypeProfessorCadastro = {
    id: number;
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

export type GetProfessoresResponse = {
    data: TypeProfessorCadastro[];
    links: ApiLinks;
    meta: ApiMeta;
};