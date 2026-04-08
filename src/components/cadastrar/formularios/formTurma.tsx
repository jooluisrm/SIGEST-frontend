"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { postCadastrarTurma } from "@/api/turma/turmaServices";
import { getPeriodos } from "@/api/periodo/periodoServices";
import { TurmaDataFields } from "./formGroups/turmaDataFields";
import { FormButtons } from "./formComponents/formButtons";
import { usePageType } from "@/context/pageTypeContext";
import { cadastroTurmaSchema } from "@/lib/schemas/cadastroTurmaSchema";
import { Classroom } from "@/types/classroom";

type Props = {
  isEdit?: boolean;
  defaultValues?: Classroom;
  onRefresh?: () => void;
};

type Option = {
  value: string;
  label: string;
};

export const FormTurma = ({ onRefresh }: Props) => {
  const { type } = usePageType();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [periodOptions, setPeriodOptions] = useState<Option[]>([]);
  const schema = cadastroTurmaSchema();

  if (type !== "turma") {
    return null;
  }

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema) as never,
    defaultValues: {
      periodoId: "",
      nome: "",
      maximoAlunos: "",
      turno: "Matutino",
      status: "ativo",
    },
  });

  useEffect(() => {
    let active = true;

    const loadPeriods = async () => {
      const response = await getPeriodos();
      if (!active) {
        return;
      }

      startTransition(() => {
        setPeriodOptions(
          response.data.map((period) => ({
            value: String(period.id),
            label: period.name,
          }))
        );
      });
    };

    loadPeriods();

    return () => {
      active = false;
    };
  }, []);

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setIsSubmitting(true);

    try {
      await postCadastrarTurma({
        period_id: Number(data.periodoId),
        name: data.nome,
        max_students: Number(data.maximoAlunos),
        shift: data.turno,
        status: data.status === "ativo",
      });
      onRefresh?.();
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
        <TurmaDataFields periodOptions={periodOptions} />
        <FormButtons isSubmitting={isSubmitting} />
      </form>
    </Form>
  );
};
