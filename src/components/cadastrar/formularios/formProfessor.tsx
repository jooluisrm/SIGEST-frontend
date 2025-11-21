"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePageType } from "@/context/pageTypeContext";
import { postCadastrarProfessor } from "@/api/professor/professorServices";
import { cadastroProfessorSchema } from "@/lib/schemas/cadastroProfessorSchema";
import { TypeProfessorCadastro } from "@/types/professor";
import { useEffect, useState } from "react";
import { Form } from "@/components/ui/form";
import { PersonalDataFields } from "./formGroups/personalDataFields";
import { AddressFields } from "./formGroups/addressFields";
import { ProfessorDataFields } from "./formGroups/professorDataFields";
import { AuthFields } from "./formGroups/AuthFields";
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
        
        // Função auxiliar para criar Date válida
        const createValidDate = (dateString: string | null | undefined): Date | undefined => {
            if (!dateString) return undefined;
            const date = new Date(dateString);
            return isNaN(date.getTime()) ? undefined : date;
        };

        // Verifica se defaultValues tem estrutura aninhada (user_data) ou plana
        const userData = (defaultValues as any).user_data || defaultValues;
        const professorData = (defaultValues as any).professor_data || defaultValues;

        // Normaliza o gênero para minúsculo (API retorna "Masculino", "Feminino", mas form espera "masculino", "feminino")
        const normalizeGenero = (genero: string | null | undefined): string => {
            if (!genero) return "";
            return genero.toLowerCase();
        };

        form = useForm<z.infer<typeof schema>>({
            resolver: zodResolver(schema),
            defaultValues: {
                nomeCompleto: userData.name || userData.nome || "",
                dataNascimento: createValidDate(userData.data_nascimento),
                cpf: userData.cpf || "",
                rg: userData.rg || "",
                genero: normalizeGenero(userData.genero),
                nomeDoPai: userData.nome_pai || "",
                nomeDaMae: userData.nome_mae || "",
                possuiDeficiencia: userData.deficiencia && userData.deficiencia !== "Nenhuma" ? "sim" : "nao",
                qualDeficiencia: userData.deficiencia && userData.deficiencia !== "Nenhuma" ? userData.deficiencia : "",
                logradouro: userData.logradouro || "",
                numero: userData.numero || "",
                bairro: userData.bairro || "",
                complemento: userData.complemento || "",
                cidade: userData.cidade || "",
                estado: userData.estado || "",
                telefone: userData.telefone || "",
                celular: userData.celular || "",
                email: userData.email || "",
                matriculaAdpm: professorData.matricula_adpm || "",
                codigoDisciplina: professorData.codigo_disciplina || professorData.codigoDisciplina || "",
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
            name: data.nomeCompleto,
            data_nascimento: data.dataNascimento 
                ? new Date(data.dataNascimento).toISOString().split("T")[0]
                : "",
            cpf: data.cpf,
            rg: data.rg,
            genero: data.genero,
            nome_pai: data.nomeDoPai,
            nome_mae: data.nomeDaMae,
            deficiencia: data.possuiDeficiencia === "sim" ? data.qualDeficiencia : "Nenhuma",
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
            codigo_disciplina: data.codigoDisciplina,
            password: data.senha
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
