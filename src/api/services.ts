// app/api/services.ts

import { getAlunos } from "@/api/aluno/alunoServices";
import { getProfessores } from "@/api/professor/professorServices";
import { getServidores } from "@/api/servidor/servidorServices"; 
import { PageTypeCentral } from "@/types/routerType"; // seu tipo
import { getDisciplina } from "./disciplina/disciplinaServices";

// O tipo da função agora inclui um parâmetro de string opcional
export const dataFetchers: Record<PageTypeCentral, (url?: string) => Promise<any>> = {
    professor: getProfessores,
    aluno: getAlunos,
    servidor: getServidores,
    disciplina: getDisciplina
};