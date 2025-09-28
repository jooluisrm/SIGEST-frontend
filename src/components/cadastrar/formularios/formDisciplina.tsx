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

type Props = {
    isEdit?: boolean;
    defaultValues?: CadastroDisciplinaFormValues;
}

export const FormDisciplina = ({ isEdit = false, defaultValues }: Props) => {

    const { type } = usePageType();
    if (type !== "disciplina") return null;

    const schema = cadastroDisciplinaSchema();
    let form = useForm<z.infer<typeof schema>>();

    if (isEdit) { //colocar os default values dps
        if (!defaultValues) return null;
        form = useForm<z.infer<typeof schema>>({
            resolver: zodResolver(schema),
            defaultValues: {
                nomeDisciplina: defaultValues.nomeDisciplina,
                areaConhecimento: defaultValues.areaConhecimento,
                serie: defaultValues.serie
            }
        });
    } else {
        form = useForm<z.infer<typeof schema>>({
            resolver: zodResolver(schema),
            defaultValues: {
                nomeDisciplina: "",
                areaConhecimento: "",
                serie: ""
            }
        });
    }


    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data: z.infer<typeof schema>) => {
        setIsSubmitting(true);
        try {
            console.log(data);
        } catch (error: any) {
            console.log(error.message);
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