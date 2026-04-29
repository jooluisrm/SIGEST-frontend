"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import { FormFieldText } from "./formComponents/formFieldText";
import { FormFieldSelect } from "./formComponents/formFieldSelect";
import { FormButtons } from "./formComponents/formButtons";
import { TitleForm } from "./formComponents/titleForm";

const avaliacaoSchema = z.object({
  titulo: z.string().min(1, "Título é obrigatório"),
  valor: z.string().min(1, "Valor é obrigatório"),
  tipo: z.string().min(1, "Tipo é obrigatório"),
  turma: z.string().min(1, "Turma é obrigatória"),
  data: z.string().min(1, "Data é obrigatória"),
});

type Props = {
  isEdit?: boolean;
  defaultValues?: any;
  onRefresh?: () => void;
};

export const FormAvaliacao = ({ isEdit = false, defaultValues, onRefresh }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof avaliacaoSchema>>({
    resolver: zodResolver(avaliacaoSchema),
    defaultValues: defaultValues || {
      titulo: "",
      valor: "",
      tipo: "",
      turma: "",
      data: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof avaliacaoSchema>) => {
    setIsSubmitting(true);
    console.log("Submitting Avaliacao:", data);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onRefresh?.();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-10 px-5">
        <TitleForm text="Dados da Avaliação" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <FormFieldText form={form} name="titulo" label="Título Avaliação" placeholder="Prova 1" />
            <FormFieldText form={form} name="valor" label="Valor Máximo" placeholder="10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FormFieldSelect 
                form={form} 
                name="tipo" 
                label="Tipo Avaliação" 
                options={[{value: "prova", label: "Prova"}]} 
            />
            <FormFieldSelect 
                form={form} 
                name="turma" 
                label="Turma" 
                options={[{value: "111", label: "Turma 111"}]} 
            />
            <FormFieldText form={form} name="data" label="Data de Realização" type="date" />
        </div>

        <FormButtons isSubmitting={isSubmitting} isEdit={isEdit} />
      </form>
    </Form>
  );
};
