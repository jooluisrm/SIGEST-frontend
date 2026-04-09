import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProfessor,
  getProfessorById,
  listProfessores,
  removeProfessor,
  searchProfessores,
  updateProfessor,
} from "@/api/professor/professorServices";
import { ProfessorPayload } from "@/types/professor";
import { queryKeys } from "./query-keys";

export const useProfessorList = (url?: string | null) =>
  useQuery({
    queryKey: queryKeys.professores.list(url),
    queryFn: () => listProfessores(url ?? undefined),
  });

export const useProfessorDetail = (id: number, enabled = true) =>
  useQuery({
    queryKey: queryKeys.professores.detail(id),
    queryFn: () => getProfessorById(id),
    enabled,
  });

export const useProfessorSearch = (term: string, enabled = true) =>
  useQuery({
    queryKey: queryKeys.professores.search(term),
    queryFn: () => searchProfessores(term),
    enabled: enabled && !!term.trim(),
  });

export const useCreateProfessor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ProfessorPayload) => createProfessor(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.professores.all });
    },
  });
};

export const useUpdateProfessor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: ProfessorPayload }) =>
      updateProfessor(id, payload),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.professores.all }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.professores.detail(variables.id),
        }),
      ]);
    },
  });
};

export const useDeleteProfessor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => removeProfessor(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.professores.all });
    },
  });
};
