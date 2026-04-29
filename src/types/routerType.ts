export const ROUTE_TYPES = [
  "aluno",
  "professor",
  "disciplina",
  "usuario",
  "curso",
  "periodo",
  "turma",
  "avaliacao",
] as const;

export type PageTypeCentral = (typeof ROUTE_TYPES)[number];
