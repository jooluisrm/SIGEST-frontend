import { z } from "zod";

export const cadastroCursoSchema = z.object({
  nomeCurso: z.string().min(3, "Nome do curso deve ter no mínimo 3 caracteres."),
  quantidadeSeries: z.string().min(1, "Insira a quantidade de séries."),
  cargaHorariaTotal: z.string().min(1, "Insira a carga horária total."),
  cargaHorariaPorSerie: z.string().min(1, "Insira a carga horária por série."),
  informacoesComplementares: z.string().optional(),
});
