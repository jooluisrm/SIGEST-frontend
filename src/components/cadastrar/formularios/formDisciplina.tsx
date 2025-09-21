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

                    <div className="flex flex-col gap-2 md:flex-row md:gap-4 mt-20">
                        <Button disabled={isSubmitting} className="bg-secundaria font-bold">
                            {isSubmitting ? "Enviando..." : "Salvar Disciplina"}
                        </Button>
                        <Button variant={"destructive"} className="">
                            Cancelar
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}