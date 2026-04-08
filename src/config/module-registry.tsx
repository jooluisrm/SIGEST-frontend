"use client";

import React from "react";
import { deleteAluno } from "@/api/aluno/alunoServices";
import { deleteCurso } from "@/api/curso/cursoServices";
import { deleteDisciplina } from "@/api/disciplina/disciplinaServices";
import { getPeriodosByCurso } from "@/api/periodo/periodoServices";
import { deleteProfessor } from "@/api/professor/professorServices";
import { getTurmasByPeriodo, deleteTurma } from "@/api/turma/turmaServices";
import { deleteUsuario } from "@/api/usuario/usuarioServices";
import { FormAluno } from "@/components/cadastrar/formularios/formAluno";
import { FormCurso } from "@/components/cadastrar/formularios/formCurso";
import { FormDisciplina } from "@/components/cadastrar/formularios/formDisciplina";
import { FormProfessor } from "@/components/cadastrar/formularios/formProfessor";
import { FormTurma } from "@/components/cadastrar/formularios/formTurma";
import { FormUsuario } from "@/components/cadastrar/formularios/formUsuario";
import { GenerateClassroomsForm } from "@/components/gerenciar/generateClassroomsForm";
import { MODULES_BY_SLUG } from "@/config/modules";
import { Aluno } from "@/types/aluno";
import { Classroom } from "@/types/classroom";
import { Course } from "@/types/course";
import { Disciplina } from "@/types/disciplina";
import { Period } from "@/types/period";
import { Professor } from "@/types/professor";
import { PageTypeCentral } from "@/types/routerType";
import { Servidor } from "@/types/servidor";

export type SummaryData = {
  title: string;
  secondary: string;
  tertiary: string;
};

export type DetailSection = {
  title: string;
  items: Array<{ label: string; value: React.ReactNode }>;
};

export type RelatedSection = {
  title: string;
  entries: Array<{ title: string; description?: string }>;
};

export type ModuleFormProps = {
  isEdit?: boolean;
  defaultValues?: unknown;
  onRefresh?: () => void;
};

export type ModuleRegistryEntry = {
  slug: PageTypeCentral;
  label: string;
  pluralLabel: string;
  roles: readonly string[];
  capabilities: typeof MODULES_BY_SLUG[PageTypeCentral]["capabilities"];
  iconPath: string;
  columns: [string, string, string];
  getSummary: (item: unknown) => SummaryData;
  getId: (item: unknown) => number;
  renderForm?: (props: ModuleFormProps) => React.ReactNode;
  detailSections: (detail: unknown) => DetailSection[];
  getRelatedSections?: (id: number) => Promise<RelatedSection[]>;
  deleteItem?: (id: number) => Promise<void>;
  renderExtraAction?: (item: unknown, onRefresh?: () => void) => React.ReactNode;
};

const boolToStatus = (value: boolean | 0 | 1) =>
  value === false || value === 0 ? "Inativo" : "Ativo";

export const moduleRegistry: Record<PageTypeCentral, ModuleRegistryEntry> = {
  aluno: {
    ...MODULES_BY_SLUG.aluno,
    iconPath: "/assets/aluno-icon.png",
    columns: ["Nome", "E-mail", "Telefone"],
    getSummary: (item) => {
      const aluno = item as Aluno;
      return {
        title: aluno.name,
        secondary: aluno.email,
        tertiary: aluno.telefone ?? aluno.celular,
      };
    },
    getId: (item) => (item as Aluno).id,
    renderForm: (props) => (
      <FormAluno
        isEdit={props.isEdit}
        defaultValues={props.defaultValues as Aluno}
        onRefresh={props.onRefresh}
      />
    ),
    detailSections: (detail) => {
      const aluno = detail as Aluno;
      return [
        {
          title: "Dados Pessoais",
          items: [
            { label: "Nome", value: aluno.name },
            { label: "CPF", value: aluno.cpf },
            { label: "RG", value: aluno.rg ?? "-" },
            { label: "Nascimento", value: aluno.data_nascimento },
            { label: "Mãe", value: aluno.nome_mae },
            { label: "Pai", value: aluno.nome_pai ?? "-" },
            { label: "Status", value: boolToStatus(aluno.status) },
          ],
        },
        {
          title: "Contato e Escolar",
          items: [
            { label: "E-mail", value: aluno.email },
            { label: "Celular", value: aluno.celular },
            { label: "Telefone", value: aluno.telefone ?? "-" },
            { label: "Matrícula", value: aluno.matricula },
            { label: "Período", value: aluno.period_id ?? "-" },
            { label: "Turma", value: aluno.classroom_id ?? "-" },
          ],
        },
      ];
    },
    deleteItem: deleteAluno,
  },
  professor: {
    ...MODULES_BY_SLUG.professor,
    iconPath: "/assets/professor-icon.png",
    columns: ["Nome", "E-mail", "Telefone"],
    getSummary: (item) => {
      const professor = item as Professor;
      return {
        title: professor.name,
        secondary: professor.email,
        tertiary: professor.telefone ?? professor.celular,
      };
    },
    getId: (item) => (item as Professor).id_professor,
    renderForm: (props) => (
      <FormProfessor
        isEdit={props.isEdit}
        defaultValues={props.defaultValues as Professor}
        onRefresh={props.onRefresh}
      />
    ),
    detailSections: (detail) => {
      const professor = detail as Professor;
      return [
        {
          title: "Dados Pessoais",
          items: [
            { label: "Nome", value: professor.name },
            { label: "CPF", value: professor.cpf },
            { label: "RG", value: professor.rg },
            { label: "Nascimento", value: professor.data_nascimento },
            { label: "Mãe", value: professor.nome_mae },
            { label: "Pai", value: professor.nome_pai ?? "-" },
          ],
        },
        {
          title: "Dados Profissionais",
          items: [
            { label: "E-mail", value: professor.email },
            { label: "Celular", value: professor.celular },
            { label: "Telefone", value: professor.telefone ?? "-" },
            { label: "Matrícula ADPM", value: professor.matricula_adpm },
            { label: "Código Disciplina", value: professor.codigo_disciplina },
          ],
        },
      ];
    },
    deleteItem: deleteProfessor,
  },
  usuario: {
    ...MODULES_BY_SLUG.usuario,
    iconPath: "/assets/servidor-icon.png",
    columns: ["Nome", "E-mail", "Telefone"],
    getSummary: (item) => {
      const usuario = item as Servidor;
      return {
        title: usuario.name,
        secondary: usuario.email,
        tertiary: usuario.telefone ?? usuario.celular,
      };
    },
    getId: (item) => (item as Servidor).id_servidor,
    renderForm: (props) => (
      <FormUsuario
        isEdit={props.isEdit}
        defaultValues={props.defaultValues as Servidor}
        onRefresh={props.onRefresh}
      />
    ),
    detailSections: (detail) => {
      const usuario = detail as Servidor;
      return [
        {
          title: "Dados Pessoais",
          items: [
            { label: "Nome", value: usuario.name },
            { label: "CPF", value: usuario.cpf },
            { label: "RG", value: usuario.rg },
            { label: "Nascimento", value: usuario.data_nascimento },
            { label: "Mãe", value: usuario.nome_mae },
            { label: "Pai", value: usuario.nome_pai ?? "-" },
          ],
        },
        {
          title: "Dados Profissionais",
          items: [
            { label: "Cargo", value: usuario.cargo },
            { label: "Setor", value: usuario.setor },
            { label: "E-mail", value: usuario.email },
            { label: "Celular", value: usuario.celular },
            { label: "Telefone", value: usuario.telefone ?? "-" },
          ],
        },
      ];
    },
    deleteItem: deleteUsuario,
  },
  disciplina: {
    ...MODULES_BY_SLUG.disciplina,
    iconPath: "/assets/disciplina-icon.png",
    columns: ["Nome", "Sigla", "Área"],
    getSummary: (item) => {
      const disciplina = item as Disciplina;
      return {
        title: disciplina.nome,
        secondary: disciplina.sigla,
        tertiary: disciplina.area_conhecimento,
      };
    },
    getId: (item) => (item as Disciplina).id,
    renderForm: (props) => (
      <FormDisciplina
        isEdit={props.isEdit}
        defaultValues={props.defaultValues as Disciplina}
        onRefresh={props.onRefresh}
      />
    ),
    detailSections: (detail) => {
      const disciplina = detail as Disciplina;
      return [
        {
          title: "Dados da Disciplina",
          items: [
            { label: "Nome", value: disciplina.nome },
            { label: "Sigla", value: disciplina.sigla },
            { label: "Área", value: disciplina.area_conhecimento },
            { label: "Unidade", value: disciplina.unidade },
            { label: "Carga Horária", value: disciplina.carga_horaria },
            { label: "Início", value: disciplina.data_inicio },
            { label: "Encerramento", value: disciplina.data_encerramento ?? "-" },
          ],
        },
        {
          title: "Conteúdo",
          items: [
            { label: "Ementa", value: disciplina.ementa },
            { label: "Bibliografia", value: disciplina.bibliografia },
          ],
        },
      ];
    },
    deleteItem: deleteDisciplina,
  },
  curso: {
    ...MODULES_BY_SLUG.curso,
    iconPath: "/assets/cadastro-icon.png",
    columns: ["Nome", "Status", "Carga Horária"],
    getSummary: (item) => {
      const curso = item as Course;
      return {
        title: curso.name,
        secondary: boolToStatus(curso.status),
        tertiary: String(curso.total_hours),
      };
    },
    getId: (item) => (item as Course).id,
    renderForm: (props) => (
      <FormCurso
        isEdit={props.isEdit}
        defaultValues={props.defaultValues as Course}
        onRefresh={props.onRefresh}
      />
    ),
    detailSections: (detail) => {
      const curso = detail as Course;
      return [
        {
          title: "Dados do Curso",
          items: [
            { label: "Nome", value: curso.name },
            { label: "Status", value: boolToStatus(curso.status) },
            { label: "Número de Períodos", value: curso.number_periods },
            { label: "Carga Horária Total", value: curso.total_hours },
            { label: "Carga Horária por Período", value: curso.hours_period },
            { label: "Detalhes", value: curso.details },
          ],
        },
      ];
    },
    getRelatedSections: async (id) => {
      const periods = await getPeriodosByCurso(id);
      return periods.data.length
        ? [
            {
              title: "Períodos Vinculados",
              entries: periods.data.map((period) => ({
                title: period.name,
                description: `ID ${period.id}`,
              })),
            },
          ]
        : [];
    },
    deleteItem: deleteCurso,
  },
  periodo: {
    ...MODULES_BY_SLUG.periodo,
    iconPath: "/assets/relatorio-icon.png",
    columns: ["Nome", "Curso", "ID"],
    getSummary: (item) => {
      const periodo = item as Period;
      return {
        title: periodo.name,
        secondary: `Curso ${periodo.course_id}`,
        tertiary: `ID ${periodo.id}`,
      };
    },
    getId: (item) => (item as Period).id,
    detailSections: (detail) => {
      const periodo = detail as Period;
      return [
        {
          title: "Dados do Período",
          items: [
            { label: "Nome", value: periodo.name },
            { label: "Curso", value: periodo.course_id },
            { label: "ID", value: periodo.id },
          ],
        },
      ];
    },
    getRelatedSections: async (id) => {
      const turmas = await getTurmasByPeriodo(id);
      return turmas.data.length
        ? [
            {
              title: "Turmas Vinculadas",
              entries: turmas.data.map((classroom) => ({
                title: classroom.name,
                description: `${classroom.shift} · ${classroom.max_students} vagas`,
              })),
            },
          ]
        : [];
    },
    renderExtraAction: (item, onRefresh) => (
      <GenerateClassroomsForm periodId={(item as Period).id} onRefresh={onRefresh} />
    ),
  },
  turma: {
    ...MODULES_BY_SLUG.turma,
    iconPath: "/assets/relatorio-icon.png",
    columns: ["Nome", "Turno", "Máx. Alunos"],
    getSummary: (item) => {
      const turma = item as Classroom;
      return {
        title: turma.name,
        secondary: turma.shift,
        tertiary: String(turma.max_students),
      };
    },
    getId: (item) => (item as Classroom).id,
    renderForm: (props) => (
      <FormTurma
        isEdit={props.isEdit}
        defaultValues={props.defaultValues as Classroom}
        onRefresh={props.onRefresh}
      />
    ),
    detailSections: (detail) => {
      const turma = detail as Classroom;
      return [
        {
          title: "Dados da Turma",
          items: [
            { label: "Nome", value: turma.name },
            { label: "Período", value: turma.period_id },
            { label: "Turno", value: turma.shift },
            { label: "Máximo de Alunos", value: turma.max_students },
            { label: "Status", value: boolToStatus(turma.status) },
          ],
        },
      ];
    },
    deleteItem: deleteTurma,
  },
};
