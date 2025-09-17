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
    dataList: TypeProfessorCadastro[];
}

export const TableGerenciar = ({ dataList }: Props) => {

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
                {dataList.length > 0 && dataList.map((item, index) => (
                    <ItemTable key={index} item={item}/>
                ))}
            </TableBody>
        </Table>
    );
}