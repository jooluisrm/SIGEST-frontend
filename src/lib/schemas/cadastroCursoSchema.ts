import { z } from "zod";

export const cadastroCursoSchema = () =>
  z.object({
    nome: z.string().min(1, "O nome do curso é obrigatório."),
    numeroPeriodos: z.string().min(1, "Número de períodos é obrigatório."),
    cargaHorariaTotal: z.string().min(1, "Carga horária total é obrigatória."),
    cargaHorariaPeriodo: z.string().min(1, "Carga horária por período é obrigatória."),
    detalhes: z.string().min(1, "Os detalhes são obrigatórios."),
    status: z.enum(["ativo", "inativo"]).default("ativo"),
  });

export type CadastroCursoSchema = z.infer<ReturnType<typeof cadastroCursoSchema>>;
