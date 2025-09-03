"use client"

import { ReactNode, useEffect, useId, useState } from "react";
import { TableGerenciar } from "./tableGerenciar";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { PaginationTable } from "./paginationTable";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { UserType } from "@/app/(rotas)/(privadas)/cadastrar/[type]/page";
import { ButtonGerenciar } from "./buttonGerenciar";
import { getProfessores } from "@/api/professor/professorServices";
import { TypeProfessorCadastro } from "@/types/professor";
import { TitlePage } from "../shared/titlePage";
import { usePageType } from "@/context/pageTypeContext";



export const MainGerenciar = () => {

    const { type } = usePageType();

    const [listUsers, setListUsers] = useState<TypeProfessorCadastro[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const id = useId();

    useEffect(() => {
        if (!type) return;

        setListUsers([]); // limpa a lista ao trocar de tipo
        setLoading(true);
        setError(null);

        const fetchData = async () => {
            console.log("tipo da pagina:", type);

            try {
                switch (type) {
                    case "professor": {
                        const data = await getProfessores();
                        setListUsers(data);
                        break;
                    }
                    case "aluno": {
                        // futuramente: getAlunos()
                        setListUsers([]);
                        break;
                    }
                    case "servidor": {
                        setListUsers([]);
                        break;
                    }
                    default:
                        setListUsers([]);
                        break;
                }
            } catch (error) {
                setError("Erro ao carregar dados.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [type]);



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
                            <p className="text-center animate-pulse">Carregando...</p>
                        ) : error ? (
                            <p className="text-center text-red-500">{error}</p>
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