"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import { FormFieldText } from "./formComponents/formFieldText";
import { FormButtons } from "./formComponents/formButtons";
import { Textarea } from "@/components/ui/textarea";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { TitleForm } from "./formComponents/titleForm";
import { Course } from "@/types/course";
import { useCreateCurso, useUpdateCurso } from "@/hooks/queries/curso";

const cursoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  series: z.string().min(1, "Quantidade de séries é obrigatória"),
  cargaTotal: z.string().min(1, "Carga horária total é obrigatória"),
  cargaSerie: z.string().min(1, "Carga horária por série é obrigatória"),
  complementares: z.string().optional(),
});

type Props = {
  isEdit?: boolean;
  defaultValues?: Course;
  onRefresh?: () => void;
};

export const FormCurso = ({ isEdit, defaultValues, onRefresh }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createMutation = useCreateCurso();
  const updateMutation = useUpdateCurso();

  const form = useForm<z.infer<typeof cursoSchema>>({
    resolver: zodResolver(cursoSchema),
    defaultValues: {
      nome: defaultValues?.name ?? "",
      series: defaultValues?.number_periods ? String(defaultValues.number_periods) : "",
      cargaTotal: defaultValues?.total_hours ? String(defaultValues.total_hours) : "",
      cargaSerie: defaultValues?.hours_period ? String(defaultValues.hours_period) : "",
      complementares: defaultValues?.details ?? "",
    },
  });

  const onSubmit = async (data: z.infer<typeof cursoSchema>) => {
    setIsSubmitting(true);

    const payload = {
      name: data.nome,
      number_periods: Number(data.series),
      total_hours: Number(data.cargaTotal),
      hours_period: Number(data.cargaSerie),
      details: data.complementares,
      status: true, // Defaulting to active as the new schema doesn't have status field
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8 px-5">
        <TitleForm text="Dados do Curso" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormFieldText
            form={form}
            name="nome"
            label="Nome do Curso"
            placeholder="Fundamental I"
          />
          <FormFieldText
            form={form}
            name="series"
            label="Quantidade de Séries?"
            placeholder="3"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormFieldText
            form={form}
            name="cargaTotal"
            label="Carga Horária Total"
            placeholder="800h"
          />
          <FormFieldText
            form={form}
            name="cargaSerie"
            label="Carga Horária por Série"
            placeholder="160h"
          />
        </div>

        <FormField
          control={form.control}
          name="complementares"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-sm text-foreground/80 ml-1">Informações Complementares</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Aqui vão estar descritas as informações complementares relacionadas ao curso"
                  className="min-h-[200px] bg-white border-primaria/20 rounded-2xl"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormButtons isSubmitting={isSubmitting} isEdit={isEdit} />
      </form>
    </Form>
  );
};
