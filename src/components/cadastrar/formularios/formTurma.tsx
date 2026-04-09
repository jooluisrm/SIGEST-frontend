"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { TurmaDataFields } from "./formGroups/turmaDataFields";
import { FormButtons } from "./formComponents/formButtons";
import { usePageType } from "@/context/pageTypeContext";
import { cadastroTurmaSchema } from "@/lib/schemas/cadastroTurmaSchema";
import { Classroom } from "@/types/classroom";
import { useCreateTurma } from "@/hooks/queries/turma";
import { usePeriodoList } from "@/hooks/queries/periodo";

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
  const schema = cadastroTurmaSchema();
  const createMutation = useCreateTurma();
  const periodosQuery = usePeriodoList();

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

  const periodOptions: Option[] = (periodosQuery.data?.data ?? []).map((period) => ({
    value: String(period.id),
    label: period.name,
  }));

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setIsSubmitting(true);

    try {
      await createMutation.mutateAsync({
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
