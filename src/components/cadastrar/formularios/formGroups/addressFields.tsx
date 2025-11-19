import { useFormContext } from "react-hook-form";
import { FormFieldText } from "../formComponents/formFieldText";
import { TitleForm } from "../formComponents/titleForm";
import { FormFieldMask } from "../formComponents/formFielMask";
import { FormFieldSelect } from "../formComponents/formFieldSelect";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CalendarioCadastro } from "@/components/ui/calendarioCadastro";
import { useIBGE } from "@/hooks/use-ibge";
import { useEffect, useRef } from "react";

type Props = {
    isEdit?: boolean;
}

export const AddressFields = ({ isEdit = false }: Props) => {

    const form = useFormContext();
    const estadoSelecionado = form.watch("estado");
    const cidadeAtual = form.watch("cidade");
    const { states, cities, loadingStates, loadingCities } = useIBGE(estadoSelecionado);
    const cidadeJaSetada = useRef(false);

    // Reseta a flag quando o estado mudar
    useEffect(() => {
        cidadeJaSetada.current = false;
    }, [estadoSelecionado]);

    // Seta a cidade quando as cidades forem carregadas e o estado estiver selecionado
    useEffect(() => {
        if (isEdit && estadoSelecionado && !loadingCities && cities.length > 0 && cidadeAtual && !cidadeJaSetada.current) {
            // Verifica se a cidade atual existe na lista de cidades carregadas
            const cidadeExiste = cities.some(cidade => cidade.nome === cidadeAtual);
            if (cidadeExiste) {
                // A cidade já está setada corretamente
                cidadeJaSetada.current = true;
            } else if (cidadeAtual) {
                // Tenta encontrar uma cidade com nome similar (case-insensitive)
                const cidadeEncontrada = cities.find(
                    cidade => cidade.nome.toLowerCase() === cidadeAtual.toLowerCase()
                );
                if (cidadeEncontrada) {
                    form.setValue("cidade", cidadeEncontrada.nome);
                    cidadeJaSetada.current = true;
                }
            }
        }
    }, [isEdit, estadoSelecionado, loadingCities, cities, cidadeAtual, form]);

    return (
        <>
            <TitleForm text="Informações de Endereço" />
            <div className={`${!isEdit ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-4' : 'grid md:grid-cols-1 lg:grid-cols-2 gap-4'}`}>
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