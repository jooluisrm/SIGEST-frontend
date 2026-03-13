"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AppInput } from "@/components/shared/app-input";
import { AppSelect } from "@/components/shared/app-select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cadastroCursoSchema } from "@/lib/schemas/cadastroCursoSchema";

type FormCursoProps = {
    onCancel?: () => void;
    onSubmitSuccess?: () => void;
};

export const FormCurso = ({ onCancel, onSubmitSuccess }: FormCursoProps) => {

    const form = useForm<z.infer<typeof cadastroCursoSchema>>({
        resolver: zodResolver(cadastroCursoSchema),
        defaultValues: {
            nomeCurso: "",
            quantidadeSeries: "",
            cargaHorariaTotal: "",
            cargaHorariaPorSerie: "",
            informacoesComplementares: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof cadastroCursoSchema>) => {
        console.log("Form data:", data);
        if (onSubmitSuccess) {
            onSubmitSuccess();
        }
    };

    const cursoOptions = [
        { value: "informatica", label: "Informática" },
        { value: "administracao", label: "Administração" },
        { value: "enfermagem", label: "Enfermagem" },
    ];

    return (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 mt-4 max-w-4xl">
            <h2 className="text-xl font-bold mb-6">Informações do Curso</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="nomeCurso"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome do Curso</FormLabel>
                                    <FormControl>
                                        <AppSelect
                                            options={cursoOptions}
                                            placeholder="Insira o nome do curso"
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            className="w-full h-11 bg-gray-100 border-green-500 rounded-md"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="quantidadeSeries"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quantidade de Séries?</FormLabel>
                                    <FormControl>
                                        <AppInput
                                            id="quantidadeSeries"
                                            placeholder="Insira a quantidade de séries do curso"
                                            className="bg-gray-100 border-green-500 rounded-md"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="cargaHorariaTotal"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Carga Horária Total</FormLabel>
                                    <FormControl>
                                        <AppInput
                                            id="cargaHorariaTotal"
                                            placeholder="Insira a carga horária total do curso"
                                            className="bg-gray-100 border-green-500 rounded-md"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="cargaHorariaPorSerie"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Carga Horária por Série</FormLabel>
                                    <FormControl>
                                        <AppInput
                                            id="cargaHorariaPorSerie"
                                            placeholder="Insira a carga horária total do curso"
                                            className="bg-gray-100 border-green-500 rounded-md"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="informacoesComplementares"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Informações Complementares</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder=""
                                        className="h-40 bg-gray-100 border-green-500 resize-none rounded-md"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex gap-4 pt-4">
                        <Button type="submit" className="bg-[#00923F] hover:bg-green-700 text-white font-bold py-2 px-8 rounded-md text-base">
                            Criar
                        </Button>
                        <Button type="button" variant="destructive" onClick={onCancel} className="bg-[#FE2B40] hover:bg-red-600 text-white font-bold py-2 px-8 rounded-md text-base">
                            Cancelar
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};
