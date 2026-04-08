import { useCallback, useEffect, useState } from "react";
import { dataFetchers } from "@/api/services";
import { NormalizedListResponse } from "@/types/api";
import { PageTypeCentral } from "@/types/routerType";

export const useGerenciarData = <T>(type: PageTypeCentral | null) => {
  const [data, setData] = useState<NormalizedListResponse<T> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (url?: string) => {
      if (!type) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const fetcher = dataFetchers[type];
        const result = await fetcher(url);
        setData(result as NormalizedListResponse<T>);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar os dados.");
      } finally {
        setLoading(false);
      }
    },
    [type]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, fetchData };
};
