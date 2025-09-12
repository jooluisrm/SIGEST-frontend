"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { CalendarioCadastro } from "@/components/ui/calendarioCadastro";
import { usePageType } from "@/context/pageTypeContext";
import { useIBGE } from "@/hooks/use-ibge";
import { postCadastrarProfessor } from "@/api/professor/professorServices";

import { cadastroProfessorSchema } from "@/lib/schemas/cadastroProfessorSchema";
import { TypeProfessorCadastro } from "@/types/professor";

import { useEffect, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormFieldText } from "./formComponents/formFieldText";

import { FormFieldSelect } from "./formComponents/formFieldSelect";
import { FormFieldMask } from "./formComponents/formFielMask";
import { TitleForm } from "./formComponents/titleForm";

export const FormProfessor = () => {
    const { type: user } = usePageType();
    if (!user) return null;

    const schema = cadastroProfessorSchema(user);
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            nomeCompleto: "",
            dataNascimento: undefined,
            cpf: "",
            rg: "",
            genero: "",
            nomeDoPai: "",
            nomeDaMae: "",
            possuiDeficiencia: "nao",
            qualDeficiencia: "",
            logradouro: "",
            numero: "",
            bairro: "",
            complemento: "",
            cidade: "",
            estado: "",
            telefone: "",
            celular: "",
            email: "",
            matriculaAdpm: user === "professor" ? "" : "",
        },
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const possuiDeficiencia = form.watch("possuiDeficiencia");
    const estadoSelecionado = form.watch("estado");
    const { states, cities, loadingStates, loadingCities } = useIBGE(estadoSelecionado);

    const onSubmit = async (data: z.infer<typeof schema>) => {
        if (user !== "professor") return;

        setIsSubmitting(true);

        const dataToSend: TypeProfessorCadastro = {
            nome: data.nomeCompleto,
            data_nascimento: new Date(data.dataNascimento)
                .toISOString()
                .split("T")[0],
            cpf: data.cpf,
            rg: data.rg,
            genero: data.genero,
            nome_pai: data.nomeDoPai,
            nome_mae: data.nomeDaMae,
            deficiencia: data.possuiDeficiencia === "sim" ? data.qualDeficiencia : "",
            logradouro: data.logradouro,
            numero: data.numero,
            bairro: data.bairro,
            complemento: data.complemento,
            cidade: data.cidade,
            estado: data.estado,
            telefone: data.telefone,
            celular: data.celular,
            email: data.email,
            matricula_adpm: data.matriculaAdpm,
        };

        try {
            await postCadastrarProfessor(dataToSend);
            console.log("Dados enviados:", dataToSend);
        } catch (error: any) {
            console.log(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (possuiDeficiencia === "nao") {
            form.setValue("qualDeficiencia", "", { shouldValidate: true });
        }
    }, [possuiDeficiencia, form]);

    return (
        <div className="mt-10">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex px-5 flex-col mx-1 mb-5 gap-4 w-full md:w-full"
                    noValidate
                >
                    <TitleForm text="Informações Pessoais" />

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <FormFieldText
                            form={form}
                            name="nomeCompleto"
                            label="Nome Completo"
                        />
                        <FormFieldText form={form} name="nomeDoPai" label="Nome do Pai" />
                        <FormFieldText form={form} name="nomeDaMae" label="Nome da Mãe" />

                        <FormFieldMask
                            form={form}
                            name="cpf"
                            label="CPF"
                            mask="000.000.000-00"
                        />
                        <FormFieldMask
                            form={form}
                            name="rg"
                            label="RG"
                            mask="00.000.000-a"
                        />

                        <FormFieldSelect
                            form={form}
                            name="genero"
                            label="Gênero"
                            options={[
                                { value: "masculino", label: "Masculino" },
                                { value: "feminino", label: "Feminino" },
                                { value: "outro", label: "Outro" },
                            ]}
                            placeholder="Selecione um gênero"
                        />

                        <FormField
                            control={form.control}
                            name="dataNascimento"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Data de Nascimento</FormLabel>
                                    <CalendarioCadastro
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        <FormFieldSelect
                            form={form}
                            name="possuiDeficiencia"
                            label="Possui alguma deficiência?"
                            options={[
                                { value: "sim", label: "Sim" },
                                { value: "nao", label: "Não" },
                            ]}
                            placeholder="Selecione"
                        />

                        {possuiDeficiencia === "sim" && (
                            <FormFieldText
                                form={form}
                                name="qualDeficiencia"
                                label="Qual deficiência?"
                            />
                        )}
                    </div>

                    <TitleForm text="Informações de Contato" />

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <FormFieldText form={form} name="logradouro" label="Logradouro" />
                        <FormFieldText form={form} name="numero" label="Número" />
                        <FormFieldText form={form} name="bairro" label="Bairro" />
                        <FormFieldText form={form} name="complemento" label="Complemento" />

                        <FormFieldSelect
                            form={form}
                            name="estado"
                            label="Estado"
                            options={states.map((estado) => ({
                                value: estado.sigla,
                                label: estado.nome,
                            }))}
                            placeholder={
                                !loadingStates ? "Selecione o estado" : "Carregando..."
                            }
                        />

                        <FormFieldSelect
                            form={form}
                            name="cidade"
                            label="Cidade"
                            options={cities.map((cidade) => ({
                                value: cidade.nome,
                                label: cidade.nome,
                            }))}
                            placeholder={
                                !loadingCities
                                    ? estadoSelecionado
                                        ? "Selecione a cidade"
                                        : "Primeiro selecione um estado"
                                    : "Carregando..."
                            }
                            disabled={!estadoSelecionado || loadingCities}
                        />

                        <FormFieldMask
                            form={form}
                            name="telefone"
                            label="Telefone"
                            mask={["(00) 0000-0000", "(00) 00000-0000"]}
                        />
                        <FormFieldMask
                            form={form}
                            name="celular"
                            label="Celular"
                            mask="(00) 00000-0000"
                        />

                        <FormFieldText
                            form={form}
                            name="email"
                            label="E-mail"
                            type="email"
                        />
                    </div>
                    <div className="w-1/4 gap-4">
                        <TitleForm text="Informação Profissional" />
                        <FormFieldText
                            form={form}
                            name="matriculaAdpm"
                            label="Matrícula ADPM"
                        />
                    </div>

                    <Button
                        type="submit"
                        variant="default"
                        className="rounded-2xl text-white bg-secundaria h-14 w-25 mt-5 cursor-pointer hover:bg-secundaria hover:opacity-75"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Enviando..." : "Cadastrar"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};
