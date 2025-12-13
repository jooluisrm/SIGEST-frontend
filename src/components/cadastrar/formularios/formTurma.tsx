"use client";

import { Form } from "@/components/ui/form";
import { usePageType } from "@/context/pageTypeContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Supondo que você ajustará este esquema para incluir 'name' e 'periodId' e remover 'quantidadeTurmas'
// Você precisará ajustar seu schema: cadastroTurmaSchema, e o Type: CadastroTurmaFormValues
import { cadastroTurmaSchema, CadastroTurmaFormValues } from "@/lib/schemas/cadastroTurmaSchema";

// Ajustar o TypeTurmaCadastro para refletir a API/Banco de Dados: name, period_id, max_students, shift
// Você precisará ajustar seu Type: TypeTurmaCadastro
import { postCadastrarTurma, putAtualizarTurma } from "@/api/turma/turmaServices";
import { TypeTurmaCadastro } from "@/types/turma";

import { FormFieldText } from "./formComponents/formFieldText"; // Usado para name
import { FormFieldSelect } from "./formComponents/formFieldSelect"; // Usado para periodId e shift
import { FormButtons } from "./formComponents/formButtons";
// Supondo que 'TurmaFields' será ajustado ou substituído
import { TurmaFields } from "./formGroups/turmaDataFields"; 

type Props = {
    isEdit?: boolean;
    defaultValues?: CadastroTurmaFormValues | any; 
    onRefresh?: () => void;
};

export const FormTurma = ({ isEdit = false, defaultValues, onRefresh }: Props) => {
    const { type } = usePageType();
    if (type !== "turma") return null;
    if (isEdit && !defaultValues) return null;

    const schema = cadastroTurmaSchema();

    let turmaId: number | null = null;
    if (isEdit && defaultValues) {
        turmaId = (defaultValues as any).id || null;
    }

    const form = useForm<CadastroTurmaFormValues>({
        resolver: zodResolver(schema) as any,
        defaultValues: isEdit && defaultValues
            ? {
                  name: (defaultValues as any).name || defaultValues.name || "",
                  periodId: (defaultValues as any).period_id || defaultValues.periodId || "",
                  maxStudents: (defaultValues as any).max_students || defaultValues.maxStudents || "",
                  shift: (defaultValues as any).shift || defaultValues.shift || "",
                  
              }
            : {
                  name: "",
                  periodId: "",
                  maxStudents: "",
                  shift: "",
              },
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data: CadastroTurmaFormValues) => {
        setIsSubmitting(true);

        const dataToSend: TypeTurmaCadastro = {
            name: data.name,
            period_id: Number(data.periodId), 
            max_students: Number(data.maxStudents),
            shift: data.shift,
        };

        try {
            if (isEdit && turmaId) {
                await putAtualizarTurma(turmaId, dataToSend);
                if (onRefresh) onRefresh();
            } else {
                await postCadastrarTurma(dataToSend);
            }
        } catch (error) {
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex px-5 flex-col mx-1 mb-5 gap-4 w-full md:w-full"
                    noValidate
                >
                    <TurmaFields form={form} isEdit={isEdit} /> 

                    <FormButtons isSubmitting={isSubmitting} isEdit={isEdit} />
                </form>
            </Form>
        </div>
    );
};