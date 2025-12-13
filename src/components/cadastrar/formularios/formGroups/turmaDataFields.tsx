"use client";

import { FormFieldText } from "../formComponents/formFieldText";
import { FormFieldSelect } from "../formComponents/formFieldSelect";
import { UseFormReturn } from "react-hook-form";
import { CadastroTurmaFormValues } from "@/lib/schemas/cadastroTurmaSchema"; 

type Props = {
    form: UseFormReturn<CadastroTurmaFormValues>; 
    isEdit?: boolean;
};

export const TurmaFields = ({ form, isEdit }: Props) => {
    const periodOptions = [
        { label: "1º Período/Módulo", value: "1" },
        { label: "2º Período/Módulo", value: "2" },
        { label: "3º Período/Módulo", value: "3" },

    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <FormFieldText
                form={form}
                name="name"
                label="Nome da Turma"
                placeholder="Ex: Turma A - 2026/1"
            />
            
            <FormFieldSelect
                form={form}
                name="periodId"
                label="Selecione o Período/Módulo"
                placeholder="Selecione o período"
                options={periodOptions}
            />

            <FormFieldText
                form={form}
                name="maxStudents"
                label="Quantidade máxima de alunos"
                placeholder="Ex: 40"
                type="number"
            />

            <FormFieldSelect
                form={form}
                name="shift"
                label="Selecione o turno"
                placeholder="Selecione o turno"
                options={[
                    { label: "Manhã", value: "manha" }, 
                    { label: "Tarde", value: "tarde" },
                    { label: "Noite", value: "noite" },
                ]}
            />
            
        </div>
    );
};