import axiosInstance from "@/lib/axiosInstance";
import { Servidor, ServidorPayload } from "@/types/servidor";
import { ApiSuccessResponse, NormalizedListResponse } from "@/types/api";
import {
  extractResponseData,
  handleApiError,
  normalizeListResponse,
  notifyApiSuccess,
} from "@/lib/api-utils";

export const getUsuarios = async (
  url = "api/servidors"
): Promise<NormalizedListResponse<Servidor>> => {
  const response = await axiosInstance.get(url);
  return normalizeListResponse<Servidor>(response.data);
};

export const getUsuarioById = async (id: number) => {
  const response = await axiosInstance.get<ApiSuccessResponse<Servidor>>(
    `api/servidors/${id}`
  );
  return extractResponseData<Servidor>(response.data);
};

export const searchUsuarios = async (value: string) => {
  const response = await axiosInstance.get(`api/servidors/value/${value}`);
  return normalizeListResponse<Servidor>(response.data);
};

export const postCadastrarUsuario = async (data: ServidorPayload) => {
  try {
    const response = await axiosInstance.post<ApiSuccessResponse<Servidor>>(
      "api/servidors",
      data
    );
    notifyApiSuccess(response.data, "Usuário cadastrado com sucesso!");
    return extractResponseData<Servidor>(response.data);
  } catch (error) {
    handleApiError(error, "Erro ao cadastrar usuário");
  }
};

export const putAtualizarUsuario = async (id: number, data: ServidorPayload) => {
  try {
    const response = await axiosInstance.put<ApiSuccessResponse<Servidor>>(
      `api/servidors/${id}`,
      data
    );
    notifyApiSuccess(response.data, "Usuário atualizado com sucesso!");
    return extractResponseData<Servidor>(response.data);
  } catch (error) {
    handleApiError(error, "Erro ao atualizar usuário");
  }
};

export const deleteUsuario = async (id: number) => {
  try {
    await axiosInstance.delete(`api/servidors/${id}`);
  } catch (error) {
    handleApiError(error, "Erro ao deletar usuário");
  }
};
