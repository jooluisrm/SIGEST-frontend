"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { AppInput } from "@/components/shared/app-input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const schema = z.object({
    quantidade: z.string().min(1, "Insira uma quantidade válida"),
});

type Props = {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSave?: (data: z.infer<typeof schema>) => void;
};

export const ModalQuantidadeMaximaAlunos = ({ isOpen, onOpenChange, onSave }: Props) => {
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            quantidade: "",
        },
    });

    const onSubmit = (data: z.infer<typeof schema>) => {
        if (onSave) onSave(data);
        onOpenChange(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-xl bg-white p-8 rounded-xl border-none shadow-lg">
                <DialogHeader className="mb-8 mt-4">
                    <DialogTitle className="text-left text-3xl font-medium text-black">
                        Quantidade máxima de alunos por<br /> turma?
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        <FormField
                            control={form.control}
                            name="quantidade"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <AppInput
                                            id="quantidade"
                                            placeholder="Insira a quantidade de alunos"
                                            className="h-12 border-gray-300 text-center"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-center" />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-center gap-4 mt-10 pt-4 pb-4">
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
