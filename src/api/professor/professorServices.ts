import axiosInstance from "@/lib/axiosInstance";
import {
  extractResponseData,
  handleApiError,
  normalizeListResponse,
  notifyApiSuccess,
} from "@/lib/api-utils";
import { ApiSuccessResponse, NormalizedListResponse } from "@/types/api";
import { Professor, ProfessorPayload } from "@/types/professor";

export const listProfessores = async (
  url = "professors"
): Promise<NormalizedListResponse<Professor>> => {
  const response = await axiosInstance.get(url);
  return normalizeListResponse<Professor>(response.data);
};

export const getProfessorById = async (id: number) => {
  const response = await axiosInstance.get<ApiSuccessResponse<Professor>>(
    `professors/${id}`
  );
  return extractResponseData<Professor>(response.data);
};

export const searchProfessores = async (value: string) => {
  const response = await axiosInstance.get(`professors/value/${value}`);
  return normalizeListResponse<Professor>(response.data);
};

export const createProfessor = async (data: ProfessorPayload) => {
  try {
    const response = await axiosInstance.post<ApiSuccessResponse<Professor>>(
      "professors",
      data
    );
    notifyApiSuccess(response.data, "Professor cadastrado com sucesso!");
    return extractResponseData<Professor>(response.data);
  } catch (error) {
    handleApiError(error, "Erro ao cadastrar professor");
  }
};

export const updateProfessor = async (id: number, data: ProfessorPayload) => {
  try {
    const response = await axiosInstance.put<ApiSuccessResponse<Professor>>(
      `professors/${id}`,
      data
    );
    notifyApiSuccess(response.data, "Professor atualizado com sucesso!");
    return extractResponseData<Professor>(response.data);
  } catch (error) {
    handleApiError(error, "Erro ao atualizar professor");
  }
};

export const removeProfessor = async (id: number) => {
  try {
    await axiosInstance.delete(`professors/${id}`);
  } catch (error) {
    handleApiError(error, "Erro ao deletar professor");
  }
};
