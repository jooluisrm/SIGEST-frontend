import { TypeProfessorCadastro } from "@/types/professor";
import { TableCell, TableRow } from "../ui/table";
import { ActionDialog } from "./actionDialog";
import { AlertDialogComponent } from "../shared/alertComponent";
import { DropDownMenuCell } from "./dropDownMenuCell";
import { usePageType } from "@/context/pageTypeContext";

type Props = {
    item: TypeProfessorCadastro;
}

export const ItemTable = ({ item }: Props) => {

    const { type } = usePageType();

    return (
        <TableRow>
            <TableCell className="font-medium">{item.nome}</TableCell>
            <TableCell className="hidden md:table-cell">{item.email}</TableCell>
            <TableCell className="hidden md:table-cell">{item.telefone}</TableCell>
            <TableCell>
                <div className="flex lg:hidden items-center justify-end">
                    <DropDownMenuCell />
                </div>
                <div className="hidden lg:flex items-center justify-end gap-1">
                    <AlertDialogComponent
                        triggerClassName="bg-red-500"
                        triggerIcon="delete"
                        triggerTooltip={`Deletar ${type}`}
                        dialogTitle={`Deletar ${type}`}
                        dialogDescription={`Tem certeza que deseja deletar este ${type}? Essa ação não poderá ser desfeita.`}
                    />
                    <ActionDialog
                        triggerIcon="edit"
                        triggerTooltip={`Editar ${type}`}
                        triggerClassName="bg-secundaria"
                        dialogTitle={`Editar ${type}`}
                    >
                        <p>Aqui dentro vai o seu formulário de edição para o {type}...</p>
                        {/* Ex: <EditUserForm user={...} /> */}
                    </ActionDialog>

                    <ActionDialog
                        triggerIcon="view"
                        triggerTooltip={`Ver mais`}
                        triggerClassName="bg-secundaria1"
                        dialogTitle={`Visualizar ${type}`}
                    >
                        <p>Aqui dentro vão os detalhes do {type}...</p>
                        {/* Ex: <UserDetails user={...} /> */}
                    </ActionDialog>
                </div>
            </TableCell>
        </TableRow>
    );
}