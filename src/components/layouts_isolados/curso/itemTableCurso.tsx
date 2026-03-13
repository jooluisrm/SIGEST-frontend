"use client";

import { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { ActionDialog } from "@/components/gerenciar/actionDialog";
import { AlertDialogComponent } from "../../shared/alertComponent";
import { ButtonGerenciar } from "@/components/gerenciar/buttonGerenciar";
import { CursoExpandedView } from "./cursoExpandedView";
import { toast } from "sonner";
import { DropDownMenuCell } from "@/components/gerenciar/dropDownMenuCell";

type Props = {
    item: any;
    onRefresh?: () => void;
};

export const ItemTableCurso = ({ item, onRefresh }: Props) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleDelete = async (id: number) => {
        try {
            // await deleteCurso(id);
            toast.success(`Curso deletado com sucesso!`);
            if (onRefresh) onRefresh();
        } catch (error: any) {
            console.error("Erro ao deletar:", error);
            toast.error(error.message || `Erro ao deletar Curso`);
        }
    };

    const name = item.nome || item.name || "Fundamental I";
    const periodos = item.periodos || "3";
    const cargaHoraria = item.carga_horaria || "800h";
    const id = item.id || 1;

    return (
        <>
            <TableRow className={isExpanded ? "bg-[#BCE0C7] hover:bg-[#BCE0C7]/80" : "bg-white"}>
                <TableCell className="font-bold pl-6 text-black">{name}</TableCell>
                <TableCell className="hidden md:table-cell font-bold text-black">{periodos}</TableCell>
                <TableCell className="hidden md:table-cell font-bold text-black">{cargaHoraria}</TableCell>
                <TableCell>
                    <div className="flex lg:hidden items-center justify-end">
                        <DropDownMenuCell />
                    </div>
                    <div className="hidden lg:flex items-center justify-end gap-1 px-4">
                        <AlertDialogComponent
                            onConfirm={() => handleDelete(id)}
                            triggerClassName="bg-red-500 w-7 h-7 p-1.5"
                            triggerIcon="delete"
                            triggerTooltip={`Deletar Curso`}
                            dialogTitle={`Deletar Curso`}
                            dialogDescription={`Tem certeza que deseja deletar este curso?`}
                        />
                        <ActionDialog
                            triggerIcon="edit"
                            triggerTooltip={`Alterar Curso`}
                            triggerClassName="bg-[#FF9B3F] w-7 h-7 p-1.5"
                            dialogTitle={`Editar Curso`}
                        >
                            <div className="p-4">Formulário de Editar Curso Aqui</div>
                        </ActionDialog>

                        <ButtonGerenciar
                            icon="view"
                            alt={isExpanded ? "Recolher" : "Expandir"}
                            className={`${isExpanded ? "bg-[#1E435E]" : "bg-[#2D6086]"} w-7 h-7 p-1.5 transition-colors`}
                            onClick={() => setIsExpanded(!isExpanded)}
                        />
                    </div>
                </TableCell>
            </TableRow>

            {isExpanded && (
                <TableRow className="hover:bg-transparent bg-gray-50">
                    <TableCell colSpan={4} className="p-0 border-b-2 border-gray-200">
                        <CursoExpandedView item={item} />
                    </TableCell>
                </TableRow>
            )}
        </>
    );
};
