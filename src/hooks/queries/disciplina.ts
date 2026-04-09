import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createDisciplina,
  getDisciplinaById,
  listDisciplinas,
  removeDisciplina,
  searchDisciplinas,
  updateDisciplina,
} from "@/api/disciplina/disciplinaServices";
import { DisciplinaPayload } from "@/types/disciplina";
import { queryKeys } from "./query-keys";

export const useDisciplinaList = (url?: string | null) =>
  useQuery({
    queryKey: queryKeys.disciplinas.list(url),
    queryFn: () => listDisciplinas(url ?? undefined),
  });

export const useDisciplinaDetail = (id: number, enabled = true) =>
  useQuery({
    queryKey: queryKeys.disciplinas.detail(id),
    queryFn: () => getDisciplinaById(id),
    enabled,
  });

export const useDisciplinaSearch = (term: string, enabled = true) =>
  useQuery({
    queryKey: queryKeys.disciplinas.search(term),
    queryFn: () => searchDisciplinas(term),
    enabled: enabled && !!term.trim(),
  });

export const useCreateDisciplina = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: DisciplinaPayload) => createDisciplina(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.disciplinas.all });
    },
  });
};

export const useUpdateDisciplina = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: DisciplinaPayload }) =>
      updateDisciplina(id, payload),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.disciplinas.all }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.disciplinas.detail(variables.id),
        }),
      ]);
    },
  });
};

export const useDeleteDisciplina = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => removeDisciplina(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.disciplinas.all });
    },
  });
};
