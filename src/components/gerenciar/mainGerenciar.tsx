"use client"

import { ReactNode, useEffect, useId, useState } from "react";
import { TableGerenciar } from "./tableGerenciar";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { PaginationTable } from "./paginationTable";
import { Input } from "../ui/input";
import { AlertCircleIcon, Loader2, Search, Terminal } from "lucide-react";
import { ButtonGerenciar } from "./buttonGerenciar";
import { getProfessores } from "@/api/professor/professorServices";
import { TypeProfessorCadastro } from "@/types/professor";
import { TitlePage } from "../shared/titlePage";
import { usePageType } from "@/context/pageTypeContext";
import { useGerenciarData } from "@/hooks/use-gerenciar-data";
import { Loader2Spin } from "../shared/loader2Spin";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// colocar um type generico para a state
type GenericUser = any;

export const MainGerenciar = () => {

    const { type } = usePageType();

    // hook que faz a chamada GET (aluno, professor...)
    const { data: listUsers, loading, error } = useGerenciarData<GenericUser>(type);

    const id = useId();



    return (
        <main className="min-h-screen">
            <div className="container mx-auto px-5 min-h-screen">
                <TitlePage title="Gerenciar" />

                <Card>
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
                        {loading ? (
                            <Loader2Spin />
                        ) : error ? (
                            <Alert variant="destructive">
                                <AlertCircleIcon />
                                <AlertTitle>Não foi possível carregar os dados</AlertTitle>
                            </Alert>
                        ) : (
                            <TableGerenciar listUsers={listUsers} />
                        )}
                    </CardContent>
                    <CardFooter>
                        <PaginationTable />
                    </CardFooter>
                </Card>

            </div>

        </main>
    );
}