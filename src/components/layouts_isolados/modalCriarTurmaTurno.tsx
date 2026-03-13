"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const schema = z.object({
    turno: z.enum(["matutino", "vespertino"], {
        required_error: "Selecione um turno",
    }),
});

type Props = {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSave?: (data: z.infer<typeof schema>) => void;
};

export const ModalCriarTurmaTurno = ({ isOpen, onOpenChange, onSave }: Props) => {
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
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
                        Qual turno você deseja criar a turma?
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                        <FormField
                            control={form.control}
                            name="turno"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <div className="flex flex-col gap-3">
                                        <FormControl>
                                            <button
                                                type="button"
                                                onClick={() => field.onChange("matutino")}
                                                className={`w-full py-3 text-center border rounded-md text-sm font-medium transition-colors ${field.value === "matutino"
                                                        ? "bg-[#BCE0C7] border-green-500 text-black"
                                                        : "bg-white border-gray-300 text-black hover:bg-gray-50"
                                                    }`}
                                            >
                                                Matutino
                                            </button>
                                        </FormControl>
                                        <FormControl>
                                            <button
                                                type="button"
                                                onClick={() => field.onChange("vespertino")}
                                                className={`w-full py-3 text-center border rounded-md text-sm font-medium transition-colors ${field.value === "vespertino"
                                                        ? "bg-[#BCE0C7] border-green-500 text-black"
                                                        : "bg-white border-gray-300 text-black hover:bg-gray-50"
                                                    }`}
                                            >
                                                Vespertino
                                            </button>
                                        </FormControl>
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
