"use client"

import { ReactNode, useId } from "react";
import { TableGerenciar } from "./tableGerenciar";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { PaginationTable } from "./paginationTable";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { UserType } from "@/app/(rotas)/cadastrar/[type]/page";
import { ButtonGerenciar } from "./buttonGerenciar";
import { ButtonCadastro } from "../cadastrar/buttonCadastro";
import { useRouter } from "next/navigation";

type Props = {
    type: UserType;
}

export const MainGerenciar = ({ type }: Props) => {

    const id = useId();

    const router = useRouter();
    const handleBackButton = () => {
        router.back();
    }

    return (
        <main className="bg-white/70 backdrop-blur min-h-screen">
            <div className="container mx-auto px-5">
                <div className="flex items-center justify-start gap-5">
                    <ButtonCadastro text="Voltar" onClick={handleBackButton} />
                    <h1 className="text-xl sm:text-3xl md:text-4xl py-10">
                        Gerenciar <span className="font-bold">{type as ReactNode}</span>
                    </h1>
                </div>

                <Card className="">
                    <CardHeader className="flex items-center justify-between">
                        <ButtonGerenciar
                            icon="add"
                            className="bg-primaria"
                            alt={`Cadastrar ${type}`}
                            link={`/cadastrar/${type}`}
                        />
                        <div className="*:not-first:mt-2">
                            <div className="relative">
                                <Input id={id} className="peer ps-9" placeholder="Buscar" type="search" />
                                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                                    <Search size={16} aria-hidden="true" />
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <TableGerenciar type={type} />
                    </CardContent>
                    <CardFooter>
                        <PaginationTable />
                    </CardFooter>
                </Card>

            </div>

        </main>
    );
}