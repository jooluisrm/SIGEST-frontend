"use client";

import { ReactNode, useId, useState } from "react";
import { TableGerenciar } from "./tableGerenciar";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { PaginationTable } from "./paginationTable";
import { AlertCircleIcon, Search } from "lucide-react";
import { ButtonGerenciar } from "./buttonGerenciar";
import { TitlePage } from "../shared/titlePage";
import { usePageType } from "@/context/pageTypeContext";
import { useGerenciarData } from "@/hooks/use-gerenciar-data";
import { Loader2Spin } from "../shared/loader2Spin";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AppInput } from "../shared/app-input";

import { getProfessoresBySearch } from "@/api/professor/professorServices";
import { getTurmas } from "@/api/turma/turmaServices";


type GenericData = any;

export const MainGerenciar = () => {
    const { type } = usePageType();
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState<GenericData | null>(null);

    const { data, loading, error, fetchData } = useGerenciarData<GenericData>(type);

    const id = useId();

    const handlePageChange = (url: string) => {
        fetchData(url);
        setFilteredData(null);
    };

    const keyDownSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter") return;

        if (search.trim() === "") {
            setFilteredData(null);
            return;
        }

        try {
            let result;

            switch (type) {
                case "professor":
                    result = await getProfessoresBySearch(search);
                    break;
                case "turma":
                    result = await getTurmas(search);
                    break;

                default:
                    setFilteredData(null);
                    return;
            }

            setFilteredData({
                data: result?.data || result?.professors || result,
                meta: result?.meta || null,
                links: result?.links || null,
            });

        } catch (error) {
            console.error("Erro ao buscar:", error);
        }
    };

    const displayData = filteredData || data;

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
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={keyDownSearch}
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
                            <TableGerenciar
                                dataList={displayData?.data || []}
                                onRefresh={fetchData}
                            />
                        )}
                    </CardContent>

                    <CardFooter>
                        {displayData?.meta && (
                            <PaginationTable meta={displayData.meta} onPageChange={handlePageChange} />
                        )}
                    </CardFooter>
                </Card>
            </div>
        </main>
    );
};
