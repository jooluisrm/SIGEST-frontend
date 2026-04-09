import axiosInstance from "@/lib/axiosInstance";
import {
  extractResponseData,
  handleApiError,
  normalizeListResponse,
  notifyApiSuccess,
} from "@/lib/api-utils";
import { ApiSuccessResponse, NormalizedListResponse } from "@/types/api";
import { Course, CoursePayload } from "@/types/course";

export const listCursos = async (
  url = "courses"
): Promise<NormalizedListResponse<Course>> => {
  const response = await axiosInstance.get(url);
  return normalizeListResponse<Course>(response.data);
};

export const getCursoById = async (id: number) => {
  const response = await axiosInstance.get<ApiSuccessResponse<Course>>(`courses/${id}`);
  return extractResponseData<Course>(response.data);
};

export const searchCursos = async (value: string) => {
  const response = await axiosInstance.get(`courses/value/${value}`);
  return normalizeListResponse<Course>(response.data);
};

export const createCurso = async (data: CoursePayload) => {
  try {
    const response = await axiosInstance.post<ApiSuccessResponse<Course>>("courses", data);
    notifyApiSuccess(response.data, "Curso cadastrado com sucesso!");
    return extractResponseData<Course>(response.data);
  } catch (error) {
    handleApiError(error, "Erro ao cadastrar curso");
  }
};

export const updateCurso = async (id: number, data: CoursePayload) => {
  try {
    const response = await axiosInstance.put<ApiSuccessResponse<Course>>(
      `courses/${id}`,
      data
    );
    notifyApiSuccess(response.data, "Curso atualizado com sucesso!");
    return extractResponseData<Course>(response.data);
  } catch (error) {
    handleApiError(error, "Erro ao atualizar curso");
  }
};

export const removeCurso = async (id: number) => {
  try {
    await axiosInstance.delete(`courses/${id}`);
  } catch (error) {
    handleApiError(error, "Erro ao deletar curso");
  }
};
