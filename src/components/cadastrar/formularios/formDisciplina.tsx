"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormFieldText } from "./formComponents/formFieldText";
import { FormButtons } from "./formComponents/formButtons";
import { TitleForm } from "./formComponents/titleForm";
import { Textarea } from "@/components/ui/textarea";
import { FormFieldSelect } from "./formComponents/formFieldSelect";
import { useTurmaList } from "@/hooks/queries/turma";
import { useProfessorList } from "@/hooks/queries/professor";
import { Disciplina } from "@/types/disciplina";
import { useCreateDisciplina, useUpdateDisciplina } from "@/hooks/queries/disciplina";

const disciplinaSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres").max(35),
  sigla: z.string().min(1, "Sigla é obrigatória").max(15),
  area_conhecimento: z.string().min(1, "Área é obrigatória").max(35),
  unidade: z.string().min(1, "Unidade é obrigatória").max(50),
  carga_horaria: z.string().min(1, "Carga horária é obrigatória"),
  data_inicio: z.string().min(1, "Data de início é obrigatória"),
  data_encerramento: z.string().min(1, "Data de encerramento é obrigatória"),
  ementa: z.string().min(1, "Ementa é obrigatória").max(500),
  bibliografia: z.string().min(1, "Bibliografia é obrigatória").max(300),
  turmaId: z.string().optional(),
  professorId: z.string().optional(),
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

  const turmasQuery = useTurmaList();
  const professoresQuery = useProfessorList();

  const turmaOptions = (turmasQuery.data?.data ?? [])
    .filter((t) => t.id !== undefined)
    .map((t) => ({ value: String(t.id), label: t.name }));

  const professorOptions = (professoresQuery.data?.data ?? [])
    .filter((p) => p.id_professor !== undefined)
    .map((p) => ({ value: String(p.id_professor), label: p.name ?? `Professor ${p.id_professor}` }));

  const form = useForm<z.infer<typeof disciplinaSchema>>({
    resolver: zodResolver(disciplinaSchema),
    defaultValues: {
      nome: defaultValues?.nome ?? "",
      sigla: defaultValues?.sigla ?? "",
      area_conhecimento: defaultValues?.area_conhecimento ?? "",
      unidade: defaultValues?.unidade ?? "",
      carga_horaria: defaultValues?.carga_horaria ?? "",
      data_inicio: defaultValues?.data_inicio ?? "",
      data_encerramento: defaultValues?.data_encerramento ?? "",
      ementa: defaultValues?.ementa ?? "",
      bibliografia: defaultValues?.bibliografia ?? "",
      turmaId: "",
      professorId: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof disciplinaSchema>) => {
    setIsSubmitting(true);
    // Removemos os campos de vínculo antes de enviar ao backend
    const { turmaId, professorId, ...payload } = data;
    
    try {
      if (isEdit && defaultValues) {
        await updateMutation.mutateAsync({
          id: defaultValues.id,
          payload: payload as any,
        });
      } else {
        await createMutation.mutateAsync(payload as any);
      }
      onRefresh?.();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-10 px-5">
        <TitleForm text="Dados da Disciplina" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FormFieldText form={form} name="nome" label="Nome Disciplina" placeholder="Ex: Matemática I" />
          <FormFieldText form={form} name="sigla" label="Sigla" placeholder="Ex: MAT101" />
          <FormFieldText form={form} name="area_conhecimento" label="Área do Conhecimento" placeholder="Ex: Ciências Exatas" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormFieldText form={form} name="unidade" label="Unidade" placeholder="Ex: Unidade I" />
          <FormFieldText form={form} name="carga_horaria" label="Carga Horária" placeholder="Ex: 60h" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormFieldSelect form={form} name="turmaId" label="Vincular Turma" options={turmaOptions} placeholder="Selecione uma turma" />
          <FormFieldSelect form={form} name="professorId" label="Vincular Professor" options={professorOptions} placeholder="Selecione um professor" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormFieldText form={form} name="data_inicio" label="Data de Início" type="date" />
          <FormFieldText form={form} name="data_encerramento" label="Data de Encerramento" type="date" />
        </div>

        <div className="flex flex-col gap-8">
          <FormField
            control={form.control}
            name="ementa"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-sm text-foreground/80 ml-1">Ementa</FormLabel>
                <FormControl>
                  <Textarea {...field} className="min-h-[120px] bg-white border-primaria/20 rounded-2xl" placeholder="Descreva a ementa da disciplina..." />
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
                  <Textarea {...field} className="min-h-[100px] bg-white border-primaria/20 rounded-2xl" placeholder="Liste a bibliografia básica..." />
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
