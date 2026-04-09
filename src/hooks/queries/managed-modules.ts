import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAlunoById,
  listAlunos,
  removeAluno,
  searchAlunos,
} from "@/api/aluno/alunoServices";
import {
  getCursoById,
  listCursos,
  removeCurso,
  searchCursos,
} from "@/api/curso/cursoServices";
import {
  getDisciplinaById,
  listDisciplinas,
  removeDisciplina,
  searchDisciplinas,
} from "@/api/disciplina/disciplinaServices";
import {
  getPeriodoById,
  getPeriodosByCurso,
  listPeriodos,
} from "@/api/periodo/periodoServices";
import {
  getProfessorById,
  listProfessores,
  removeProfessor,
  searchProfessores,
} from "@/api/professor/professorServices";
import {
  getTurmaById,
  getTurmasByPeriodo,
  listTurmas,
  removeTurma,
} from "@/api/turma/turmaServices";
import {
  getUsuarioById,
  listUsuarios,
  removeUsuario,
  searchUsuarios,
} from "@/api/usuario/usuarioServices";
import { NormalizedListResponse } from "@/types/api";
import { PageTypeCentral } from "@/types/routerType";
import { queryKeys } from "./query-keys";

type ListResponse = NormalizedListResponse<unknown>;

const emptyListResponse: ListResponse = {
  data: [],
  links: null,
  meta: null,
  status: true,
  code: 200,
  message: "",
};

const listConfigs = {
  aluno: {
    queryKey: queryKeys.alunos.list,
    queryFn: listAlunos,
  },
  professor: {
    queryKey: queryKeys.professores.list,
    queryFn: listProfessores,
  },
  usuario: {
    queryKey: queryKeys.usuarios.list,
    queryFn: listUsuarios,
  },
  disciplina: {
    queryKey: queryKeys.disciplinas.list,
    queryFn: listDisciplinas,
  },
  curso: {
    queryKey: queryKeys.cursos.list,
    queryFn: listCursos,
  },
  periodo: {
    queryKey: queryKeys.periodos.list,
    queryFn: listPeriodos,
  },
  turma: {
    queryKey: queryKeys.turmas.list,
    queryFn: listTurmas,
  },
} satisfies Record<
  PageTypeCentral,
  {
    queryKey: (url?: string | null) => readonly unknown[];
    queryFn: (url?: string) => Promise<ListResponse>;
  }
>;

const detailConfigs = {
  aluno: {
    queryKey: queryKeys.alunos.detail,
    queryFn: getAlunoById,
  },
  professor: {
    queryKey: queryKeys.professores.detail,
    queryFn: getProfessorById,
  },
  usuario: {
    queryKey: queryKeys.usuarios.detail,
    queryFn: getUsuarioById,
  },
  disciplina: {
    queryKey: queryKeys.disciplinas.detail,
    queryFn: getDisciplinaById,
  },
  curso: {
    queryKey: queryKeys.cursos.detail,
    queryFn: getCursoById,
  },
  periodo: {
    queryKey: queryKeys.periodos.detail,
    queryFn: getPeriodoById,
  },
  turma: {
    queryKey: queryKeys.turmas.detail,
    queryFn: getTurmaById,
  },
} satisfies Record<
  PageTypeCentral,
  {
    queryKey: (id: number) => readonly unknown[];
    queryFn: (id: number) => Promise<unknown>;
  }
>;

const searchConfigs = {
  aluno: {
    queryKey: queryKeys.alunos.search,
    queryFn: searchAlunos,
  },
  professor: {
    queryKey: queryKeys.professores.search,
    queryFn: searchProfessores,
  },
  usuario: {
    queryKey: queryKeys.usuarios.search,
    queryFn: searchUsuarios,
  },
  disciplina: {
    queryKey: queryKeys.disciplinas.search,
    queryFn: searchDisciplinas,
  },
  curso: {
    queryKey: queryKeys.cursos.search,
    queryFn: searchCursos,
  },
} as const satisfies Partial<
  Record<
    PageTypeCentral,
    {
      queryKey: (term: string) => readonly unknown[];
      queryFn: (term: string) => Promise<ListResponse>;
    }
  >
>;

const relatedConfigs = {
  curso: {
    queryKey: (id: number) => queryKeys.periodos.byCourse(id),
    queryFn: getPeriodosByCurso,
  },
  periodo: {
    queryKey: (id: number) => queryKeys.turmas.byPeriod(id),
    queryFn: getTurmasByPeriodo,
  },
} as const satisfies Partial<
  Record<
    PageTypeCentral,
    {
      queryKey: (id: number) => readonly unknown[];
      queryFn: (id: number) => Promise<ListResponse>;
    }
  >
>;

const deleteConfigs = {
  aluno: {
    mutationFn: removeAluno,
    invalidateKey: queryKeys.alunos.all,
  },
  professor: {
    mutationFn: removeProfessor,
    invalidateKey: queryKeys.professores.all,
  },
  usuario: {
    mutationFn: removeUsuario,
    invalidateKey: queryKeys.usuarios.all,
  },
  disciplina: {
    mutationFn: removeDisciplina,
    invalidateKey: queryKeys.disciplinas.all,
  },
  curso: {
    mutationFn: removeCurso,
    invalidateKey: queryKeys.cursos.all,
  },
  turma: {
    mutationFn: removeTurma,
    invalidateKey: queryKeys.turmas.all,
  },
} as const;

export const useManagedModuleListQuery = (
  type: PageTypeCentral,
  url?: string | null
) => {
  const config = listConfigs[type];

  return useQuery<ListResponse>({
    queryKey: config.queryKey(url),
    queryFn: () => config.queryFn(url ?? undefined),
  });
};

export const useManagedModuleDetailQuery = (
  type: PageTypeCentral,
  id: number,
  enabled = true
) => {
  const config = detailConfigs[type];

  return useQuery<unknown>({
    queryKey: config.queryKey(id),
    queryFn: () => config.queryFn(id),
    enabled,
  });
};

export const useManagedModuleSearchQuery = (
  type: PageTypeCentral,
  term: string,
  enabled = true
) => {
  const config =
    type in searchConfigs ? searchConfigs[type as keyof typeof searchConfigs] : undefined;

  return useQuery<ListResponse>({
    queryKey: config ? config.queryKey(term) : ["search-disabled", type, term],
    queryFn: () => {
      if (!config) {
        throw new Error(`Search not available for "${type}".`);
      }

      return config.queryFn(term);
    },
    enabled: !!config && enabled && !!term.trim(),
  });
};

export const useManagedRelatedQuery = (
  type: PageTypeCentral,
  id: number,
  enabled = true
) => {
  const config =
    type in relatedConfigs ? relatedConfigs[type as keyof typeof relatedConfigs] : undefined;

  return useQuery<ListResponse>({
    queryKey: config ? config.queryKey(id) : ["related-disabled", type, id],
    queryFn: () => (config ? config.queryFn(id) : Promise.resolve(emptyListResponse)),
    enabled: !!config && enabled,
  });
};

export const useManagedDeleteMutation = (type: PageTypeCentral) => {
  const queryClient = useQueryClient();
  const config =
    type in deleteConfigs ? deleteConfigs[type as keyof typeof deleteConfigs] : undefined;

  return useMutation({
    mutationFn: (id: number) => {
      if (!config) {
        throw new Error(`Delete not available for "${type}".`);
      }

      return config.mutationFn(id);
    },
    onSuccess: async () => {
      if (config) {
        await queryClient.invalidateQueries({ queryKey: config.invalidateKey });
      }
    },
  });
};
