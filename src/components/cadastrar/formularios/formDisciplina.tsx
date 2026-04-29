"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import { FormFieldText } from "./formComponents/formFieldText";
import { FormButtons } from "./formComponents/formButtons";
import { TitleForm } from "./formComponents/titleForm";
import { Textarea } from "@/components/ui/textarea";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Disciplina } from "@/types/disciplina";
import { useCreateDisciplina, useUpdateDisciplina } from "@/hooks/queries/disciplina";

const disciplinaSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  sigla: z.string().min(1, "Sigla é obrigatória"),
  carga: z.string().min(1, "Carga é obrigatória"),
  area: z.string().min(1, "Área é obrigatória"),
  unidade: z.string().min(1, "Unidade é obrigatória"),
  inicio: z.string().min(1, "Início é obrigatório"),
  fim: z.string().optional(),
  ementa: z.string().optional(),
  bibliografia: z.string().optional(),
});

type Props = {
  isEdit?: boolean;
  defaultValues?: Disciplina;
  onRefresh?: () => void;
};

export const FormDisciplina = ({ isEdit = false, defaultValues, onRefresh }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createMutation = useCreateDisciplina();
  const updateMutation = useUpdateDisciplina();

  const form = useForm<z.infer<typeof disciplinaSchema>>({
    resolver: zodResolver(disciplinaSchema),
    defaultValues: {
      nome: defaultValues?.nome ?? "",
      sigla: defaultValues?.sigla ?? "",
      carga: defaultValues?.carga_horaria ?? "",
      area: defaultValues?.area_conhecimento ?? "",
      unidade: defaultValues?.unidade ?? "",
      inicio: defaultValues?.data_inicio ?? "",
      fim: defaultValues?.data_encerramento ?? "",
      ementa: defaultValues?.ementa ?? "",
      bibliografia: defaultValues?.bibliografia ?? "",
    },
  });

  const onSubmit = async (data: z.infer<typeof disciplinaSchema>) => {
    setIsSubmitting(true);

    const payload = {
      nome: data.nome,
      sigla: data.sigla,
      area_conhecimento: data.area,
      unidade: data.unidade,
      carga_horaria: data.carga,
      data_inicio: data.inicio,
      data_encerramento: data.fim || undefined,
      ementa: data.ementa,
      bibliografia: data.bibliografia,
    };

    try {
      if (isEdit && defaultValues) {
        await updateMutation.mutateAsync({ id: defaultValues.id, payload });
        onRefresh?.();
      } else {
        await createMutation.mutateAsync(payload);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-10 px-5">
        <TitleForm text="Dados da Disciplina" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FormFieldText form={form} name="nome" label="Nome Disciplina" placeholder="Matemática" />
          <FormFieldText form={form} name="sigla" label="Sigla" placeholder="MAT" />
          <FormFieldText form={form} name="carga" label="Carga Horária" placeholder="200h" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FormFieldText form={form} name="area" label="Área do Conhecimento" placeholder="Ciências Exatas" />
          <FormFieldText form={form} name="unidade" label="Unidade" placeholder="Centro" />
          <FormFieldText form={form} name="inicio" label="Data de Início" type="date" />
          <FormFieldText form={form} name="fim" label="Data de Encerramento" type="date" />
        </div>

        <div className="flex flex-col gap-8">
            <FormField
                control={form.control}
                name="ementa"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="font-bold text-sm text-foreground/80 ml-1">Ementa</FormLabel>
                        <FormControl>
                            <Textarea {...field} className="min-h-[150px] bg-white border-primaria/20 rounded-2xl" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="bibliografia"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="font-bold text-sm text-foreground/80 ml-1">Bibliografia</FormLabel>
                        <FormControl>
                            <Textarea {...field} className="min-h-[150px] bg-white border-primaria/20 rounded-2xl" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        <FormButtons isSubmitting={isSubmitting} isEdit={isEdit} />
      </form>
    </Form>
  );
};
