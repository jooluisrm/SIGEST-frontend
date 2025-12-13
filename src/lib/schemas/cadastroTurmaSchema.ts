import z from "zod";

export const cadastroTurmaSchema = () =>
    z.object({
        name: z.string().min(3, "O nome da turma é obrigatório e deve ter no mínimo 3 caracteres."),
        periodId: z.string().min(1, "O período é obrigatório."),
        maxStudents: z.string().min(1, "Informe a quantidade máxima de alunos."),
        shift: z.string().min(1, "Selecione o turno."),
    });

export type CadastroTurmaFormValues = z.infer<ReturnType<typeof cadastroTurmaSchema>>;