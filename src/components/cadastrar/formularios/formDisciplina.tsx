"use client"

import { Form, FormField } from "@/components/ui/form";
import { usePageType } from "@/context/pageTypeContext";
import { cadastroDisciplinaSchema } from "@/lib/schemas/cadastroDisciplinaSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { FormFieldText } from "./formComponents/formFieldText";
import { FormFieldSelect } from "./formComponents/formFieldSelect";
import { Button } from "@/components/ui/button";

export const FormDisciplina = () => {

    const { type } = usePageType();
    if (type !== "disciplina") return null;

    const schema = cadastroDisciplinaSchema();
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            nomeDisciplina: "",
            areaConhecimento: "",
            serie: ""
        }
    });

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
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <FormFieldText
                            form={form}
                            name="nomeDisciplina"
                            label="Nome da Disciplina"
                        />

                        <FormFieldSelect
                            form={form}
                            name="areaConhecimento"
                            label="Área de Conhecimento"
                            options={[
                                { value: "area1", label: "Linguagens" },
                                { value: "area2", label: "aaaaa" },
                                { value: "area3", label: "aaaaa" },
                            ]}
                            placeholder="Selecione uma área de conhecimento"
                        />

                        <FormFieldSelect
                            form={form}
                            name="serie"
                            label="Série"
                            options={[
                                { value: "serie1", label: "6* ano" },
                                { value: "serie2", label: "aaaaa" },
                                { value: "serie3", label: "aaaaa" },
                            ]}
                            placeholder="Selecione uma área de conhecimento"
                        />
                    </div>
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