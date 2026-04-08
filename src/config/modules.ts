import { PageTypeCentral, ROUTE_TYPES } from "@/types/routerType";

export type ModuleRole = "admin" | "servidor" | "professor";

export type ModuleCapabilities = {
  manage: boolean;
  create: boolean;
  search: boolean;
  edit: boolean;
  delete: boolean;
  detail: boolean;
};

export type ModuleMeta = {
  slug: PageTypeCentral;
  label: string;
  pluralLabel: string;
  roles: ModuleRole[];
  capabilities: ModuleCapabilities;
};

export const MODULES: readonly ModuleMeta[] = [
  {
    slug: "usuario",
    label: "Usuário",
    pluralLabel: "Usuários",
    roles: ["admin", "servidor"],
    capabilities: {
      manage: true,
      create: true,
      search: true,
      edit: true,
      delete: true,
      detail: true,
    },
  },
  {
    slug: "professor",
    label: "Professor",
    pluralLabel: "Professores",
    roles: ["admin", "servidor"],
    capabilities: {
      manage: true,
      create: true,
      search: true,
      edit: true,
      delete: true,
      detail: true,
    },
  },
  {
    slug: "aluno",
    label: "Aluno",
    pluralLabel: "Alunos",
    roles: ["admin", "servidor"],
    capabilities: {
      manage: true,
      create: true,
      search: true,
      edit: true,
      delete: true,
      detail: true,
    },
  },
  {
    slug: "disciplina",
    label: "Disciplina",
    pluralLabel: "Disciplinas",
    roles: ["admin", "servidor"],
    capabilities: {
      manage: true,
      create: true,
      search: true,
      edit: true,
      delete: true,
      detail: true,
    },
  },
  {
    slug: "curso",
    label: "Curso",
    pluralLabel: "Cursos",
    roles: ["admin", "servidor"],
    capabilities: {
      manage: true,
      create: true,
      search: true,
      edit: true,
      delete: true,
      detail: true,
    },
  },
  {
    slug: "periodo",
    label: "Período",
    pluralLabel: "Períodos",
    roles: ["admin", "servidor"],
    capabilities: {
      manage: true,
      create: false,
      search: false,
      edit: false,
      delete: false,
      detail: true,
    },
  },
  {
    slug: "turma",
    label: "Turma",
    pluralLabel: "Turmas",
    roles: ["admin", "servidor"],
    capabilities: {
      manage: true,
      create: true,
      search: false,
      edit: false,
      delete: true,
      detail: true,
    },
  },
] as const satisfies readonly ModuleMeta[];

export const MODULES_BY_SLUG = Object.fromEntries(
  MODULES.map((module) => [module.slug, module])
) as Record<PageTypeCentral, ModuleMeta>;

export const MANAGE_ROUTE_TYPES = MODULES.filter(
  (module) => module.capabilities.manage
).map((module) => module.slug) as PageTypeCentral[];

export const REGISTER_ROUTE_TYPES = MODULES.filter(
  (module) => module.capabilities.create
).map((module) => module.slug) as PageTypeCentral[];

export const MODULE_LABELS = Object.fromEntries(
  MODULES.map((module) => [module.slug, module.pluralLabel])
) as Record<PageTypeCentral, string>;

export const ALL_ROUTE_TYPES = [...ROUTE_TYPES];

export const hasModuleAccess = (
  roles: string[],
  module: ModuleMeta
) => roles.some((role) => module.roles.includes(role as ModuleRole));
