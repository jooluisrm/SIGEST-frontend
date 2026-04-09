const buildResourceKeys = (resource: string) => ({
  all: [resource] as const,
  lists: () => [resource, "list"] as const,
  list: (url?: string | null) => [resource, "list", url ?? null] as const,
  details: () => [resource, "detail"] as const,
  detail: (id: number) => [resource, "detail", id] as const,
  searches: () => [resource, "search"] as const,
  search: (term: string) => [resource, "search", term] as const,
});

export const queryKeys = {
  alunos: buildResourceKeys("alunos"),
  cursos: buildResourceKeys("cursos"),
  disciplinas: buildResourceKeys("disciplinas"),
  periodos: {
    ...buildResourceKeys("periodos"),
    byCourse: (courseId: number) => ["periodos", "course", courseId] as const,
  },
  professores: buildResourceKeys("professores"),
  turmas: {
    ...buildResourceKeys("turmas"),
    byPeriod: (periodId: number) => ["turmas", "period", periodId] as const,
  },
  usuarios: buildResourceKeys("usuarios"),
  status: ["status"] as const,
  frequencias: ["frequencias"] as const,
  ibge: {
    states: ["ibge", "states"] as const,
    cities: (uf?: string) => ["ibge", "cities", uf ?? null] as const,
  },
};
