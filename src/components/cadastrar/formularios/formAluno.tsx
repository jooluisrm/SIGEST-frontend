"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { AddressFields } from "./formGroups/addressFields";
import { AlunoDataFields } from "./formGroups/alunoDataFields";
import { AuthFields } from "./formGroups/AuthFields";
import { PersonalDataFields } from "./formGroups/personalDataFields";
import { FormButtons } from "./formComponents/formButtons";
import { useCreateAluno, useUpdateAluno } from "@/hooks/queries/aluno";
import { usePeriodoList } from "@/hooks/queries/periodo";
import { useTurmasByPeriodo } from "@/hooks/queries/turma";
import { usePageType } from "@/context/pageTypeContext";
import { Aluno } from "@/types/aluno";
import { cadastroAlunoSchema } from "@/lib/schemas/cadastroAlunoSchema";

type Props = {
  isEdit?: boolean;
  defaultValues?: Aluno;
  onRefresh?: () => void;
};

type Option = {
  value: string;
  label: string;
};

const createValidDate = (value?: string | null) => {
  if (!value) {
    return undefined;
  }

  const parsedDate = new Date(value);
  return Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate;
};

export const FormAluno = ({
  isEdit = false,
  defaultValues,
  onRefresh,
}: Props) => {
  const { type } = usePageType();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const schema = cadastroAlunoSchema(isEdit);
  const createMutation = useCreateAluno();
  const updateMutation = useUpdateAluno();

  if (type !== "aluno") {
    return null;
  }

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema) as never,
    defaultValues: {
      nomeCompleto: defaultValues?.name ?? "",
      dataNascimento: createValidDate(defaultValues?.data_nascimento),
      cpf: defaultValues?.cpf ?? "",
      rg: defaultValues?.rg ?? "",
      genero: defaultValues?.genero?.toLowerCase() ?? "",
      nomeDoPai: defaultValues?.nome_pai ?? "",
      nomeDaMae: defaultValues?.nome_mae ?? "",
      possuiDeficiencia:
        defaultValues?.deficiencia && defaultValues.deficiencia !== "Nenhuma"
          ? "sim"
          : "nao",
      qualDeficiencia:
        defaultValues?.deficiencia && defaultValues.deficiencia !== "Nenhuma"
          ? defaultValues.deficiencia
          : "",
      logradouro: defaultValues?.logradouro ?? "",
      numero: defaultValues?.numero ?? "",
      bairro: defaultValues?.bairro ?? "",
      complemento: defaultValues?.complemento ?? "",
      cidade: defaultValues?.cidade ?? "",
      estado: defaultValues?.estado ?? "",
      telefone: defaultValues?.telefone ?? "",
      celular: defaultValues?.celular ?? "",
      email: defaultValues?.email ?? "",
      matricula: defaultValues?.matricula ?? "",
      periodoId: defaultValues?.period_id ? String(defaultValues.period_id) : "",
      turmaId: defaultValues?.classroom_id ? String(defaultValues.classroom_id) : "",
      status: defaultValues?.status === false || defaultValues?.status === 0 ? "inativo" : "ativo",
      senha: "",
      confirmarSenha: "",
    },
  });

  const selectedPeriod = form.watch("periodoId");
  const periodosQuery = usePeriodoList();
  const turmasQuery = useTurmasByPeriodo(
    selectedPeriod ? Number(selectedPeriod) : null,
    !!selectedPeriod
  );

  const periodOptions: Option[] = (periodosQuery.data?.data ?? []).map((period) => ({
    value: String(period.id),
    label: period.name,
  }));
  const classroomOptions: Option[] = (turmasQuery.data?.data ?? []).map((classroom) => ({
    value: String(classroom.id),
    label: classroom.name,
  }));

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setIsSubmitting(true);

    const payload = {
      name: data.nomeCompleto,
      cpf: data.cpf,
      rg: data.rg,
      data_nascimento: data.dataNascimento.toISOString().split("T")[0],
      nome_pai: data.nomeDoPai || null,
      nome_mae: data.nomeDaMae,
      genero: data.genero || null,
      deficiencia:
        data.possuiDeficiencia === "sim" ? data.qualDeficiencia ?? "Nenhuma" : "Nenhuma",
      logradouro: data.logradouro,
      numero: data.numero,
      bairro: data.bairro,
      complemento: data.complemento || null,
      cidade: data.cidade,
      estado: data.estado,
      telefone: data.telefone || null,
      celular: data.celular,
      email: data.email,
      matricula: data.matricula,
      period_id: data.periodoId ? Number(data.periodoId) : undefined,
      classroom_id: data.turmaId ? Number(data.turmaId) : null,
      status: data.status === "ativo",
      password: data.senha || undefined,
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex px-5 flex-col mx-1 mb-5 gap-4 w-full"
        noValidate
      >
        <PersonalDataFields isEdit={isEdit} />
        <AddressFields isEdit={isEdit} />
        <AlunoDataFields
          isEdit={isEdit}
          periodOptions={periodOptions}
          classroomOptions={classroomOptions}
          classroomDisabled={!selectedPeriod || turmasQuery.isLoading}
        />
        <AuthFields isEdit={isEdit} />
        <FormButtons isSubmitting={isSubmitting} isEdit={isEdit} />
      </form>
    </Form>
  );
};
