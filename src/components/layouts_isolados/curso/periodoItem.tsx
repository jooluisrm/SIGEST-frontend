"use client";

import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { TurmaItem } from "./turmaItem";

type Props = {
  nome: string;
};

export const PeriodoItem = ({ nome }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={`border rounded-md mb-4 overflow-hidden shadow-sm ${
        isOpen ? "border-green-300" : "border-gray-200"
      }`}
    >
      <CollapsibleTrigger asChild>
        <div
          className={`flex items-center justify-between px-4 py-3 transition-colors ${
            isOpen ? "bg-[#BCE0C7]" : "bg-white"
          } hover:bg-[#BCE0C7]/80`}
        >
          <div className="font-bold text-sm text-black">{nome}</div>

          <div className="flex items-center gap-3">
            <button
              className="bg-[#2D6086] hover:bg-blue-800 text-white font-medium py-1.5 px-4 rounded text-xs transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              Gerar Turma
            </button>

            <button
              className="bg-[#00923F] hover:bg-green-700 text-white font-medium py-1.5 px-4 rounded text-xs transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              Criar Turma
            </button>
          </div>
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="bg-green-50/50">
          <div className="flex justify-between px-6 py-2 pt-4 font-bold text-xs border-b">
            <span className="w-1/4">Nome da Turma</span>
            <span className="w-1/4">Quantidade Alunos</span>
            <span className="flex-grow"></span>{" "}
          </div>

          <div className="flex flex-col">
            <TurmaItem nome="Turma 1A" qtdAtual={32} qtdMax={35} />
            <TurmaItem nome="Turma 2A" qtdAtual={12} qtdMax={35} />
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
