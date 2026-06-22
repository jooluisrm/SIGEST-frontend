import { useQuery } from "@tanstack/react-query";
import { listOfertaDisciplinas } from "@/api/oferta-disciplina/ofertaDisciplinaServices";
import { queryKeys } from "./query-keys";

export const useOfertaDisciplinaList = (url?: string | null) =>
  useQuery({
    queryKey: [...queryKeys.disciplinas.all, "oferta", url ?? null],
    queryFn: () => listOfertaDisciplinas(url ?? undefined),
  });
