// app/api/services.ts

import { getAlunos } from "@/api/aluno/alunoServices";
import { getProfessores } from "@/api/professor/professorServices";
import { getServidores } from "@/api/servidor/servidorServices"; 
import { PageTypeCentral } from "@/types/routerType"; // seu tipo

// O mapa que associa o tipo da rota à função de busca de dados
export const dataFetchers: Record<PageTypeCentral, () => Promise<any>> = {
    professor: getProfessores,
    aluno: getAlunos,
    servidor: getServidores,
};