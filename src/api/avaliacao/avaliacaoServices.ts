import axiosInstance from "@/lib/axiosInstance";
import {
  extractResponseData,
  handleApiError,
  normalizeListResponse,
  notifyApiSuccess,
} from "@/lib/api-utils";
import { ApiSuccessResponse, NormalizedListResponse } from "@/types/api";
import { Atividade, AtividadePayload } from "@/types/avaliacao";

export const listAvaliacoes = async (
  url = "atividades"
): Promise<NormalizedListResponse<Atividade>> => {
  const response = await axiosInstance.get(url);
  return normalizeListResponse<Atividade>(response.data);
};

export const getAvaliacaoById = async (id: number) => {
  const response = await axiosInstance.get<ApiSuccessResponse<Atividade>>(
    `atividades/${id}`
  );
  return extractResponseData<Atividade>(response.data);
};

export const searchAvaliacoes = async (value: string) => {
  const response = await axiosInstance.get(`atividades/value/${value}`);
  return normalizeListResponse<Atividade>(response.data);
};

export const createAvaliacao = async (data: AtividadePayload) => {
  try {
    const response = await axiosInstance.post<ApiSuccessResponse<Atividade>>(
      "atividades",
      data
    );
    notifyApiSuccess(response.data, "Atividade cadastrada com sucesso!");
    return extractResponseData<Atividade>(response.data);
  } catch (error) {
    handleApiError(error, "Erro ao cadastrar atividade");
  }
};

export const updateAvaliacao = async (id: number, data: AtividadePayload) => {
  try {
    const response = await axiosInstance.put<ApiSuccessResponse<Atividade>>(
      `atividades/${id}`,
      data
    );
    notifyApiSuccess(response.data, "Atividade atualizada com sucesso!");
    return extractResponseData<Atividade>(response.data);
  } catch (error) {
    handleApiError(error, "Erro ao atualizar atividade");
  }
};

export const removeAvaliacao = async (id: number) => {
  try {
    await axiosInstance.delete(`atividades/${id}`);
    notifyApiSuccess(null, "Atividade deletada com sucesso!");
  } catch (error) {
    handleApiError(error, "Erro ao deletar atividade");
  }
};
