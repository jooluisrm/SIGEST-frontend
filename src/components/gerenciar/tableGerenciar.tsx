import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ActionDialog } from "./actionDialog";
import { ItemTable } from "./itemTable";
import { TypeProfessorCadastro } from "@/types/professor";
import { usePageType } from "@/context/pageTypeContext";

type Props = {
    listUsers: TypeProfessorCadastro[];
}

export const TableGerenciar = ({ listUsers }: Props) => {

    const { type } = usePageType();

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
                {listUsers.length > 0 && listUsers.map((item, index) => (
                    <ItemTable key={index} item={item}/>
                ))}
            </TableBody>
        </Table>
    );
}