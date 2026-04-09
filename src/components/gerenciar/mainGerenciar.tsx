"use client";

import { useId, useMemo, useState } from "react";
import { AlertCircleIcon, Search } from "lucide-react";
import { MODULES_BY_SLUG } from "@/config/modules";
import { usePageType } from "@/context/pageTypeContext";
import {
  useManagedModuleListQuery,
  useManagedModuleSearchQuery,
} from "@/hooks/queries/managed-modules";
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
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [pageUrl, setPageUrl] = useState<string | null>(null);
  const id = useId();

  if (!type) {
    return null;
  }

  const moduleMeta = MODULES_BY_SLUG[type];
  const listQuery = useManagedModuleListQuery(type, pageUrl);
  const searchQuery = useManagedModuleSearchQuery(
    type,
    submittedSearch,
    moduleMeta.capabilities.search
  );

  const handlePageChange = (url: string) => {
    setSubmittedSearch("");
    setPageUrl(url);
  };

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter" || !moduleMeta.capabilities.search) {
      return;
    }

    if (!search.trim()) {
      setSubmittedSearch("");
      setPageUrl(null);
      return;
    }

    setSubmittedSearch(search.trim());
    setPageUrl(null);
  };

  const displayData = useMemo<NormalizedListResponse<unknown> | null>(
    () => (submittedSearch ? searchQuery.data ?? null : listQuery.data ?? null),
    [listQuery.data, searchQuery.data, submittedSearch]
  );
  const isLoading = submittedSearch ? searchQuery.isLoading : listQuery.isLoading;
  const hasError = submittedSearch ? searchQuery.isError : listQuery.isError;

  const handleRefresh = () => {
    if (submittedSearch) {
      void searchQuery.refetch();
      return;
    }

    void listQuery.refetch();
  };

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
            {isLoading ? (
              <Loader2Spin />
            ) : hasError ? (
              <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>Não foi possível carregar os dados</AlertTitle>
              </Alert>
            ) : (
              <TableGerenciar dataList={displayData?.data ?? []} onRefresh={handleRefresh} />
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
