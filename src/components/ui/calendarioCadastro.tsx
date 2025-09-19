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
    label?: string;
    disabled?: (date: Date) => boolean;
}

export function CalendarioCadastro({ value, onValueChange, disabled, label }: CalendarioCadastroProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <div className="flex flex-col">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className="w-full border-primaria"
                    >
                        {value ? (
                            format(value, "P", { locale: ptBR })
                        ) : (
                            <span className="text-accent-foreground">Selecione uma data</span>
                        )}
                        <ChevronDownIcon className="ml-auto h-4 w-4" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden" align="start">
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