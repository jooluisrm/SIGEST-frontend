import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTurma,
  getTurmaById,
  getTurmasByPeriodo,
  listTurmas,
  removeTurma,
} from "@/api/turma/turmaServices";
import { ClassroomPayload } from "@/types/classroom";
import { queryKeys } from "./query-keys";

export const useTurmaList = (url?: string | null) =>
  useQuery({
    queryKey: queryKeys.turmas.list(url),
    queryFn: () => listTurmas(url ?? undefined),
  });

export const useTurmaDetail = (id: number, enabled = true) =>
  useQuery({
    queryKey: queryKeys.turmas.detail(id),
    queryFn: () => getTurmaById(id),
    enabled,
  });

export const useTurmasByPeriodo = (periodId?: number | null, enabled = true) =>
  useQuery({
    queryKey: queryKeys.turmas.byPeriod(periodId ?? 0),
    queryFn: () => getTurmasByPeriodo(periodId as number),
    enabled: enabled && !!periodId,
    staleTime: 60_000,
  });

export const useCreateTurma = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ClassroomPayload) => createTurma(payload),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.turmas.all }),
        queryClient.invalidateQueries({ queryKey: queryKeys.periodos.all }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.turmas.byPeriod(variables.period_id),
        }),
      ]);
    },
  });
};

export const useDeleteTurma = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => removeTurma(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.turmas.all });
    },
  });
};
