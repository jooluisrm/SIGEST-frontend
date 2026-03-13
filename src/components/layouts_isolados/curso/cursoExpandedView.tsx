"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { AppInput } from "@/components/shared/app-input";
import { Textarea } from "@/components/ui/textarea";
import { PeriodoItem } from "./periodoItem";

type Props = {
    item: any;
};

export const CursoExpandedView = ({ item }: Props) => {
    const form = useForm({
        defaultValues: {
            nomeCurso: item?.nome || "Fundamental I",
            quantidadeSeries: "3",
            cargaHorariaTotal: "800h",
            cargaHorariaPorSerie: "160h",
            informacoesComplementares: "",
        },
    });

    return (
        <div className="bg-white p-8 border-x border-b border-gray-200">

            <h3 className="text-xl font-bold mb-4 text-black text-left">Informações do Curso</h3>

            <Form {...form}>
                <form className="space-y-6 mb-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">

                        <FormField
                            control={form.control}
                            name="nomeCurso"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-medium text-black">Nome do Curso</FormLabel>
                                    <FormControl>
                                        <AppInput
                                            readOnly
                                            className="bg-gray-100 border-green-500 rounded-md text-gray-500 font-medium"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="quantidadeSeries"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-medium text-black">Quantidade de Séries?</FormLabel>
                                    <FormControl>
                                        <AppInput
                                            readOnly
                                            className="bg-gray-100 border-green-500 rounded-md text-gray-500 font-medium"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="cargaHorariaTotal"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-medium text-black">Carga Horária Total</FormLabel>
                                    <FormControl>
                                        <AppInput
                                            readOnly
                                            className="bg-gray-100 border-green-500 rounded-md text-gray-500 font-medium"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="cargaHorariaPorSerie"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-medium text-black">Carga Horária por Série</FormLabel>
                                    <FormControl>
                                        <AppInput
                                            readOnly
                                            className="bg-gray-100 border-green-500 rounded-md text-gray-500 font-medium"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="informacoesComplementares"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-medium text-black">Informações Complementares</FormLabel>
                                <FormControl>
                                    <Textarea
                                        readOnly
                                        placeholder="Aqui vão estar descritas as informações complementares relacionadas ao curso"
                                        className="h-32 bg-gray-100 border-green-500 resize-none rounded-md text-gray-400 font-normal"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>

            <h3 className="text-xl font-bold mb-4 text-black text-left">Períodos Gerados</h3>

            <div className="flex flex-col gap-2">
                <PeriodoItem nome="1º Período (1ª Série)" />
                <PeriodoItem nome="2º Período (2ª Série)" />
            </div>

        </div>
    );
};
