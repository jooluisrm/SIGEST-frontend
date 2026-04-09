import axiosInstance from "@/lib/axiosInstance";
import {
  extractResponseData,
  handleApiError,
  normalizeListResponse,
  notifyApiSuccess,
} from "@/lib/api-utils";
import { ApiSuccessResponse, NormalizedListResponse } from "@/types/api";
import { Classroom } from "@/types/classroom";
import { GenerateClassroomsPayload, Period } from "@/types/period";

export const listPeriodos = async (
  url = "periods"
): Promise<NormalizedListResponse<Period>> => {
  const response = await axiosInstance.get(url);
  return normalizeListResponse<Period>(response.data);
};

export const getPeriodoById = async (id: number) => {
  const response = await axiosInstance.get<ApiSuccessResponse<Period>>(`periods/${id}`);
  return extractResponseData<Period>(response.data);
};

export const getPeriodosByCurso = async (courseId: number) => {
  const response = await axiosInstance.get(`periods/show-periods-for-course/${courseId}`);
  return normalizeListResponse<Period>(response.data);
};

export const generateTurmasByPeriodo = async (
  periodId: number,
  params: GenerateClassroomsPayload
) => {
  try {
    const response = await axiosInstance.get<ApiSuccessResponse<Classroom[] | null>>(
      `periods/${periodId}/generate-classrooms`,
      { params }
    );
    notifyApiSuccess(response.data, "Turmas geradas com sucesso!");
    return extractResponseData<Classroom[] | null>(response.data) ?? [];
  } catch (error) {
    handleApiError(error, "Erro ao gerar turmas");
  }
};
