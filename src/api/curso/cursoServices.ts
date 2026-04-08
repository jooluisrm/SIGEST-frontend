import axiosInstance from "@/lib/axiosInstance";
import { Course, CoursePayload } from "@/types/course";
import { ApiSuccessResponse, NormalizedListResponse } from "@/types/api";
import {
  extractResponseData,
  handleApiError,
  normalizeListResponse,
  notifyApiSuccess,
} from "@/lib/api-utils";

export const getCursos = async (
  url = "api/courses"
): Promise<NormalizedListResponse<Course>> => {
  const response = await axiosInstance.get(url);
  return normalizeListResponse<Course>(response.data);
};

export const getCursoById = async (id: number) => {
  const response = await axiosInstance.get<ApiSuccessResponse<Course>>(
    `api/courses/${id}`
  );
  return extractResponseData<Course>(response.data);
};

export const searchCursos = async (value: string) => {
  const response = await axiosInstance.get(`api/courses/value/${value}`);
  return normalizeListResponse<Course>(response.data);
};

export const postCadastrarCurso = async (data: CoursePayload) => {
  try {
    const response = await axiosInstance.post<ApiSuccessResponse<Course>>(
      "api/courses",
      data
    );
    notifyApiSuccess(response.data, "Curso cadastrado com sucesso!");
    return extractResponseData<Course>(response.data);
  } catch (error) {
    handleApiError(error, "Erro ao cadastrar curso");
  }
};

export const putAtualizarCurso = async (id: number, data: CoursePayload) => {
  try {
    const response = await axiosInstance.put<ApiSuccessResponse<Course>>(
      `api/courses/${id}`,
      data
    );
    notifyApiSuccess(response.data, "Curso atualizado com sucesso!");
    return extractResponseData<Course>(response.data);
  } catch (error) {
    handleApiError(error, "Erro ao atualizar curso");
  }
};

export const deleteCurso = async (id: number) => {
  try {
    await axiosInstance.delete(`api/courses/${id}`);
  } catch (error) {
    handleApiError(error, "Erro ao deletar curso");
  }
};
