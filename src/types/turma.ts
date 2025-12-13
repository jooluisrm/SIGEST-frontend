import { ApiLinks, ApiMeta } from "./getRequestType";

export type Turma = {
    id: number;
    period_id: number;
    name: string;
    max_students: number; 
    shift: string; 
    created_at: string | null;
    updated_at: string | null;
    status: string; 
};

export type GetTurmasResponse = {
    data: Turma[];
    links: ApiLinks;
    meta: ApiMeta;
};


export type TypeTurmaCadastro = {
    period_id: number;
    name: string;
    max_students: number;
    shift: string; 
};