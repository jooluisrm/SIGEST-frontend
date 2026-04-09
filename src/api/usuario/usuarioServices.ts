import axiosInstance from "@/lib/axiosInstance";
import {
  extractResponseData,
  handleApiError,
  normalizeListResponse,
  notifyApiSuccess,
} from "@/lib/api-utils";
import { ApiSuccessResponse, NormalizedListResponse } from "@/types/api";
import { Servidor, ServidorPayload } from "@/types/servidor";

export const listUsuarios = async (
  url = "servidors"
): Promise<NormalizedListResponse<Servidor>> => {
  const response = await axiosInstance.get(url);
  return normalizeListResponse<Servidor>(response.data);
};

export const getUsuarioById = async (id: number) => {
  const response = await axiosInstance.get<ApiSuccessResponse<Servidor>>(
    `servidors/${id}`
  );
  return extractResponseData<Servidor>(response.data);
};

export const searchUsuarios = async (value: string) => {
  const response = await axiosInstance.get(`servidors/value/${value}`);
  return normalizeListResponse<Servidor>(response.data);
};

export const createUsuario = async (data: ServidorPayload) => {
  try {
    const response = await axiosInstance.post<ApiSuccessResponse<Servidor>>(
      "servidors",
      data
    );
    notifyApiSuccess(response.data, "Usuário cadastrado com sucesso!");
    return extractResponseData<Servidor>(response.data);
  } catch (error) {
    handleApiError(error, "Erro ao cadastrar usuário");
  }
};

export const updateUsuario = async (id: number, data: ServidorPayload) => {
  try {
    const response = await axiosInstance.put<ApiSuccessResponse<Servidor>>(
      `servidors/${id}`,
      data
    );
    notifyApiSuccess(response.data, "Usuário atualizado com sucesso!");
    return extractResponseData<Servidor>(response.data);
  } catch (error) {
    handleApiError(error, "Erro ao atualizar usuário");
  }
};

export const removeUsuario = async (id: number) => {
  try {
    await axiosInstance.delete(`servidors/${id}`);
  } catch (error) {
    handleApiError(error, "Erro ao deletar usuário");
  }
};
