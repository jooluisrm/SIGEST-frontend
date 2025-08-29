import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { UserType } from "@/app/(rotas)/(privadas)/cadastrar/[type]/page";
import { ActionDialog } from "./actionDialog";

type Props = {
    type: UserType;
}

export const TableGerenciar = ({ type }: Props) => {
    return (
        <Table className="bg-white">
            <TableCaption>Lista de {type}</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead className="hidden md:table-cell">E-mail</TableHead>
                    <TableHead className="hidden md:table-cell">Telefone</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">Silva Rodrigues</TableCell>
                    <TableCell className="hidden md:table-cell">silva@gmail.com</TableCell>
                    <TableCell className="hidden md:table-cell">39 99999-9999</TableCell>
                    <TableCell>
                        <div className="flex items-center justify-end gap-2">
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
            </TableBody>
        </Table>
    );
}