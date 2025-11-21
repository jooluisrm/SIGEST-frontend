import { ApiLinks, ApiMeta } from "./getRequestType";

export type TypeProfessorCadastro = {
    name: string;  // era "nome"
    data_nascimento: string;
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
    codigo_disciplina: string;  // era "codigoDisciplina"
    password: string;  // era "senha"
    // confirmarSenha removido do tipo (não vai no payload)
}

export type GetProfessoresResponse = {
    data: TypeProfessorCadastro[];
    links: ApiLinks;
    meta: ApiMeta;
};