"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ButtonGerenciar, ButtonIconType } from "./buttonGerenciar";

type Props = {
  triggerIcon: ButtonIconType;
  triggerTooltip: string;
  triggerClassName?: string;
  dialogTitle: string;
  dialogClassName?: string;
  children: React.ReactNode | (() => React.ReactNode);
};

export const ActionDialog = ({
  triggerIcon,
  triggerTooltip,
  triggerClassName,
  dialogTitle,
  dialogClassName,
  children,
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ButtonGerenciar
          alt={triggerTooltip}
          icon={triggerIcon}
          className={triggerClassName}
          size="sm"
        />
      </DialogTrigger>
      <DialogContent className={dialogClassName}>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <main className="overflow-y-auto max-h-[calc(100vh-10rem)] overflow-x-hidden">
          {open ? (typeof children === "function" ? children() : children) : null}
        </main>
      </DialogContent>
    </Dialog>
  );
};
