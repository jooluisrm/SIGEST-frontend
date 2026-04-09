import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUsuario,
  getUsuarioById,
  listUsuarios,
  removeUsuario,
  searchUsuarios,
  updateUsuario,
} from "@/api/usuario/usuarioServices";
import { ServidorPayload } from "@/types/servidor";
import { queryKeys } from "./query-keys";

export const useUsuarioList = (url?: string | null) =>
  useQuery({
    queryKey: queryKeys.usuarios.list(url),
    queryFn: () => listUsuarios(url ?? undefined),
  });

export const useUsuarioDetail = (id: number, enabled = true) =>
  useQuery({
    queryKey: queryKeys.usuarios.detail(id),
    queryFn: () => getUsuarioById(id),
    enabled,
  });

export const useUsuarioSearch = (term: string, enabled = true) =>
  useQuery({
    queryKey: queryKeys.usuarios.search(term),
    queryFn: () => searchUsuarios(term),
    enabled: enabled && !!term.trim(),
  });

export const useCreateUsuario = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ServidorPayload) => createUsuario(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.usuarios.all });
    },
  });
};

export const useUpdateUsuario = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: ServidorPayload }) =>
      updateUsuario(id, payload),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.usuarios.all }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.usuarios.detail(variables.id),
        }),
      ]);
    },
  });
};

export const useDeleteUsuario = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => removeUsuario(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.usuarios.all });
    },
  });
};
