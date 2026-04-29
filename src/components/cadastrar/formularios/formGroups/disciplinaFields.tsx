import { FormFieldText } from "../formComponents/formFieldText"
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import { CalendarioCadastro } from "@/components/ui/calendarioCadastro";
import { TitleForm } from "../formComponents/titleForm";
import { Textarea } from "@/components/ui/textarea";

type Props = {
    isEdit?: boolean;
}

export const DisciplinaFields = ({ isEdit = false }: Props) => {

    const form = useFormContext();

  return (
    <div className="flex flex-col gap-10">
      <TitleForm text="Dados da Disciplina" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FormFieldText
          form={form}
          name="nomeDisciplina"
          label="Nome Disciplina"
          placeholder="Insira o nome da disciplina"
        />
        <FormFieldText
          form={form}
          name="sigla"
          label="Sigla"
          placeholder="Insira a sigla"
        />
        <FormFieldText
          form={form}
          name="cargaHoraria"
          label="Carga Horária"
          placeholder="Insira a carga horária"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <FormFieldText
          form={form}
          name="areaConhecimento"
          label="Área do Conhecimento"
          placeholder="Selecione a área"
        />
        <FormFieldText
          form={form}
          name="unidade"
          label="Unidade"
          placeholder="Selecione a unidade"
        />
        <FormField
          control={form.control}
          name="dataInicio"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-bold text-sm text-foreground/80 ml-1">Data de Início</FormLabel>
              <CalendarioCadastro
                value={field.value}
                onValueChange={field.onChange}
                disabled={(date) => date < new Date("1900-01-01")}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dataEncerramento"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-bold text-sm text-foreground/80 ml-1">Data de Encerramento</FormLabel>
              <CalendarioCadastro
                value={field.value}
                onValueChange={field.onChange}
                disabled={(date) => {
                  const dataInicio = form.watch("dataInicio");
                  return date < new Date("1900-01-01") || (dataInicio && date < dataInicio);
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex flex-col gap-8">
        <FormField
          control={form.control}
          name="ementa"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-sm text-foreground/80 ml-1">Ementa</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Insira a ementa"
                  className="min-h-[150px] bg-white border-primaria/20 rounded-2xl"
                />
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
                <Textarea
                  {...field}
                  placeholder="Insira a bibliografia"
                  className="min-h-[150px] bg-white border-primaria/20 rounded-2xl"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};