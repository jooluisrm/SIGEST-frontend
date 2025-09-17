import { PageTypeCentral } from "@/types/routerType";
import { z } from "zod";

export const cadastroDisciplinaSchema = () => z.object({    
    nomeDisciplina: z.string().min(1, "Nome da disciplina é obrigatório."),
    areaConhecimento: z.string().min(1, "Área de conhecimento é obrigatório."),
    serie: z.string().min(1, "Série é obrigatório.")
});

export type CadastroDisciplinaFormValues = z.infer<ReturnType<typeof cadastroDisciplinaSchema>>;
