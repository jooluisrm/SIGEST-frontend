"use client";

import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ActionDialog } from "@/components/gerenciar/actionDialog";
import { ButtonGerenciar } from "@/components/gerenciar/buttonGerenciar";
import { AlunosTurmaTables } from "./alunosTurmaTables";

type Props = {
    nome: string;
    qtdAtual: number;
    qtdMax: number;
};

export const TurmaItem = ({ nome, qtdAtual, qtdMax }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className={`border-b last:border-none ${isOpen ? "bg-green-50/30" : "bg-white"} transition-colors`}
        >
            <div className="flex items-center justify-between px-6 py-3 cursor-pointer hover:bg-gray-50" onClick={() => setIsOpen(!isOpen)}>
                <div className="w-1/4 font-medium text-sm text-black">
                    {nome}
                </div>
                <div className="w-1/4 text-sm text-black pl-2">
                    {qtdAtual}/{qtdMax}
                </div>

                <div className="flex items-center justify-end flex-grow gap-1">
                    <ActionDialog
                        triggerIcon="delete"
                        triggerTooltip="Excluir Turma"
                        triggerClassName="bg-red-500 w-7 h-7 p-1.5"
                        dialogTitle="Excluir Turma"
                    >
                        <div className="p-4 text-center">Tem certeza que deseja deletar a turma {nome}?</div>
                    </ActionDialog>
                    <ActionDialog
                        triggerIcon="edit"
                        triggerTooltip="Editar Turma"
                        triggerClassName="bg-[#FF9B3F] w-7 h-7 p-1.5"
                        dialogTitle="Editar Turma"
                    >
                        <div className="p-4 text-center">Quantidade Maxima Alunos</div>
                    </ActionDialog>

                    <CollapsibleTrigger asChild>
                        <ButtonGerenciar
                            icon="view"
                            alt={isOpen ? "Recolher" : "Expandir"}
                            className={`${isOpen ? "bg-[#1E435E]" : "bg-[#2D6086]"} w-7 h-7 p-1.5 transition-colors`}
                            onClick={() => setIsOpen(!isOpen)}
                        />
                    </CollapsibleTrigger>
                </div>
            </div>

            <CollapsibleContent>
                <AlunosTurmaTables />
            </CollapsibleContent>
        </Collapsible>
    );
};
