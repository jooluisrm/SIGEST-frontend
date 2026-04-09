import { useQuery } from "@tanstack/react-query";
import { Cidade, Estado } from "@/types/endereco";
import { queryKeys } from "./query-keys";

const fetchStates = async (): Promise<Estado[]> => {
  const response = await fetch(
    "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
  );

  if (!response.ok) {
    throw new Error("Não foi possível carregar os estados.");
  }

  return response.json();
};

const fetchCities = async (selectedStateUF: string): Promise<Cidade[]> => {
  const response = await fetch(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedStateUF}/municipios`
  );

  if (!response.ok) {
    throw new Error("Não foi possível carregar as cidades.");
  }

  return response.json();
};

export const useIBGEQueries = (selectedStateUF?: string) => {
  const statesQuery = useQuery({
    queryKey: queryKeys.ibge.states,
    queryFn: fetchStates,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const citiesQuery = useQuery({
    queryKey: queryKeys.ibge.cities(selectedStateUF),
    queryFn: () => fetchCities(selectedStateUF as string),
    enabled: !!selectedStateUF,
    staleTime: 1000 * 60 * 60,
  });

  return {
    states: statesQuery.data ?? [],
    cities: citiesQuery.data ?? [],
    loadingStates: statesQuery.isLoading,
    loadingCities: citiesQuery.isLoading,
  };
};
