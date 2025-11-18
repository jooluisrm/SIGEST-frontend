// src/hooks/use-gerenciar-data.ts (VERSÃO ATUALIZADA)

import { useState, useEffect, useCallback } from "react";
import { PageTypeCentral } from "@/types/routerType";
import { dataFetchers } from "@/api/services";

export const useGerenciarData = <T>(type: PageTypeCentral | null) => {

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Envolvemos a lógica de busca em uma função que pode receber uma URL
    const fetchData = useCallback(async (url?: string) => {
        if (!type) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const fetcher = dataFetchers[type];
            if (!fetcher) {
                throw new Error(`Nenhuma função de busca definida para o tipo: ${type}`);
            }
            // Passa a URL para o fetcher. Se for undefined, o fetcher usará seu valor padrão.
            const result = await fetcher(url);
            console.log(result.data);
            setData(result as T);
        } catch (err) {
            console.error(err);
            setError("Erro ao carregar os dados.");
        } finally {
            setLoading(false);
        }
    }, [type]); // A função é recriada se o 'type' mudar

    // Efeito para a busca inicial (quando o componente monta ou o 'type' muda)
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Retorne a função fetchData para que o componente possa usá-la
    return { data, loading, error, fetchData };
};