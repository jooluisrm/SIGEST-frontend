"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const schema = z.object({
    turmaSelecionada: z.string({
        required_error: "Selecione uma turma para enturmar o aluno",
    }),
});

type TurmaData = {
    id: string;
    nome: string;
    quantidadeAtual: number;
    capacidade: number;
};

type Props = {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    alunoNome: string;
    periodoSerie: string;
    turmasDisponiveis: TurmaData[];
    onSave?: (data: z.infer<typeof schema>) => void;
};

export const ModalEnturmarAluno = ({
    isOpen,
    onOpenChange,
    alunoNome,
    periodoSerie,
    turmasDisponiveis,
    onSave
}: Props) => {
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: z.infer<typeof schema>) => {
        if (onSave) onSave(data);
        onOpenChange(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-xl bg-white p-8 rounded-xl border-none shadow-lg">
                <DialogHeader className="mb-6">
                    <DialogTitle className="text-left text-2xl font-normal text-black leading-tight">
                        Em qual turma deseja enturmar o <br />aluno {alunoNome}?
                    </DialogTitle>
                </DialogHeader>

                <div className="bg-[#BCE0C7] text-black font-medium py-3 px-4 rounded-t-md mb-2">
                    {periodoSerie}
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                        <FormField
                            control={form.control}
                            name="turmaSelecionada"
                            render={({ field }) => (
                                <FormItem className="space-y-0">
                                    <div className="flex flex-col gap-2">

                                        <div className="flex justify-between px-4 py-2 text-sm font-bold">
                                            <span>Nome da Turma</span>
                                            <span className="mr-8">Quantidade Alunos</span>
                                        </div>

                                        {turmasDisponiveis?.map((turma) => (
                                            <div
                                                key={turma.id}
                                                className="flex items-center justify-between border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer"
                                                onClick={() => field.onChange(turma.id)}
                                            >
                                                <span className="text-sm font-medium">{turma.nome}</span>
                                                <div className="flex items-center gap-6">
                                                    <span className="text-sm">
                                                        {turma.quantidadeAtual}/{turma.capacidade}
                                                    </span>

                                                    <div className={`w-6 h-6 rounded flex items-center justify-center ${field.value === turma.id ? "bg-[#00923F]" : "bg-gray-200 border border-gray-400"
                                                        }`}>
                                                        {field.value === turma.id && (
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-center gap-4 mt-8 pt-4">
                            <Button
                                type="button"
                                onClick={() => onOpenChange(false)}
                                className="bg-[#FE2B40] hover:bg-red-600 text-white font-bold py-2 px-8 rounded-md text-base"
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                className="bg-[#00923F] hover:bg-green-700 text-white font-bold py-2 px-8 rounded-md text-base"
                            >
                                Salvar
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
