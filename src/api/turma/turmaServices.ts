import axiosInstance from "@/lib/axiosInstance";
import { Classroom, ClassroomPayload } from "@/types/classroom";
import { ApiSuccessResponse, NormalizedListResponse } from "@/types/api";
import {
  extractResponseData,
  handleApiError,
  normalizeListResponse,
  notifyApiSuccess,
} from "@/lib/api-utils";

export const getTurmas = async (
  url = "api/classrooms"
): Promise<NormalizedListResponse<Classroom>> => {
  const response = await axiosInstance.get(url);
  return normalizeListResponse<Classroom>(response.data);
};

export const getTurmaById = async (id: number) => {
  const response = await axiosInstance.get<ApiSuccessResponse<Classroom>>(
    `api/classrooms/${id}`
  );
  return extractResponseData<Classroom>(response.data);
};

export const getTurmasByPeriodo = async (periodId: number) => {
  const response = await axiosInstance.get(
    `api/classrooms/show-classroom-for-period/${periodId}`
  );
  return normalizeListResponse<Classroom>(response.data);
};

export const postCadastrarTurma = async (data: ClassroomPayload) => {
  try {
    const response = await axiosInstance.post<ApiSuccessResponse<Classroom>>(
      "api/classrooms",
      data
    );
    notifyApiSuccess(response.data, "Turma cadastrada com sucesso!");
    return extractResponseData<Classroom>(response.data);
  } catch (error) {
    handleApiError(error, "Erro ao cadastrar turma");
  }
};

export const deleteTurma = async (id: number) => {
  try {
    await axiosInstance.delete(`api/classrooms/${id}`);
  } catch (error) {
    handleApiError(error, "Erro ao deletar turma");
  }
};
