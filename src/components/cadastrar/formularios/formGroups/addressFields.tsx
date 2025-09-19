import { useFormContext } from "react-hook-form";
import { FormFieldText } from "../formComponents/formFieldText";
import { TitleForm } from "../formComponents/titleForm";
import { FormFieldMask } from "../formComponents/formFielMask";
import { FormFieldSelect } from "../formComponents/formFieldSelect";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CalendarioCadastro } from "@/components/ui/calendarioCadastro";
import { useIBGE } from "@/hooks/use-ibge";

export const AddressFields = () => {

    const form = useFormContext();
    const estadoSelecionado = form.watch("estado");
    const { states, cities, loadingStates, loadingCities } = useIBGE(estadoSelecionado);

    return (
        <>
            <TitleForm text="Informações de Endereço" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <FormFieldText
                            form={form}
                            name="logradouro"
                            label="Logradouro"
                            placeholder="Ex: Rua, Avenida, Travessa..."
                        />
                        <FormFieldText
                            form={form}
                            name="numero"
                            label="Número"
                            placeholder="Ex: 1234"
                        />

                        <FormFieldText
                            form={form}
                            name="bairro"
                            label="Bairro"
                            placeholder="Ex: Centro"
                        />
                        <FormFieldText
                            form={form}
                            name="complemento"
                            label="Complemento"
                            placeholder="Ex: Casa, Apto..."
                        />

                        <FormFieldSelect
                            form={form}
                            name="estado"
                            label="Estado"
                            options={states.map((estado) => ({
                                value: estado.sigla,
                                label: estado.nome,
                            }))}
                            placeholder={
                                !loadingStates ? "Selecione o estado" : "Carregando..."
                            }
                        />

                        <FormFieldSelect
                            form={form}
                            name="cidade"
                            label="Cidade"
                            options={cities.map((cidade) => ({
                                value: cidade.nome,
                                label: cidade.nome,
                            }))}
                            placeholder={
                                !loadingCities
                                    ? estadoSelecionado
                                        ? "Selecione a cidade"
                                        : "Primeiro selecione um estado"
                                    : "Carregando..."
                            }
                            disabled={!estadoSelecionado || loadingCities}
                        />

                    </div>
        </>
    )
}