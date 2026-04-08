import { useFormContext } from "react-hook-form";
import { TitleForm } from "../formComponents/titleForm";
import { FormFieldSelect } from "../formComponents/formFieldSelect";
import { FormFieldText } from "../formComponents/formFieldText";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

export const CursoDataFields = () => {
  const form = useFormContext();

  return (
    <>
      <TitleForm text="Informações do Curso" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FormFieldSelect
          form={form}
          name="nome"
          label="Nome do Curso"
          options={[
            { value: "Fundamental I", label: "Fundamental I" },
            { value: "Fundamental II", label: "Fundamental II" },
          ]}
          placeholder="Selecione o curso"
        />
        <FormFieldText
          form={form}
          name="numeroPeriodos"
          label="Número de Períodos"
          type="number"
          placeholder="Ex: 8"
        />
        <FormFieldText
          form={form}
          name="cargaHorariaTotal"
          label="Carga Horária Total"
          type="number"
          placeholder="Ex: 1200"
        />
        <FormFieldText
          form={form}
          name="cargaHorariaPeriodo"
          label="Carga Horária por Período"
          type="number"
          placeholder="Ex: 150"
        />
        <FormFieldSelect
          form={form}
          name="status"
          label="Status"
          options={[
            { value: "ativo", label: "Ativo" },
            { value: "inativo", label: "Inativo" },
          ]}
          placeholder="Selecione o status"
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
                placeholder="Descreva o curso"
                className="min-h-[120px] resize-y"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
