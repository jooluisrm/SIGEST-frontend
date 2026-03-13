"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => void;
};

export const ModalDesenturmarAluno = ({
  isOpen,
  onOpenChange,
  onConfirm,
}: Props) => {
  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white p-8 rounded-xl border-none shadow-lg">
        <DialogHeader className="mb-10 mt-6">
          <DialogTitle className="text-center text-2xl font-normal text-black">
            Deseja desenturmar esse aluno?
          </DialogTitle>
        </DialogHeader>

        <div className="flex justify-center gap-4 mb-4">
          <Button
            onClick={() => onOpenChange(false)}
            className="bg-[#00923F] hover:bg-green-700 text-white font-bold py-2 px-8 rounded-md text-base"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            className="bg-[#FE2B40] hover:bg-red-600 text-white font-bold py-2 px-8 rounded-md text-base"
          >
            Desenturmar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
