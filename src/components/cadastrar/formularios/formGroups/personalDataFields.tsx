// src/components/cadastro/formGroups/PersonalDataFields.tsx

import { useFormContext } from "react-hook-form";
import { FormFieldText } from "../formComponents/formFieldText";
import { TitleForm } from "../formComponents/titleForm";
import { FormFieldMask } from "../formComponents/formFielMask";
import { FormFieldSelect } from "../formComponents/formFieldSelect";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CalendarioCadastro } from "@/components/ui/calendarioCadastro";
import { useEffect } from "react";


type Props = {
    possuiDeficiencia: string;
}

export const PersonalDataFields = () => {

    const form = useFormContext();

    const possuiDeficiencia = form.watch("possuiDeficiencia");
    useEffect(() => {
        if (possuiDeficiencia === "nao") {
            form.setValue("qualDeficiencia", "", { shouldValidate: true });
        }
    }, [possuiDeficiencia, form]);

    return (
        <>
            <TitleForm text="Informações Pessoais" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormFieldText
                    form={form}
                    name="nomeCompleto"
                    label="Nome Completo"
                    placeholder="Digite seu nome completo"
                />
                <FormFieldText
                    form={form}
                    name="nomeDoPai"
                    label="Nome do Pai"
                    placeholder="Digite o nome do pai completo"
                />
                <FormFieldText
                    form={form}
                    name="nomeDaMae"
                    label="Nome da Mãe"
                    placeholder="Digite o nome da mãe completo"
                />

                <FormFieldMask
                    form={form}
                    name="cpf"
                    label="CPF"
                    mask="cpf"
                    placeholder="Ex: 000.000.000-00"
                />
                <FormFieldMask
                    form={form}
                    name="rg"
                    label="RG"
                    mask="rg"
                    placeholder="Ex: 00.000.000-0"
                />

                <FormFieldSelect
                    form={form}
                    name="genero"
                    label="Gênero"
                    options={[
                        { value: "masculino", label: "Masculino" },
                        { value: "feminino", label: "Feminino" },
                        { value: "outro", label: "Outro" },
                    ]}
                    placeholder="Selecione um gênero"
                />

                <FormField
                    control={form.control}
                    name="dataNascimento"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Data de Nascimento</FormLabel>
                            <CalendarioCadastro
                                value={field.value}
                                onValueChange={field.onChange}
                                disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormFieldMask
                    form={form}
                    name="telefone"
                    label="Telefone"
                    mask="telefone"
                    placeholder="Ex: (99) 9999-9999"
                />
                <FormFieldMask
                    form={form}
                    name="celular"
                    label="Celular"
                    mask="celular"
                    placeholder="Ex: (99) 99999-9999"
                />

                <FormFieldText
                    form={form}
                    name="email"
                    label="E-mail"
                    type="email"
                    placeholder="Digite seu e-mail"
                />

                <FormFieldSelect
                    form={form}
                    name="possuiDeficiencia"
                    label="Possui alguma deficiência?"
                    options={[
                        { value: "sim", label: "Sim" },
                        { value: "nao", label: "Não" },
                    ]}
                    placeholder="Selecione"
                />

                {possuiDeficiencia === "sim" && (
                    <FormFieldText
                        form={form}
                        name="qualDeficiencia"
                        label="Qual deficiência?"
                        placeholder="Informe a deficiência"
                    />
                )}

            </div>
        </>
    );
}