import { ApiLinks, ApiMeta } from "./getRequestType";

export type Aluno = {
    user_data: {
        id_user: number;
        name: string;
        cpf: string;
        rg: string;
        data_nascimento: string; // formato ISO "YYYY-MM-DD"
        nome_pai: string;
        nome_mae: string;
        genero: string;
        deficiencia: string;
        logradouro: string;
        numero: string;
        bairro: string;
        complemento: string;
        cidade: string;
        estado: string;
        telefone: string;
        celular: string;
        email: string;
        matricula: string;
        turma: string;
    };
};

export type GetAlunosResponse = {
    data: Aluno[];
    links: ApiLinks;
    meta: ApiMeta;
};

export type TypeAlunoCadastro = {
    name: string;
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
    password?: string;  // Opcional para permitir atualização sem senha
    matricula: string;
    turma: string;
};

