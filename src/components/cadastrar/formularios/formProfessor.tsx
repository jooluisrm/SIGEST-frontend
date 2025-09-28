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
import { PersonalDataFields } from "./formGroups/personalDataFields";
import { AddressFields } from "./formGroups/addressFields";
import { ProfessorDataFields } from "./formGroups/professorDataFields";
import { AuthFields } from "./formGroups/AuthFields";
import { AppButton } from "@/components/shared/app-button";
import { FormButtons } from "./formComponents/formButtons";

type Props = {
    isEdit?: boolean;
    defaultValues?: TypeProfessorCadastro;
};

export const FormProfessor = ({ isEdit = false, defaultValues }: Props) => {
    const { type: user } = usePageType();
    if (user !== "professor") return null;

    const schema = cadastroProfessorSchema(user);
    let form = useForm<z.infer<typeof schema>>();

    if (isEdit) {
        if (!defaultValues) return null;
        form = useForm<z.infer<typeof schema>>({
            resolver: zodResolver(schema),
            defaultValues: {
                nomeCompleto: defaultValues.nome,
                dataNascimento: new Date(defaultValues.data_nascimento),
                cpf: defaultValues.cpf,
                rg: defaultValues.rg,
                genero: defaultValues.genero,
                nomeDoPai: defaultValues.nome_pai,
                nomeDaMae: defaultValues.nome_mae,
                possuiDeficiencia: defaultValues.deficiencia ? "sim" : "nao",
                qualDeficiencia: defaultValues.deficiencia || "",
                logradouro: defaultValues.logradouro,
                numero: defaultValues.numero,
                bairro: defaultValues.bairro,
                complemento: defaultValues.complemento || "",
                cidade: defaultValues.cidade,
                estado: defaultValues.estado,
                telefone: defaultValues.telefone,
                celular: defaultValues.celular,
                email: defaultValues.email,
                matriculaAdpm: defaultValues.matricula_adpm,
                codigoDisciplina: "",
                senha: "",
                confirmarSenha: ""
            },
        });
    } else {
        form = useForm<z.infer<typeof schema>>({
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
                matriculaAdpm: "",
                codigoDisciplina: "",
                senha: "",
                confirmarSenha: ""
            },
        });
    };

    const [isSubmitting, setIsSubmitting] = useState(false);



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
            codigoDisciplina: data.codigoDisciplina,
            senha: data.senha,
            confirmarSenha: data.confirmarSenha
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
    const senhaValue = form.watch("senha");

    useEffect(() => {
        // Dispara a validação para o campo 'confirmarSenha'
        form.trigger("confirmarSenha");
    }, [senhaValue, form.trigger]);



    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex px-5 flex-col mx-1 mb-5 gap-4 w-full md:w-full"
                    noValidate
                >
                    <PersonalDataFields isEdit={isEdit} />
                    <AddressFields isEdit={isEdit} />
                    <ProfessorDataFields isEdit={isEdit} />
                    <AuthFields isEdit={isEdit} />

                    <FormButtons isSubmitting={isSubmitting} />
                </form>
            </Form>
        </div>
    );
};
