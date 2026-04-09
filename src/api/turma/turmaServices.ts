import axiosInstance from "@/lib/axiosInstance";
import {
  extractResponseData,
  handleApiError,
  normalizeListResponse,
  notifyApiSuccess,
} from "@/lib/api-utils";
import { ApiSuccessResponse, NormalizedListResponse } from "@/types/api";
import { Classroom, ClassroomPayload } from "@/types/classroom";

export const listTurmas = async (
  url = "classrooms"
): Promise<NormalizedListResponse<Classroom>> => {
  const response = await axiosInstance.get(url);
  return normalizeListResponse<Classroom>(response.data);
};

export const getTurmaById = async (id: number) => {
  const response = await axiosInstance.get<ApiSuccessResponse<Classroom>>(
    `classrooms/${id}`
  );
  return extractResponseData<Classroom>(response.data);
};

export const getTurmasByPeriodo = async (periodId: number) => {
  const response = await axiosInstance.get(
    `classrooms/show-classroom-for-period/${periodId}`
  );
  return normalizeListResponse<Classroom>(response.data);
};

export const createTurma = async (data: ClassroomPayload) => {
  try {
    const response = await axiosInstance.post<ApiSuccessResponse<Classroom>>(
      "classrooms",
      data
    );
    notifyApiSuccess(response.data, "Turma cadastrada com sucesso!");
    return extractResponseData<Classroom>(response.data);
  } catch (error) {
    handleApiError(error, "Erro ao cadastrar turma");
  }
};

export const removeTurma = async (id: number) => {
  try {
    await axiosInstance.delete(`classrooms/${id}`);
  } catch (error) {
    handleApiError(error, "Erro ao deletar turma");
  }
};
