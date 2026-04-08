import { z } from "zod";

export const cadastroProfessorSchema = (isEdit = false) =>
  z
    .object({
      nomeCompleto: z.string().min(3, "O nome deve ter no mínimo 3 caracteres."),
      dataNascimento: z
        .date({ required_error: "Data de nascimento é obrigatória." })
        .refine((value) => !Number.isNaN(value.getTime()) && value < new Date(), {
          message: "Data de nascimento inválida",
        }),
      cpf: z.string().min(11, "O CPF completo é obrigatório."),
      rg: z.string().min(5, "RG inválido"),
      genero: z.string().min(1, "Selecione um gênero"),
      nomeDoPai: z.string().min(3, "O nome do pai deve ter no mínimo 3 caracteres."),
      nomeDaMae: z.string().min(3, "O nome da mãe deve ter no mínimo 3 caracteres."),
      possuiDeficiencia: z.enum(["sim", "nao"]),
      qualDeficiencia: z.string().optional(),
      logradouro: z.string().min(3, "O logradouro deve ter no mínimo 3 caracteres."),
      numero: z.string().min(1, "O número é obrigatório."),
      bairro: z.string().min(3, "O bairro deve ter no mínimo 3 caracteres."),
      complemento: z.string().optional(),
      cidade: z.string().min(3, "A cidade deve ter no mínimo 3 caracteres."),
      estado: z.string().min(2, "O estado deve ter no mínimo 2 letras."),
      telefone: z.string().min(10, "O telefone deve ter no mínimo 10 dígitos."),
      celular: z.string().min(11, "O celular deve ter 11 dígitos."),
      email: z.string().email("O formato do e-mail é inválido."),
      matriculaAdpm: z.string().min(1, "A matrícula ADPM não pode ser vazia."),
      codigoDisciplina: z.string().min(1, "O código da disciplina é obrigatório."),
      senha: isEdit
        ? z.string().min(6, "A senha deve ter no mínimo 6 caracteres").optional().or(z.literal(""))
        : z.string({ required_error: "A senha é obrigatória" }).min(6, "A senha deve ter no mínimo 6 caracteres"),
      confirmarSenha: isEdit
        ? z.string().optional().or(z.literal(""))
        : z.string({ required_error: "A confirmação de senha é obrigatória" }),
    })
    .refine((data) => {
      if (isEdit && (!data.senha || data.senha === "")) {
        return true;
      }
      return data.senha === data.confirmarSenha;
    }, {
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

export type CadastroProfessorSchema = z.infer<ReturnType<typeof cadastroProfessorSchema>>;
