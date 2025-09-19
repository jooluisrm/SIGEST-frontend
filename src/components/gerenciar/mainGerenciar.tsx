"use client"

import { ReactNode, useEffect, useId, useState } from "react";
import { TableGerenciar } from "./tableGerenciar";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { PaginationTable } from "./paginationTable";
import { AlertCircleIcon, Loader2, Search, Terminal } from "lucide-react";
import { ButtonGerenciar } from "./buttonGerenciar";
import { TitlePage } from "../shared/titlePage";
import { usePageType } from "@/context/pageTypeContext";
import { useGerenciarData } from "@/hooks/use-gerenciar-data";
import { Loader2Spin } from "../shared/loader2Spin";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AppInput } from "../shared/app-input";

// colocar um type generico para a state
type GenericData = any;

export const MainGerenciar = () => {

    const { type } = usePageType();

    // hook que faz a chamada GET (aluno, professor...)
    const { data, loading, error, fetchData } = useGerenciarData<GenericData>(type);

    const id = useId();

    const handlePageChange = (url: string) => {
        fetchData(url);
    };

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
                        <div>
                            <AppInput
                                id={id}
                                type="search"
                                placeholder="Buscar"
                                icon={<Search size={20} />}
                            />
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
                            <TableGerenciar dataList={data.data} />
                        )}
                    </CardContent>
                    <CardFooter>
                        {data?.meta && (
                            <PaginationTable
                                meta={data.meta}
                                onPageChange={handlePageChange} // Passe a função de callback
                            />
                        )}
                    </CardFooter>
                </Card>

            </div>

        </main>
    );
}