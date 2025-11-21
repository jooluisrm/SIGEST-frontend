"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePageType } from "@/context/pageTypeContext";
import { postCadastrarProfessor, putAtualizarProfessor } from "@/api/professor/professorServices";
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
    onRefresh?: () => void;
};

export const FormProfessor = ({ isEdit = false, defaultValues, onRefresh }: Props) => {
    const { type: user } = usePageType();
    if (user !== "professor") return null;

    const schema = cadastroProfessorSchema(user, isEdit);
    let form = useForm<z.infer<typeof schema>>();

    // Extrair o ID do professor para uso posterior
    let professorId: number | null = null;
    if (isEdit && defaultValues) {
        const userData = (defaultValues as any).user_data || defaultValues;
        professorId = userData.id_user || (defaultValues as any).id_user || null;
    }

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

        // Construir objeto de dados para envio
        const dataToSend: any = {
            name: data.nomeCompleto,
            cpf: data.cpf,
            rg: data.rg,
            nome_mae: data.nomeDaMae,
            deficiencia: data.possuiDeficiencia === "sim" ? data.qualDeficiencia : "Nenhuma",
            logradouro: data.logradouro,
            numero: data.numero,
            bairro: data.bairro,
            cidade: data.cidade,
            estado: data.estado,
            celular: data.celular,
            email: data.email,
            codigo_disciplina: data.codigoDisciplina,
        };

        // Campos opcionais - só incluir se tiverem valor (evita enviar strings vazias)
        if (data.dataNascimento) {
            dataToSend.data_nascimento = new Date(data.dataNascimento).toISOString().split("T")[0];
        }
        if (data.genero && data.genero.trim() !== "") {
            dataToSend.genero = data.genero;
        }
        if (data.nomeDoPai && data.nomeDoPai.trim() !== "") {
            dataToSend.nome_pai = data.nomeDoPai;
        }
        if (data.complemento && data.complemento.trim() !== "") {
            dataToSend.complemento = data.complemento;
        }
        if (data.telefone && data.telefone.trim() !== "") {
            dataToSend.telefone = data.telefone;
        }
        if (data.matriculaAdpm && data.matriculaAdpm.trim() !== "") {
            dataToSend.matricula_adpm = data.matriculaAdpm;
        }

        // Só incluir senha se foi preenchida (em modo de edição)
        if (data.senha && data.senha.trim() !== "") {
            dataToSend.password = data.senha;
        }

        try {
            if (isEdit && professorId) {
                await putAtualizarProfessor(professorId, dataToSend);
                console.log("Dados atualizados:", dataToSend);
                // Atualizar a tabela após sucesso
                if (onRefresh) {
                    onRefresh();
                }
            } else {
                await postCadastrarProfessor(dataToSend);
                console.log("Dados enviados:", dataToSend);
            }
        } catch (error: any) {
            console.log(error.message);
            // O toast já é exibido nas funções de serviço
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

                    <FormButtons isSubmitting={isSubmitting} isEdit={isEdit} />
                </form>
            </Form>
        </div>
    );
};
