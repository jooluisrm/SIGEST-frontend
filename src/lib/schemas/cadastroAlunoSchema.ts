// src/lib/schemas/cadastroAlunoSchema.ts

import { PageTypeCentral } from "@/types/routerType";
import { z } from "zod";

export const cadastroAlunoSchema = () =>
    z
        .object({
            nomeCompleto: z
                .string({ required_error: "Nome completo é obrigatório" })
                .min(3, "O nome deve ter no mínimo 3 caracteres."),
            dataNascimento: z
                .date({
                    required_error: "Data de nascimento é obrigatória.",
                })
                .refine(
                    (val) => {
                        return !isNaN(val.getTime()) && val < new Date();
                    },
                    {
                        message: "Data de nascimento inválida",
                    }
                ),
            cpf: z.string().min(11, "O CPF completo (apenas números) é obrigatório."),
            rg: z
                .string({ required_error: "RG é obrigatório" })
                .min(5, "RG inválido"),
            genero: z
                .string({ required_error: "Gênero é obrigatório" })
                .min(1, "Selecione um gênero"),
            nomeDoPai: z
                .string({ required_error: "Nome do pai é obrigatório" })
                .min(3, "O nome do pai deve ter no mínimo 3 caracteres."),
            nomeDaMae: z
                .string({ required_error: "Nome da mãe é obrigatório" })
                .min(3, "O nome da mãe deve ter no mínimo 3 caracteres."),
            possuiDeficiencia: z.enum(["sim", "nao"], {
                required_error: "Informe se possui alguma deficiência",
            }),
            qualDeficiencia: z.string().optional(),
            logradouro: z
                .string({ required_error: "O logradouro é obrigatório." })
                .min(3, "O logradouro deve ter no mínimo 3 caracteres."),
            numero: z
                .string({ required_error: "O número é obrigatório." })
                .min(1, "O número é obrigatório."),
            bairro: z
                .string({ required_error: "O bairro é obrigatório." })
                .min(3, "O bairro deve ter no mínimo 3 caracteres."),
            complemento: z.string().optional(),
            cidade: z
                .string({ required_error: "A cidade é obrigatória." })
                .min(3, "A cidade deve ter no mínimo 3 caracteres."),
            estado: z
                .string({ required_error: "O estado é obrigatório." })
                .min(2, "O estado deve ter no mínimo 2 letras (UF)."),
            telefone: z.string().min(10, "O telefone com DDD deve ter no mínimo 10 dígitos."),
            celular: z.string().min(11, "O celular com DDD deve ter 11 dígitos."),
            email: z
                .string({ required_error: "O e-mail é obrigatório." })
                .email("O formato do e-mail é inválido."),
            matricula: z
                .string({ required_error: "A matrícula é obrigatória" })
                .min(1, "A matrícula não pode ser vazia."),
            turma: z
                .string().min(1, "O código da turma é obrigatório."),
            senha: z
                .string({ required_error: "A senha é obrigatória" })
                .min(6, "A senha deve ter no mínimo 6 caracteres"),
            confirmarSenha: z
                .string({ required_error: "A confirmação de senha é obrigatória" }),

        })
        .refine((data) => data.senha === data.confirmarSenha, {
            path: ["confirmarSenha"],
            message: "As senhas não conferem",
        })
        .superRefine((data, ctx) => {
            if (
                data.possuiDeficiencia === "sim" &&
                (!data.qualDeficiencia || data.qualDeficiencia.trim() === "")
            ) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Por favor, informe qual deficiência.",
                    path: ["qualDeficiencia"],
                });
            }
        });

// Também é uma boa prática exportar o tipo inferido, se necessário em outros lugares.
// Para isso, criamos uma versão base do schema e inferimos o tipo dela.
export type CadastroAlunoSchema = z.infer<ReturnType<typeof cadastroAlunoSchema>>;