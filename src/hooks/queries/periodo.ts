import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  generateTurmasByPeriodo,
  getPeriodoById,
  getPeriodosByCurso,
  listPeriodos,
} from "@/api/periodo/periodoServices";
import { GenerateClassroomsPayload } from "@/types/period";
import { queryKeys } from "./query-keys";

export const usePeriodoList = (url?: string | null) =>
  useQuery({
    queryKey: queryKeys.periodos.list(url),
    queryFn: () => listPeriodos(url ?? undefined),
    staleTime: 60_000,
  });

export const usePeriodoDetail = (id: number, enabled = true) =>
  useQuery({
    queryKey: queryKeys.periodos.detail(id),
    queryFn: () => getPeriodoById(id),
    enabled,
  });

export const usePeriodosByCurso = (courseId: number, enabled = true) =>
  useQuery({
    queryKey: queryKeys.periodos.byCourse(courseId),
    queryFn: () => getPeriodosByCurso(courseId),
    enabled,
    staleTime: 60_000,
  });

export const useGenerateTurmasByPeriodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      periodId,
      payload,
    }: {
      periodId: number;
      payload: GenerateClassroomsPayload;
    }) => generateTurmasByPeriodo(periodId, payload),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.periodos.all }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.periodos.detail(variables.periodId),
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.turmas.byPeriod(variables.periodId),
        }),
        queryClient.invalidateQueries({ queryKey: queryKeys.turmas.all }),
      ]);
    },
  });
};
