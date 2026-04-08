"use client";

import { startTransition, useId, useState, useTransition } from "react";
import { AlertCircleIcon, Search } from "lucide-react";
import { toast } from "sonner";
import { searchFetchers } from "@/api/services";
import { MODULES_BY_SLUG } from "@/config/modules";
import { usePageType } from "@/context/pageTypeContext";
import { useGerenciarData } from "@/hooks/use-gerenciar-data";
import { NormalizedListResponse } from "@/types/api";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { TableGerenciar } from "./tableGerenciar";
import { PaginationTable } from "./paginationTable";
import { AppInput } from "../shared/app-input";
import { ButtonGerenciar } from "./buttonGerenciar";
import { Loader2Spin } from "../shared/loader2Spin";
import { TitlePage } from "../shared/titlePage";

export const MainGerenciar = () => {
  const { type } = usePageType();
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<NormalizedListResponse<unknown> | null>(null);
  const [isPending, startSearchTransition] = useTransition();
  const id = useId();

  if (!type) {
    return null;
  }

  const moduleMeta = MODULES_BY_SLUG[type];
  const { data, loading, error, fetchData } = useGerenciarData<unknown>(type);

  const handlePageChange = (url: string) => {
    startTransition(() => {
      fetchData(url);
      setFilteredData(null);
    });
  };

  const handleSearch = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") {
      return;
    }

    if (!moduleMeta.capabilities.search) {
      return;
    }

    if (!search.trim()) {
      setFilteredData(null);
      fetchData();
      return;
    }

    const searchFetcher = searchFetchers[type];
    if (!searchFetcher) {
      return;
    }

    try {
      const response = await searchFetcher(search.trim());
      startSearchTransition(() => {
        setFilteredData(response);
      });
    } catch {
      toast.error(`Erro ao buscar ${moduleMeta.label.toLowerCase()}.`);
    }
  };

  const displayData = filteredData ?? data;

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-5 min-h-screen">
        <TitlePage title="Gerenciar" />

        <Card>
          <CardHeader className="flex items-center justify-between gap-4">
            {moduleMeta.capabilities.create ? (
              <ButtonGerenciar
                icon="add"
                className="bg-primaria"
                alt={`Cadastrar ${moduleMeta.label}`}
                link={`/cadastrar/${type}`}
              />
            ) : (
              <div />
            )}
            {moduleMeta.capabilities.search && (
              <AppInput
                id={id}
                type="search"
                placeholder={`Buscar ${moduleMeta.label.toLowerCase()}`}
                icon={<Search size={20} />}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={handleSearch}
              />
            )}
          </CardHeader>
          <CardContent>
            {loading || isPending ? (
              <Loader2Spin />
            ) : error ? (
              <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>Não foi possível carregar os dados</AlertTitle>
              </Alert>
            ) : (
              <TableGerenciar
                dataList={displayData?.data ?? []}
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
