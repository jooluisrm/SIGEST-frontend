import { ApiLinks, ApiMeta } from "./getRequestType";

export type Disciplina = {
    id: number;
    nome: string;
    sigla: string;
    area_conhecimento: string;
    bibliografia: string;
    carga_horaria: string;
    created_at: string | null;
    data_encerramento: string; // formato ISO "YYYY-MM-DD"
    data_inicio: string; // formato ISO "YYYY-MM-DD"
    ementa: string;
    unidade: string;
    updated_at: string | null;
};

export type GetDisciplinasResponse = {
    data: Disciplina[];
    links: ApiLinks;
    meta: ApiMeta;
};

export type TypeDisciplinaCadastro = {
    nome: string;
    sigla: string;
    area_conhecimento: string;
    unidade: string;
    carga_horaria: string;
    data_inicio: string; // formato "YYYY-MM-DD"
    data_encerramento: string; // formato "YYYY-MM-DD"
    ementa: string;
    bibliografia: string;
};

