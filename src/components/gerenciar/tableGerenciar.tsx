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
import { Aluno } from "@/types/aluno";
import { Servidor } from "@/types/servidor";
import { Disciplina } from "@/types/disciplina";

type Props = {
    dataList: TypeProfessorCadastro[] | Aluno[] | Servidor[] | Disciplina[];
}

export const TableGerenciar = ({ dataList }: Props) => {

    const { type } = usePageType();

    // Adaptar cabeçalhos da tabela para disciplina
    const getTableHeaders = () => {
        if (type === "disciplina") {
            return (
                <>
                    <TableHead>Nome</TableHead>
                    <TableHead className="hidden md:table-cell">Sigla</TableHead>
                    <TableHead className="hidden md:table-cell">Área de Conhecimento</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                </>
            );
        }
        return (
            <>
                <TableHead>Nome</TableHead>
                <TableHead className="hidden md:table-cell">E-mail</TableHead>
                <TableHead className="hidden md:table-cell">Telefone</TableHead>
                <TableHead className="text-right">Ações</TableHead>
            </>
        );
    };

    return (
        <Table className="bg-white">
            <TableCaption>Lista de {type}</TableCaption>
            <TableHeader>
                <TableRow>
                    {getTableHeaders()}
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