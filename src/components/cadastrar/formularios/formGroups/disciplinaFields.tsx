import { FormFieldText } from "../formComponents/formFieldText"
import { useFormContext } from "react-hook-form";
import { FormFieldSelect } from "../formComponents/formFieldSelect";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CalendarioCadastro } from "@/components/ui/calendarioCadastro";
import { TitleForm } from "../formComponents/titleForm";

type Props = {
    isEdit?: boolean;
}

export const DisciplinaFields = ({ isEdit = false }: Props) => {

    const form = useFormContext();

    return (
        <>
            <TitleForm text="Informações da Disciplina" />
            <div className={`${!isEdit ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-4' : 'grid md:grid-cols-1 lg:grid-cols-2 gap-4'}`}>
                <FormFieldText
                    form={form}
                    name="nomeDisciplina"
                    label="Nome da Disciplina"
                    placeholder="Ex: Introdução à Programação"
                />

                <FormFieldText
                    form={form}
                    name="sigla"
                    label="Sigla"
                    placeholder="Ex: IP101"
                />

                <FormFieldText
                    form={form}
                    name="areaConhecimento"
                    label="Área de Conhecimento"
                    placeholder="Ex: Tecnologia da Informação"
                />

                <FormFieldText
                    form={form}
                    name="unidade"
                    label="Unidade"
                    placeholder="Ex: Departamento de Computação"
                />

                <FormFieldText
                    form={form}
                    name="cargaHoraria"
                    label="Carga Horária"
                    placeholder="Ex: 60"
                />

                <FormField
                    control={form.control}
                    name="dataInicio"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Data de Início</FormLabel>
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
                            <FormLabel>Data de Encerramento</FormLabel>
                            <CalendarioCadastro
                                value={field.value}
                                onValueChange={field.onChange}
                                disabled={(date) => {
                                    const dataInicio = form.watch("dataInicio");
                                    return date < new Date("1900-01-01") || 
                                           (dataInicio && date < dataInicio);
                                }}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormFieldText
                    form={form}
                    name="ementa"
                    label="Ementa"
                    placeholder="Digite a ementa da disciplina"
                />

                <FormFieldText
                    form={form}
                    name="bibliografia"
                    label="Bibliografia"
                    placeholder="Digite a bibliografia"
                />
            </div>
        </>
    )
}