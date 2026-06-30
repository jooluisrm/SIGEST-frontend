import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAvaliacao,
  listAvaliacoes,
} from "@/api/avaliacao/avaliacaoServices";
import { AtividadePayload } from "@/types/avaliacao";
import { queryKeys } from "./query-keys";

export const useAvaliacaoList = (url?: string | null) =>
  useQuery({
    queryKey: [...queryKeys.avaliacoes.lists(), url ?? "default"],
    queryFn: () => listAvaliacoes(url ?? undefined),
  });

export const useCreateAvaliacao = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AtividadePayload) => createAvaliacao(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.avaliacoes.all });
    },
  });
};
