"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { AppInput } from "@/components/shared/app-input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const schema = z.object({
    matutino: z.string().optional(),
    vespertino: z.string().optional(),
});

type Props = {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSave?: (data: z.infer<typeof schema>) => void;
};

export const ModalGerarTurmas = ({ isOpen, onOpenChange, onSave }: Props) => {
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            matutino: "",
            vespertino: "",
        },
    });

    const onSubmit = (data: z.infer<typeof schema>) => {
        if (onSave) onSave(data);
        onOpenChange(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-white p-8 rounded-xl border-none shadow-lg">
                <DialogHeader className="mb-6">
                    <DialogTitle className="text-center text-2xl font-normal text-black">
                        Quantas turmas deseja gerar?
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                        <div className="flex items-center">
                            <div className="w-1/3 bg-[#BCE0C7] text-black text-sm text-center py-3 border border-gray-300 rounded-l-md font-medium">
                                Matutino
                            </div>
                            <div className="w-2/3">
                                <FormField
                                    control={form.control}
                                    name="matutino"
                                    render={({ field }) => (
                                        <FormItem className="space-y-0">
                                            <FormControl>
                                                <AppInput
                                                    id="matutino"
                                                    placeholder="Insira a quantidade de turmas"
                                                    className="rounded-l-none rounded-r-md border border-gray-300 h-11"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="w-1/3 bg-[#BCE0C7] text-black text-sm text-center py-3 border border-gray-300 rounded-l-md font-medium">
                                Vespertino
                            </div>
                            <div className="w-2/3">
                                <FormField
                                    control={form.control}
                                    name="vespertino"
                                    render={({ field }) => (
                                        <FormItem className="space-y-0">
                                            <FormControl>
                                                <AppInput
                                                    id="vespertino"
                                                    placeholder="Insira a quantidade de turmas"
                                                    className="rounded-l-none rounded-r-md border border-gray-300 h-11"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

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
