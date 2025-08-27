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

export const TableGerenciar = () => {
    return (
        <Table className="bg-white">
            <TableCaption>Lista de Bla bla</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[150px]">Nome</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">Silva Rodrigues</TableCell>
                    <TableCell>silva@gmail.com</TableCell>
                    <TableCell>39 99999-9999</TableCell>
                    <TableCell className="flex gap-1 justify-end">
                        <Button size={"sm"}><Pen /></Button>
                        <Button size={"sm"}><Eye /></Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}