// app/api/services.ts

import { getAlunos } from "@/api/aluno/alunoServices";
import { getProfessores } from "@/api/professor/professorServices";
import { PageTypeCentral } from "@/types/routerType"; // seu tipo
import { getDisciplina } from "./disciplina/disciplinaServices";
import { getUsuarios } from "./usuario/usuarioServices";

// O tipo da função agora inclui um parâmetro de string opcional
export const dataFetchers: Record<PageTypeCentral, (url?: string) => Promise<any>> = {
    professor: getProfessores,
    aluno: getAlunos,
    usuario: getUsuarios,
    disciplina: getDisciplina
};