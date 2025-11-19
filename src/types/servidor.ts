import { ApiLinks, ApiMeta } from "./getRequestType";

export type Servidor = {
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
    };
    servidor_data: {
        id_servidor: number;
        cargo: string;
        setor: string;
    };
};

export type GetServidoresResponse = {
    data: Servidor[];
    links: ApiLinks;
    meta: ApiMeta;
};

