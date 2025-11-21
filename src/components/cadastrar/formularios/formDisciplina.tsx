"use client"

import { Form, FormField } from "@/components/ui/form";
import { usePageType } from "@/context/pageTypeContext";
import { CadastroDisciplinaFormValues, cadastroDisciplinaSchema } from "@/lib/schemas/cadastroDisciplinaSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { FormFieldText } from "./formComponents/formFieldText";
import { FormFieldSelect } from "./formComponents/formFieldSelect";
import { Button } from "@/components/ui/button";
import { DisciplinaFields } from "./formGroups/disciplinaFields";
import { FormButtons } from "./formComponents/formButtons";
import { postCadastrarDisciplina, putAtualizarDisciplina } from "@/api/disciplina/disciplinaServices";
import { TypeDisciplinaCadastro } from "@/types/disciplina";
import { toast } from "sonner";

type Props = {
    isEdit?: boolean;
    defaultValues?: CadastroDisciplinaFormValues;
    onRefresh?: () => void;
}

export const FormDisciplina = ({ isEdit = false, defaultValues, onRefresh }: Props) => {

    const { type } = usePageType();
    if (type !== "disciplina") return null;

    if (isEdit && !defaultValues) return null;

    const schema = cadastroDisciplinaSchema();

    // Função auxiliar para criar Date válida
    const createValidDate = (dateString: string | null | undefined): Date | undefined => {
        if (!dateString) return undefined;
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? undefined : date;
    };

    // Extrair o ID da disciplina para uso posterior
    // O defaultValues pode vir como Disciplina (da API) ou CadastroDisciplinaFormValues
    let disciplinaId: number | null = null;
    if (isEdit && defaultValues) {
        disciplinaId = (defaultValues as any).id || null;
    }

    const form = useForm<CadastroDisciplinaFormValues>({
        resolver: zodResolver(schema) as any,
        defaultValues: isEdit && defaultValues ? {
            // Mapear campos da API (Disciplina) para o formato do formulário
            nomeDisciplina: (defaultValues as any).nome || defaultValues.nomeDisciplina || "",
            sigla: (defaultValues as any).sigla || defaultValues.sigla || "",
            areaConhecimento: (defaultValues as any).area_conhecimento || defaultValues.areaConhecimento || "",
            unidade: (defaultValues as any).unidade || defaultValues.unidade || "",
            cargaHoraria: (defaultValues as any).carga_horaria || defaultValues.cargaHoraria || "",
            dataInicio: createValidDate((defaultValues as any).data_inicio || defaultValues.dataInicio as any) || new Date(),
            dataEncerramento: createValidDate((defaultValues as any).data_encerramento || defaultValues.dataEncerramento as any) || new Date(),
            ementa: (defaultValues as any).ementa || defaultValues.ementa || "",
            bibliografia: (defaultValues as any).bibliografia || defaultValues.bibliografia || ""
        } : {
            nomeDisciplina: "",
            sigla: "",
            areaConhecimento: "",
            unidade: "",
            cargaHoraria: "",
            dataInicio: new Date(),
            dataEncerramento: new Date(),
            ementa: "",
            bibliografia: ""
        }
    });


    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data: CadastroDisciplinaFormValues) => {
        setIsSubmitting(true);
        
        // Construir objeto de dados para envio
        // Todos os campos são opcionais na atualização - só incluir se tiverem valor
        const dataToSend: any = {};

        if (data.nomeDisciplina && data.nomeDisciplina.trim() !== "") {
            dataToSend.nome = data.nomeDisciplina;
        }
        if (data.sigla && data.sigla.trim() !== "") {
            dataToSend.sigla = data.sigla;
        }
        if (data.areaConhecimento && data.areaConhecimento.trim() !== "") {
            dataToSend.area_conhecimento = data.areaConhecimento;
        }
        if (data.unidade && data.unidade.trim() !== "") {
            dataToSend.unidade = data.unidade;
        }
        if (data.cargaHoraria && data.cargaHoraria.trim() !== "") {
            dataToSend.carga_horaria = data.cargaHoraria;
        }
        if (data.dataInicio) {
            dataToSend.data_inicio = new Date(data.dataInicio).toISOString().split("T")[0];
        }
        if (data.dataEncerramento) {
            dataToSend.data_encerramento = new Date(data.dataEncerramento).toISOString().split("T")[0];
        }
        if (data.ementa && data.ementa.trim() !== "") {
            dataToSend.ementa = data.ementa;
        }
        if (data.bibliografia && data.bibliografia.trim() !== "") {
            dataToSend.bibliografia = data.bibliografia;
        }

        try {
            if (isEdit && disciplinaId) {
                await putAtualizarDisciplina(disciplinaId, dataToSend);
                // Atualizar a tabela após sucesso
                if (onRefresh) {
                    onRefresh();
                }
            } else {
                await postCadastrarDisciplina(dataToSend);
            }
        } catch (error: any) {
            // O toast já é exibido nas funções de serviço
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex px-5 flex-col mx-1 mb-5 gap-4 w-full md:w-full"
                    noValidate
                >
                    <DisciplinaFields isEdit={isEdit} />

                    <FormButtons isSubmitting={isSubmitting} isEdit={isEdit} />
                </form>
            </Form>
        </div>
    )
}