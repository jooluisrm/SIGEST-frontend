import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button";
import { Eye, Pen } from "lucide-react";
import { ButtonGerenciar } from "./buttonGerenciar";
import { UserType } from "@/app/(rotas)/cadastrar/[type]/page";

type Props = {
    type: UserType;
}

export const TableGerenciar = ({type}: Props) => {
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
                            <ButtonGerenciar 
                                alt={`Editar ${type}`}
                                icon="edit"
                                className="bg-secundaria"
                                size={"sm"}
                            />
                            <ButtonGerenciar 
                                alt={`Ver mais`}
                                icon="view"
                                className="bg-secundaria1"
                                size={"sm"}
                            />
                        </div>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}