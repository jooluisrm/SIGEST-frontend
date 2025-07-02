"use client";

import { z } from "zod";
import { InputCadastro } from "./inputCadastro";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";

type Props = {
    user: "aluno" | "servidor" | "professor";
};

const getFormSchema = (user: Props["user"]) =>
    z.object({
        nomeCompleto: z
            .string({ required_error: "Nome completo é obrigatório" })
            .min(3, "Nome muito curto"),
        dataNascimento: z
            .string({ required_error: "Data de nascimento é obrigatória" })
            .refine(
                (val) => {
                    const date = new Date(val);
                    return !isNaN(date.getTime()) && date < new Date();
                },
                {
                    message: "Data de nascimento inválida",
                }
            ),
        cpf: z
            .string({ required_error: "CPF é obrigatório" })
            .min(11, "CPF inválido")
            .max(14),
        rg: z.string({ required_error: "RG é obrigatório" }).min(5, "RG inválido"),
        genero: z
            .string({ required_error: "Gênero é obrigatório" })
            .min(1, "Selecione um gênero"),
        nomeDoPai: z.string({ required_error: "Nome do pai é obrigatório" }).min(3),
        nomeDaMae: z.string({ required_error: "Nome da mãe é obrigatório" }).min(3),
        possuiDeficiencia: z.enum(["sim", "nao"], {
            required_error: "Informe se possui alguma deficiência",
        }),
        logradouro: z.string({ required_error: "Logradouro é obrigatório" }).min(3),
        numero: z.string({ required_error: "Número é obrigatório" }).min(1),
        bairro: z.string({ required_error: "Bairro é obrigatório" }).min(3),
        complemento: z.string().optional(),
        cidade: z.string({ required_error: "Cidade é obrigatória" }).min(2),
        estado: z.string({ required_error: "Estado é obrigatório" }).min(2),
        telefone: z
            .string({ required_error: "Telefone do responsável é obrigatório" })
            .min(8),
        celular: z
            .string({ required_error: "Celular do responsável é obrigatório" })
            .min(8),
        email: z
            .string({ required_error: "E-mail é obrigatório" })
            .email("E-mail inválido"),
        matriculaAdpm: z.string({ required_error: "Matrícula ADPM é obrigatória" }),
    });

export const ContainerCadastro = ({ user }: Props) => {
    const schema = getFormSchema(user);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: z.infer<typeof schema>) => {
        console.log("Dados enviados:", data);
    };

    return (
        <div className="flex justify-center mt-10">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex px-5 flex-col mx-1 mb-5 gap-4 w-[100%] md:w-[70%]"
                noValidate
            >
                <p className="text-lg font-semibold my-2">Informações Pessoais:</p>
                <div className="flex gap-4">
                    <label className="w-full">
                        Nome Completo
                        <InputCadastro camp="text" {...register("nomeCompleto")} />
                        {errors.nomeCompleto && (
                            <span className="text-red-500 text-sm" role="alert">
                                {errors.nomeCompleto.message}
                            </span>
                        )}
                    </label>

                    <label className="w-full md:w-1/2">
                        Data de Nascimento
                        <InputCadastro camp="date" {...register("dataNascimento")} />
                        {errors.dataNascimento && (
                            <span className="text-red-500 text-sm" role="alert">
                                {errors.dataNascimento.message}
                            </span>
                        )}
                    </label>
                </div>

                <div className="flex gap-4">
                    <label className="md:w-1/2">
                        CPF
                        <InputCadastro camp="text" {...register("cpf")} />
                        {errors.cpf && (
                            <span className="text-red-500 text-sm" role="alert">
                                {errors.cpf.message}
                            </span>
                        )}
                    </label>

                    <label className="md:w-1/3">
                        RG
                        <InputCadastro camp="text" {...register("rg")} />
                        {errors.rg && (
                            <span className="text-red-500 text-sm" role="alert">
                                {errors.rg.message}
                            </span>
                        )}
                    </label>
                    <label className="md:w-1/4">
                        Gênero
                        <InputCadastro camp="select" {...register("genero")} />
                        {errors.genero && (
                            <span className="text-red-500 text-sm" role="alert">
                                {errors.genero.message}
                            </span>
                        )}
                    </label>
                </div>

                <div className="flex gap-4">
                    <label className="w-1/2 md:w-full">
                        Nome do Pai
                        <InputCadastro camp="text" {...register("nomeDoPai")} />
                        {errors.nomeDoPai && (
                            <span className="text-red-500 text-sm" role="alert">
                                {errors.nomeDoPai.message}
                            </span>
                        )}
                    </label>

                    <label className="w-1/2 md:w-full">
                        Nome da mãe
                        <InputCadastro camp="text" {...register("nomeDaMae")} />
                        {errors.nomeDaMae && (
                            <span className="text-red-500 text-sm" role="alert">
                                {errors.nomeDaMae.message}
                            </span>
                        )}
                    </label>
                </div>
                {user === "professor" && (
                    <div className="flex">
                        <label className="md:w-1/2">
                            Possui alguma deficiência?
                            <InputCadastro camp="text" {...register("possuiDeficiencia")} />
                            {errors.possuiDeficiencia && (
                                <span className="text-red-500 text-sm" role="alert">
                                    {errors.possuiDeficiencia.message}
                                </span>
                            )}
                        </label>
                    </div>
                )}

                <p className="text-lg font-semibold my-2">Informações de Contato:</p>

                <div className="flex gap-4">
                    <label className="w-full">
                        Logadouro
                        <InputCadastro camp="text" {...register("logradouro")} />
                        {errors.logradouro && (
                            <span className="text-red-500 text-sm" role="alert">
                                {errors.logradouro.message}
                            </span>
                        )}
                    </label>

                    <label className="w-full md:w-1/2">
                        Número
                        <InputCadastro camp="text" {...register("numero")} />
                        {errors.numero && (
                            <span className="text-red-500 text-sm" role="alert">
                                {errors.numero.message}
                            </span>
                        )}
                    </label>
                </div>

                <div className="flex gap-4">
                    <label className="w-full md:w-1/2">
                        Bairro
                        <InputCadastro camp="text" {...register("bairro")} />
                        {errors.bairro && (
                            <span className="text-red-500 text-sm" role="alert">
                                {errors.bairro.message}
                            </span>
                        )}
                    </label>

                    <label className="w-full md:w-1/2">
                        Complemento
                        <InputCadastro camp="text" {...register("complemento")} />
                        {errors.complemento && (
                            <span className="text-red-500 text-sm" role="alert">
                                {errors.complemento.message}
                            </span>
                        )}
                    </label>
                </div>

                <div className="flex gap-4">
                    <label className="w-full">
                        Cidade
                        <InputCadastro camp="text" {...register("cidade")} />
                        {errors.cidade && (
                            <span className="text-red-500 text-sm" role="alert">
                                {errors.cidade.message}
                            </span>
                        )}
                    </label>

                    <label className="w-full md:w-1/2">
                        Estado
                        <InputCadastro camp="text" {...register("estado")} />
                        {errors.estado && (
                            <span className="text-red-500 text-sm" role="alert">
                                {errors.estado.message}
                            </span>
                        )}
                    </label>
                </div>

                <div className="flex gap-4">
                    <label className="w-full">
                        Telefone - Responsável
                        <InputCadastro camp="tel" {...register("telefone")} />
                        {errors.telefone && (
                            <span className="text-red-500 text-sm" role="alert">
                                {errors.telefone.message}
                            </span>
                        )}
                    </label>

                    <label className="w-full">
                        Celular - Responsável
                        <InputCadastro camp="tel" {...register("celular")} />
                        {errors.celular && (
                            <span className="text-red-500 text-sm" role="alert">
                                {errors.celular.message}
                            </span>
                        )}
                    </label>
                </div>
                <div className="flex">
                    <label className="w-1/2">
                        E-mail
                        <InputCadastro camp="email" {...register("email")} />
                        {errors.email && (
                            <span className="text-red-500 text-sm" role="alert">
                                {errors.email.message}
                            </span>
                        )}
                    </label>
                </div>

                {user === "professor" && (
                    <>
                        <p className="text-lg font-semibold my-2">
                            Informação Profissional:
                        </p>
                        <div className="flex">
                            <label className="w-1/2">
                                Matrícula ADPM
                                <InputCadastro camp="text" {...register("matriculaAdpm")} />
                                {errors.matriculaAdpm && (
                                    <span className="text-red-500 text-sm" role="alert">
                                        {errors.matriculaAdpm.message}
                                    </span>
                                )}
                            </label>
                        </div>
                    </>
                )}

                <Button
                    type="submit"
                    variant={"default"}
                    className="rounded-2xl text-white bg-primaria h-14 w-25 mt-5 cursor-pointer"
                >
                    Cadastrar
                </Button>
            </form>
        </div>
    );
};
