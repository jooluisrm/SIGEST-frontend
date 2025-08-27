import { ReactNode } from "react";
import { TableGerenciar } from "./tableGerenciar";
import { Card, CardContent, CardFooter } from "../ui/card";
import { PaginationTable } from "./paginationTable";

type Props = {
    type: RouterType;
}

export const MainGerenciar = ({ type }: Props) => {

    return (
        <main className="bg-white/70 backdrop-blur min-h-screen">
            <div className="container mx-auto">
                <h1 className="text-xl sm:text-3xl md:text-4xl">
                    Gerenciar <span className="font-bold">{type as ReactNode}</span>
                </h1>

                <Card>
                    <CardContent>
                        <TableGerenciar />
                    </CardContent>
                    <CardFooter className="">
                        <PaginationTable />
                    </CardFooter>
                </Card>

            </div>

        </main>
    );
}