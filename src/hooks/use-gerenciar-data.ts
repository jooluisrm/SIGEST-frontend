// app/hooks/useGerenciarData.ts

import { useState, useEffect } from "react";
import { PageTypeCentral } from "@/types/routerType";
import { dataFetchers } from "@/api/services";


// O hook aceita um tipo genérico T para os dados
export const useGerenciarData = <T>(type: PageTypeCentral | null) => {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Se não houver tipo, não faz nada
        if (!type) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            // Reinicia o estado para a nova busca
            setData([]);
            setLoading(true);
            setError(null);

            try {
                // Seleciona a função correta do nosso mapa
                const fetcher = dataFetchers[type];
                if (!fetcher) {
                    throw new Error(`Nenhuma função de busca de dados definida para o tipo: ${type}`);
                }
                const result = await fetcher();
                setData(result as T[]);
            } catch (err) {
                console.error(err);
                setError("Erro ao carregar os dados.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [type]); // Executa sempre que o 'type' mudar

    return { data, loading, error };
};