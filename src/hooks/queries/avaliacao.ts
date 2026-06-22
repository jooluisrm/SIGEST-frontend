import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAvaliacao,
  listAvaliacoes,
} from "@/api/avaliacao/avaliacaoServices";
import { AtividadePayload } from "@/types/avaliacao";
import { queryKeys } from "./query-keys";

export const useAvaliacaoList = () =>
  useQuery({
    queryKey: queryKeys.avaliacoes.lists(),
    queryFn: () => listAvaliacoes(),
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
