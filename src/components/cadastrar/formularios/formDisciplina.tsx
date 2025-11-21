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
import { postCadastrarDisciplina } from "@/api/disciplina/disciplinaServices";
import { TypeDisciplinaCadastro } from "@/types/disciplina";
import { toast } from "sonner";

type Props = {
    isEdit?: boolean;
    defaultValues?: CadastroDisciplinaFormValues;
}

export const FormDisciplina = ({ isEdit = false, defaultValues }: Props) => {

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

    const form = useForm<CadastroDisciplinaFormValues>({
        resolver: zodResolver(schema) as any,
        defaultValues: isEdit && defaultValues ? {
            nomeDisciplina: defaultValues.nomeDisciplina || "",
            sigla: defaultValues.sigla || "",
            areaConhecimento: defaultValues.areaConhecimento || "",
            unidade: defaultValues.unidade || "",
            cargaHoraria: defaultValues.cargaHoraria || "",
            dataInicio: createValidDate(defaultValues.dataInicio as any) || new Date(),
            dataEncerramento: createValidDate(defaultValues.dataEncerramento as any) || new Date(),
            ementa: defaultValues.ementa || "",
            bibliografia: defaultValues.bibliografia || ""
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
        
        const dataToSend: TypeDisciplinaCadastro = {
            nome: data.nomeDisciplina,
            sigla: data.sigla,
            area_conhecimento: data.areaConhecimento,
            unidade: data.unidade,
            carga_horaria: data.cargaHoraria,
            data_inicio: data.dataInicio 
                ? new Date(data.dataInicio).toISOString().split("T")[0]
                : "",
            data_encerramento: data.dataEncerramento 
                ? new Date(data.dataEncerramento).toISOString().split("T")[0]
                : "",
            ementa: data.ementa,
            bibliografia: data.bibliografia
        };

        try {
            const response = await postCadastrarDisciplina(dataToSend);
            toast.success(response.mensagem || "Disciplina cadastrada com sucesso");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Erro ao cadastrar disciplina");
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

                    <FormButtons isSubmitting={isSubmitting} />
                </form>
            </Form>
        </div>
    )
}