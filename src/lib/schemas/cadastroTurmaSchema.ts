import { z } from "zod";

export const cadastroTurmaSchema = () =>
  z.object({
    periodoId: z.string().min(1, "O período é obrigatório."),
    nome: z.string().min(1, "O nome da turma é obrigatório."),
    maximoAlunos: z.string().min(1, "O máximo de alunos é obrigatório."),
    turno: z.enum(["Matutino", "Vespertino", "Noturno"]),
    status: z.enum(["ativo", "inativo"]).default("ativo"),
  });

export type CadastroTurmaSchema = z.infer<ReturnType<typeof cadastroTurmaSchema>>;
