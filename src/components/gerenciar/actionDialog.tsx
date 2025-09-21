"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ButtonGerenciar, ButtonIconType } from "./buttonGerenciar";
import React from "react";

type Props = {
    triggerIcon: ButtonIconType;
    triggerTooltip: string;
    triggerClassName?: string;
    dialogTitle: string;
    children: React.ReactNode;
}

export const ActionDialog = ({
    triggerIcon,
    triggerTooltip,
    triggerClassName,
    dialogTitle,
    children
}: Props) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <ButtonGerenciar
                    alt={triggerTooltip}
                    icon={triggerIcon}
                    className={triggerClassName}
                    size={"sm"}
                />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                </DialogHeader>
                {/* Aqui entra o conteúdo específico (formulário, detalhes, etc.) */}
                <main className="overflow-y-auto max-h-[calc(100vh-10rem)] overflow-x-hidden">
                    {children}
                </main>
            </DialogContent>
        </Dialog>
    );
}
