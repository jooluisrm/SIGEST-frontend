"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { FormFieldSelect } from "@/components/cadastrar/formularios/formComponents/formFieldSelect";
import { FormFieldText } from "@/components/cadastrar/formularios/formComponents/formFieldText";
import { FormButtons } from "@/components/cadastrar/formularios/formComponents/formButtons";
import { TitleForm } from "@/components/cadastrar/formularios/formComponents/titleForm";


const vinculoSchema = z.object({
  curso: z.string().min(1, "Curso é obrigatório"),
  periodo: z.string().min(1, "Período é obrigatório"),
  disciplina: z.string().min(1, "Disciplina é obrigatória"),
  carga: z.string().min(1, "Carga é obrigatória"),
});

export const VinculoDisciplinaForm = () => {
  const form = useForm<z.infer<typeof vinculoSchema>>({
    resolver: zodResolver(vinculoSchema),
    defaultValues: {
      curso: "",
      periodo: "",
      disciplina: "",
      carga: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(console.log)} className="flex flex-col gap-8">
        <TitleForm text="Vínculo Disciplina" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormFieldSelect
            form={form}
            name="curso"
            label="Curso"
            options={[{ value: "1", label: "Fundamental I" }]}
            placeholder="Selecione o curso"
          />
          <FormFieldSelect
            form={form}
            name="periodo"
            label="Período"
            options={[{ value: "1", label: "1º Período" }]}
            placeholder="Selecione o período"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormFieldSelect
            form={form}
            name="disciplina"
            label="Disciplina"
            options={[{ value: "1", label: "Matemática" }]}
            placeholder="Selecione a disciplina"
          />
          <FormFieldText
            form={form}
            name="carga"
            label="Carga Horária"
            placeholder="Ex: 80h"
          />
        </div>

        <FormButtons isSubmitting={false} />
      </form>
    </Form>
  );
};
