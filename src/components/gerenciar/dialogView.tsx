"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ButtonGerenciar } from "./buttonGerenciar";
import { useState } from "react";
import { UserType } from "@/app/(rotas)/cadastrar/[type]/page";

type Props = {
    type: UserType;
}

export const DialogView = ({ type }: Props) => {

    const [open, setOpen] = useState(false);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <ButtonGerenciar
                    alt={`Ver mais`}
                    icon="view"
                    className="bg-secundaria1"
                    size={"sm"}
                />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Visualizar {type}</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}