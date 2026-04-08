export const ROUTE_TYPES = [
  "aluno",
  "professor",
  "disciplina",
  "usuario",
  "curso",
  "periodo",
  "turma",
] as const;

export type PageTypeCentral = (typeof ROUTE_TYPES)[number];
