"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { usePageType } from "@/context/pageTypeContext";
import {
  CadastroDisciplinaFormValues,
  cadastroDisciplinaSchema,
} from "@/lib/schemas/cadastroDisciplinaSchema";
import { Disciplina } from "@/types/disciplina";
import { DisciplinaFields } from "./formGroups/disciplinaFields";
import { FormButtons } from "./formComponents/formButtons";
import {
  postCadastrarDisciplina,
  putAtualizarDisciplina,
} from "@/api/disciplina/disciplinaServices";

type Props = {
  isEdit?: boolean;
  defaultValues?: Disciplina;
  onRefresh?: () => void;
};

const createValidDate = (value?: string | null) => {
  if (!value) {
    return undefined;
  }

  const parsedDate = new Date(value);
  return Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate;
};

export const FormDisciplina = ({
  isEdit = false,
  defaultValues,
  onRefresh,
}: Props) => {
  const { type } = usePageType();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const schema = cadastroDisciplinaSchema();

  if (type !== "disciplina") {
    return null;
  }

  const form = useForm<CadastroDisciplinaFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      nomeDisciplina: defaultValues?.nome ?? "",
      sigla: defaultValues?.sigla ?? "",
      areaConhecimento: defaultValues?.area_conhecimento ?? "",
      unidade: defaultValues?.unidade ?? "",
      cargaHoraria: defaultValues?.carga_horaria ?? "",
      dataInicio: createValidDate(defaultValues?.data_inicio) ?? new Date(),
      dataEncerramento: createValidDate(defaultValues?.data_encerramento),
      ementa: defaultValues?.ementa ?? "",
      bibliografia: defaultValues?.bibliografia ?? "",
    },
  });

  const onSubmit = async (data: CadastroDisciplinaFormValues) => {
    setIsSubmitting(true);

    const payload = {
      nome: data.nomeDisciplina,
      sigla: data.sigla,
      area_conhecimento: data.areaConhecimento,
      unidade: data.unidade,
      carga_horaria: data.cargaHoraria,
      data_inicio: data.dataInicio.toISOString().split("T")[0],
      data_encerramento: data.dataEncerramento
        ? data.dataEncerramento.toISOString().split("T")[0]
        : undefined,
      ementa: data.ementa,
      bibliografia: data.bibliografia,
    };

    try {
      if (isEdit && defaultValues) {
        await putAtualizarDisciplina(defaultValues.id, payload);
        onRefresh?.();
      } else {
        await postCadastrarDisciplina(payload);
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
        <DisciplinaFields isEdit={isEdit} />
        <FormButtons isSubmitting={isSubmitting} isEdit={isEdit} />
      </form>
    </Form>
  );
};
