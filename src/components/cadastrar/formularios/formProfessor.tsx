"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { usePageType } from "@/context/pageTypeContext";
import { cadastroProfessorSchema } from "@/lib/schemas/cadastroProfessorSchema";
import { Professor } from "@/types/professor";
import { AddressFields } from "./formGroups/addressFields";
import { AuthFields } from "./formGroups/AuthFields";
import { PersonalDataFields } from "./formGroups/personalDataFields";
import { ProfessorDataFields } from "./formGroups/professorDataFields";
import { FormButtons } from "./formComponents/formButtons";
import {
  useCreateProfessor,
  useUpdateProfessor,
} from "@/hooks/queries/professor";

type Props = {
  isEdit?: boolean;
  defaultValues?: Professor;
  onRefresh?: () => void;
};

const createValidDate = (value?: string | null) => {
  if (!value) {
    return undefined;
  }

  const parsedDate = new Date(value);
  return Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate;
};

export const FormProfessor = ({
  isEdit = false,
  defaultValues,
  onRefresh,
}: Props) => {
  const { type } = usePageType();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const schema = cadastroProfessorSchema(isEdit);
  const createMutation = useCreateProfessor();
  const updateMutation = useUpdateProfessor();

  if (type !== "professor") {
    return null;
  }

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
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
      matriculaAdpm: defaultValues?.matricula_adpm ?? "",
      codigoDisciplina: defaultValues?.codigo_disciplina ?? "",
      senha: "",
      confirmarSenha: "",
    },
  });

  const senhaValue = form.watch("senha");

  useEffect(() => {
    form.trigger("confirmarSenha");
  }, [senhaValue, form]);

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
      matricula_adpm: data.matriculaAdpm,
      codigo_disciplina: data.codigoDisciplina,
      password: data.senha || undefined,
    };

    try {
      if (isEdit && defaultValues) {
        await updateMutation.mutateAsync({
          id: defaultValues.id_professor,
          payload,
        });
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
        <ProfessorDataFields isEdit={isEdit} />
        <AuthFields isEdit={isEdit} />
        <FormButtons isSubmitting={isSubmitting} isEdit={isEdit} />
      </form>
    </Form>
  );
};
