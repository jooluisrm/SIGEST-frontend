import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ButtonGerenciar, ButtonIconType } from "./buttonGerenciar";
import { Button } from "../ui/button";
import { Ellipsis } from "lucide-react";
import { ActionDialog } from "./actionDialog";
import { AlertDialogComponent } from "../shared/alertComponent";
import { usePageType } from "@/context/pageTypeContext";



export const DropDownMenuCell = () => {

    const { type } = usePageType();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant={"ghost"}
                    size={"sm"}
                >
                    <Ellipsis />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex justify-center items-center gap-1">
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                    <AlertDialogComponent
                        triggerClassName="bg-red-500"
                        triggerIcon="delete"
                        triggerTooltip={`Deletar ${type}`}
                        dialogTitle={`Deletar ${type}`}
                        dialogDescription={`Tem certeza que deseja deletar este ${type}? Essa ação não poderá ser desfeita.`}
                    />
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <ActionDialog
                        triggerIcon="edit"
                        triggerTooltip={`Editar ${type}`}
                        triggerClassName="bg-secundaria"
                        dialogTitle={`Editar ${type}`}
                    >
                        a
                    </ActionDialog>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <ActionDialog
                        dialogTitle={`Visualizar ${type}`}
                        triggerIcon="view"
                        triggerTooltip="Ver mais"
                        triggerClassName="bg-secundaria1"
                    >
                        a
                    </ActionDialog>
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    );
}