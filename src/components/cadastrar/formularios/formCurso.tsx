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
import { PeriodoLetivoModal } from "@/components/gerenciar/specialized/PeriodoLetivoModal";

const cursoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  series: z.string().min(1, "Quantidade de períodos é obrigatória"),
  cargaTotal: z.string().min(1, "Carga horária total é obrigatória"),
  cargaSerie: z.string().min(1, "Carga horária por série é obrigatória"),
  detalhes: z.string().min(1, "Detalhes são obrigatórios"),
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
      detalhes: defaultValues?.details ?? "",
    },
  });

  const onSubmit = async (data: z.infer<typeof cursoSchema>) => {
    setIsSubmitting(true);

    const payload = {
      name: data.nome,
      number_periods: Number(data.series),
      total_hours: Number(data.cargaTotal),
      hours_period: Number(data.cargaSerie),
      details: data.detalhes,
      status: true, 
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
            label="Quantidade de Períodos"
            placeholder="3"
          />
        </div>

        {isEdit && (
          <div className="flex flex-col gap-2">
            <label className="font-bold text-sm text-foreground/80 ml-1">Período Letivo</label>
            <PeriodoLetivoModal courseId={defaultValues?.id ?? 0} />
          </div>
        )}

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
          name="detalhes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detalhes</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Informe detalhes do curso"
                  className="min-h-28 border-primaria focus-visible:ring-primaria"
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
