import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createFrequencia,
  listFrequencias,
} from "@/api/frequencia/frequenciaServices";
import { FrequenciaPayload } from "@/types/frequencia";
import { queryKeys } from "./query-keys";

export const useFrequenciaList = () =>
  useQuery({
    queryKey: queryKeys.frequencias.lists(),
    queryFn: () => listFrequencias(),
  });

export const useCreateFrequencia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: FrequenciaPayload) => createFrequencia(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.frequencias.all });
    },
  });
};
