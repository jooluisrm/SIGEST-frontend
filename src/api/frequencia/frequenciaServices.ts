import axiosInstance from "@/lib/axiosInstance";
import {
  extractResponseData,
  handleApiError,
  normalizeListResponse,
  notifyApiSuccess,
} from "@/lib/api-utils";
import { ApiSuccessResponse, NormalizedListResponse } from "@/types/api";
import { Frequencia, FrequenciaPayload, FrequenciaStub } from "@/types/frequencia";

export const listFrequencias = async (
  url = "frequencias"
): Promise<NormalizedListResponse<Frequencia>> => {
  const response = await axiosInstance.get(url);
  return normalizeListResponse<Frequencia>(response.data);
};

export const listFrequenciasStub = async () => {
  const response = await axiosInstance.get<FrequenciaStub>("frequencias");
  return response.data;
};

export const createFrequencia = async (data: FrequenciaPayload) => {
  try {
    const response = await axiosInstance.post<ApiSuccessResponse<Frequencia>>(
      "frequencias",
      data
    );
    notifyApiSuccess(response.data, "Frequencia registrada com sucesso!");
    return extractResponseData<Frequencia>(response.data);
  } catch (error) {
    handleApiError(error, "Erro ao registrar frequencia");
  }
};
