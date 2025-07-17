"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale"; 
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

type CalendarioCadastroProps = {
    value: Date;
    onValueChange: (date?: Date) => void;
    disabled?: (date: Date) => boolean;
}

export function CalendarioCadastro({ value, onValueChange, disabled }: CalendarioCadastroProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <div className="flex flex-col gap-3">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className="w-full rounded-2xl bg-primaria border-0 h-12 text-white hover:text-white px-4 appearance-none hover:bg-primaria"
                    >
                        {value ? (
                            format(value, "P", { locale: ptBR })
                        ) : (
                            <span>Selecione uma data</span>
                        )}
                        <ChevronDownIcon className="ml-auto text-white h-4 w-4 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        locale={ptBR}
                        selected={value}
                        captionLayout="dropdown"
                        onSelect={(selectedDate) => {
                            onValueChange(selectedDate);
                            setOpen(false);
                        }}
                        disabled={disabled}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}