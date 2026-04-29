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
    <div className="flex flex-col gap-10">
      <TitleForm text="Dados do Curso" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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
          label="Quantidade de Séries?"
          type="number"
          placeholder="Ex: 8"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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
          label="Carga Horária por Série"
          type="number"
          placeholder="Ex: 150"
        />
      </div>

      <FormField
        control={form.control}
        name="detalhes"
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
    </div>
  );
};
