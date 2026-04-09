import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCurso,
  getCursoById,
  listCursos,
  removeCurso,
  searchCursos,
  updateCurso,
} from "@/api/curso/cursoServices";
import { CoursePayload } from "@/types/course";
import { queryKeys } from "./query-keys";

export const useCursoList = (url?: string | null) =>
  useQuery({
    queryKey: queryKeys.cursos.list(url),
    queryFn: () => listCursos(url ?? undefined),
  });

export const useCursoDetail = (id: number, enabled = true) =>
  useQuery({
    queryKey: queryKeys.cursos.detail(id),
    queryFn: () => getCursoById(id),
    enabled,
  });

export const useCursoSearch = (term: string, enabled = true) =>
  useQuery({
    queryKey: queryKeys.cursos.search(term),
    queryFn: () => searchCursos(term),
    enabled: enabled && !!term.trim(),
  });

export const useCreateCurso = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CoursePayload) => createCurso(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.cursos.all });
    },
  });
};

export const useUpdateCurso = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: CoursePayload }) =>
      updateCurso(id, payload),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.cursos.all }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.cursos.detail(variables.id),
        }),
        queryClient.invalidateQueries({ queryKey: queryKeys.periodos.all }),
      ]);
    },
  });
};

export const useDeleteCurso = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => removeCurso(id),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.cursos.all }),
        queryClient.invalidateQueries({ queryKey: queryKeys.periodos.all }),
      ]);
    },
  });
};
