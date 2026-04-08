import { getAlunos, searchAlunos, getAlunoById } from "@/api/aluno/alunoServices";
import { getCursos, getCursoById, searchCursos } from "@/api/curso/cursoServices";
import {
  getDisciplinas,
  getDisciplinaById,
  searchDisciplinas,
} from "@/api/disciplina/disciplinaServices";
import {
  getPeriodos,
  getPeriodoById,
} from "@/api/periodo/periodoServices";
import {
  getProfessores,
  getProfessorById,
  searchProfessores,
} from "@/api/professor/professorServices";
import { getTurmaById, getTurmas } from "@/api/turma/turmaServices";
import { getUsuarioById, getUsuarios, searchUsuarios } from "@/api/usuario/usuarioServices";
import { PageTypeCentral } from "@/types/routerType";
import { NormalizedListResponse } from "@/types/api";

export type ListFetcher = (
  url?: string
) => Promise<NormalizedListResponse<unknown>>;

export type SearchFetcher = (
  value: string
) => Promise<NormalizedListResponse<unknown>>;

export type DetailFetcher = (id: number) => Promise<unknown>;

export const dataFetchers: Record<PageTypeCentral, ListFetcher> = {
  professor: getProfessores as ListFetcher,
  aluno: getAlunos as ListFetcher,
  usuario: getUsuarios as ListFetcher,
  disciplina: getDisciplinas as ListFetcher,
  curso: getCursos as ListFetcher,
  periodo: getPeriodos as ListFetcher,
  turma: getTurmas as ListFetcher,
};

export const searchFetchers: Partial<Record<PageTypeCentral, SearchFetcher>> = {
  professor: searchProfessores as SearchFetcher,
  aluno: searchAlunos as SearchFetcher,
  usuario: searchUsuarios as SearchFetcher,
  disciplina: searchDisciplinas as SearchFetcher,
  curso: searchCursos as SearchFetcher,
};

export const detailFetchers: Record<PageTypeCentral, DetailFetcher> = {
  professor: getProfessorById,
  aluno: getAlunoById,
  usuario: getUsuarioById,
  disciplina: getDisciplinaById,
  curso: getCursoById,
  periodo: getPeriodoById,
  turma: getTurmaById,
};
