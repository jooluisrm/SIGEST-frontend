import { PageTypeCentral } from "@/types/routerType";
import { z } from "zod";

export const cadastroDisciplinaSchema = () => z.object({    
    nomeDisciplina: z.string().min(1, "Nome da disciplina é obrigatório."),
    sigla: z.string().min(1, "Sigla é obrigatória."),
    areaConhecimento: z.string().min(1, "Área de conhecimento é obrigatória."),
    unidade: z.string().min(1, "Unidade é obrigatória."),
    cargaHoraria: z.string().min(1, "Carga horária é obrigatória."),
    dataInicio: z.date({
        required_error: "Data de início é obrigatória.",
    }),
    dataEncerramento: z.date({
        required_error: "Data de encerramento é obrigatória.",
    }),
    ementa: z.string().min(1, "Ementa é obrigatória."),
    bibliografia: z.string().min(1, "Bibliografia é obrigatória.")
}).superRefine((data, ctx) => {
    if (data.dataEncerramento && data.dataInicio && data.dataEncerramento < data.dataInicio) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Data de encerramento deve ser posterior à data de início.",
            path: ["dataEncerramento"],
        });
    }
});

export type CadastroDisciplinaFormValues = z.infer<ReturnType<typeof cadastroDisciplinaSchema>>;
