import axiosInstance from "@/lib/axiosInstance";
import {
  extractResponseData,
  handleApiError,
  normalizeListResponse,
  notifyApiSuccess,
} from "@/lib/api-utils";
import { ApiSuccessResponse, NormalizedListResponse } from "@/types/api";
import { Classroom } from "@/types/classroom";
import { CreatePeriodPayload, GenerateClassroomsPayload, Period } from "@/types/period";

export const listPeriodos = async (
  url = "periodoletivo"
): Promise<NormalizedListResponse<Period>> => {
  const response = await axiosInstance.get(url);
  return normalizeListResponse<Period>(response.data);
};

export const getPeriodoById = async (id: number) => {
  const response = await axiosInstance.get<ApiSuccessResponse<Period>>(`periodoletivo/${id}`);
  return extractResponseData<Period>(response.data);
};

export const getPeriodosByCurso = async (courseId: number) => {
  const response = await axiosInstance.get(`periodoletivo/show-periods-for-course/${courseId}`);
  return normalizeListResponse<Period>(response.data);
};

export const createPeriodo = async (payload: CreatePeriodPayload) => {
  try {
    const response = await axiosInstance.post<ApiSuccessResponse<Period>>("periodoletivo", payload);
    notifyApiSuccess(response.data, "Período Letivo criado com sucesso!");
    return extractResponseData<Period>(response.data);
  } catch (error) {
    handleApiError(error, "Erro ao criar período letivo");
  }
};

export const closePeriodo = async (id: number) => {
  try {
    const response = await axiosInstance.patch<ApiSuccessResponse<Period>>(`periodoletivo/${id}`, { status: false });
    notifyApiSuccess(response.data, "Período Letivo fechado com sucesso!");
    return extractResponseData<Period>(response.data);
  } catch (error) {
    handleApiError(error, "Erro ao fechar período letivo");
  }
};

export const generateTurmasByPeriodo = async (
  periodId: number,
  params: GenerateClassroomsPayload
) => {
  try {
    const response = await axiosInstance.get<ApiSuccessResponse<Classroom[] | null>>(
      `periodoletivo/${periodId}/generate-classrooms`,
      { params }
    );
    notifyApiSuccess(response.data, "Turmas geradas com sucesso!");
    return extractResponseData<Classroom[] | null>(response.data) ?? [];
  } catch (error) {
    handleApiError(error, "Erro ao gerar turmas");
  }
};
