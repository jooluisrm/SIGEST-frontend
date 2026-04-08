"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { postCadastrarCurso, putAtualizarCurso } from "@/api/curso/cursoServices";
import { CursoDataFields } from "./formGroups/cursoDataFields";
import { FormButtons } from "./formComponents/formButtons";
import { usePageType } from "@/context/pageTypeContext";
import { cadastroCursoSchema } from "@/lib/schemas/cadastroCursoSchema";
import { Course } from "@/types/course";

type Props = {
  isEdit?: boolean;
  defaultValues?: Course;
  onRefresh?: () => void;
};

export const FormCurso = ({
  isEdit = false,
  defaultValues,
  onRefresh,
}: Props) => {
  const { type } = usePageType();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const schema = cadastroCursoSchema();

  if (type !== "curso") {
    return null;
  }

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema) as never,
    defaultValues: {
      nome: defaultValues?.name ?? "",
      numeroPeriodos: defaultValues?.number_periods
        ? String(defaultValues.number_periods)
        : "",
      cargaHorariaTotal: defaultValues?.total_hours
        ? String(defaultValues.total_hours)
        : "",
      cargaHorariaPeriodo: defaultValues?.hours_period
        ? String(defaultValues.hours_period)
        : "",
      detalhes: defaultValues?.details ?? "",
      status: defaultValues?.status === false || defaultValues?.status === 0 ? "inativo" : "ativo",
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setIsSubmitting(true);

    const payload = {
      name: data.nome,
      number_periods: Number(data.numeroPeriodos),
      total_hours: Number(data.cargaHorariaTotal),
      hours_period: Number(data.cargaHorariaPeriodo),
      details: data.detalhes,
      status: data.status === "ativo",
    };

    try {
      if (isEdit && defaultValues) {
        await putAtualizarCurso(defaultValues.id, payload);
        onRefresh?.();
      } else {
        await postCadastrarCurso(payload);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex px-5 flex-col mx-1 mb-5 gap-4 w-full"
        noValidate
      >
        <CursoDataFields />
        <FormButtons isSubmitting={isSubmitting} isEdit={isEdit} />
      </form>
    </Form>
  );
};
