// routerType.ts
export const ROUTE_TYPES = ["aluno", "professor", "servidor"] as const;

// Deriva o tipo automaticamente
export type PageTypeCentral = (typeof ROUTE_TYPES)[number];

