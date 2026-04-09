import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAluno,
  getAlunoById,
  listAlunos,
  removeAluno,
  searchAlunos,
  updateAluno,
} from "@/api/aluno/alunoServices";
import { AlunoPayload } from "@/types/aluno";
import { queryKeys } from "./query-keys";

export const useAlunoList = (url?: string | null) =>
  useQuery({
    queryKey: queryKeys.alunos.list(url),
    queryFn: () => listAlunos(url ?? undefined),
  });

export const useAlunoDetail = (id: number, enabled = true) =>
  useQuery({
    queryKey: queryKeys.alunos.detail(id),
    queryFn: () => getAlunoById(id),
    enabled,
  });

export const useAlunoSearch = (term: string, enabled = true) =>
  useQuery({
    queryKey: queryKeys.alunos.search(term),
    queryFn: () => searchAlunos(term),
    enabled: enabled && !!term.trim(),
  });

export const useCreateAluno = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AlunoPayload) => createAluno(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.alunos.all });
    },
  });
};

export const useUpdateAluno = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: AlunoPayload }) =>
      updateAluno(id, payload),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.alunos.all }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.alunos.detail(variables.id),
        }),
      ]);
    },
  });
};

export const useDeleteAluno = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => removeAluno(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.alunos.all });
    },
  });
};
