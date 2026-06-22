import axiosInstance from "@/lib/axiosInstance";
import {
  extractResponseData,
  handleApiError,
  normalizeListResponse,
  notifyApiSuccess,
} from "@/lib/api-utils";
import { ApiSuccessResponse, NormalizedListResponse } from "@/types/api";
import { Avaliacao, AvaliacaoPayload } from "@/types/avaliacao";

export const listAvaliacoes = async (
  url = "avaliacoes"
): Promise<NormalizedListResponse<Avaliacao>> => {
  const response = await axiosInstance.get(url);
  return normalizeListResponse<Avaliacao>(response.data);
};

export const getAvaliacaoById = async (id: number) => {
  const response = await axiosInstance.get<ApiSuccessResponse<Avaliacao>>(
    `avaliacoes/${id}`
  );
  return extractResponseData<Avaliacao>(response.data);
};

export const searchAvaliacoes = async (value: string) => {
  const response = await axiosInstance.get(`avaliacoes/value/${value}`);
  return normalizeListResponse<Avaliacao>(response.data);
};

export const createAvaliacao = async (data: AvaliacaoPayload) => {
  try {
    const response = await axiosInstance.post<ApiSuccessResponse<Avaliacao>>(
      "avaliacoes",
      data
    );
    notifyApiSuccess(response.data, "Avaliacao cadastrada com sucesso!");
    return extractResponseData<Avaliacao>(response.data);
  } catch (error) {
    handleApiError(error, "Erro ao cadastrar avaliacao");
  }
};

export const updateAvaliacao = async (
  id: number,
  data: AvaliacaoPayload
) => {
  try {
    const response = await axiosInstance.put<ApiSuccessResponse<Avaliacao>>(
      `avaliacoes/${id}`,
      data
    );
    notifyApiSuccess(response.data, "Avaliacao atualizada com sucesso!");
    return extractResponseData<Avaliacao>(response.data);
  } catch (error) {
    handleApiError(error, "Erro ao atualizar avaliacao");
  }
};

export const removeAvaliacao = async (id: number) => {
  try {
    await axiosInstance.delete(`avaliacoes/${id}`);
    notifyApiSuccess(null, "Avaliacao deletada com sucesso!");
  } catch (error) {
    handleApiError(error, "Erro ao deletar avaliacao");
  }
};
