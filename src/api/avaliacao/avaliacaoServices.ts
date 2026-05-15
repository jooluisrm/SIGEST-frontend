import axiosInstance from "@/lib/axiosInstance";
import {
  extractResponseData,
  handleApiError,
  normalizeListResponse,
  notifyApiSuccess,
} from "@/lib/api-utils";
import { ApiSuccessResponse, NormalizedListResponse } from "@/types/api";

export const listAvaliacoes = async (
  url = "avaliacoes"
): Promise<NormalizedListResponse<any>> => {
  const response = await axiosInstance.get(url);
  return normalizeListResponse<any>(response.data);
};

export const getAvaliacaoById = async (id: number) => {
  const response = await axiosInstance.get<ApiSuccessResponse<any>>(
    `avaliacoes/${id}`
  );
  return extractResponseData<any>(response.data);
};

export const searchAvaliacoes = async (value: string) => {
  const response = await axiosInstance.get(`avaliacoes/value/${value}`);
  return normalizeListResponse<any>(response.data);
};

export const createAvaliacao = async (data: any) => {
  try {
    const response = await axiosInstance.post<ApiSuccessResponse<any>>(
      "avaliacoes",
      data
    );
    notifyApiSuccess(response.data, "Avaliação cadastrada com sucesso!");
    return extractResponseData<any>(response.data);
  } catch (error) {
    handleApiError(error, "Erro ao cadastrar avaliação");
  }
};

export const updateAvaliacao = async (id: number, data: any) => {
  try {
    const response = await axiosInstance.put<ApiSuccessResponse<any>>(
      `avaliacoes/${id}`,
      data
    );
    notifyApiSuccess(response.data, "Avaliação atualizada com sucesso!");
    return extractResponseData<any>(response.data);
  } catch (error) {
    handleApiError(error, "Erro ao atualizar avaliação");
  }
};

export const removeAvaliacao = async (id: number) => {
  try {
    await axiosInstance.delete(`avaliacoes/${id}`);
    notifyApiSuccess(null as any, "Avaliação deletada com sucesso!");
  } catch (error) {
    handleApiError(error, "Erro ao deletar avaliação");
  }
};
