import axiosInstance from "@/lib/axiosInstance";
import { Professor, ProfessorPayload } from "@/types/professor";
import { ApiSuccessResponse, NormalizedListResponse } from "@/types/api";
import {
  extractResponseData,
  handleApiError,
  normalizeListResponse,
  notifyApiSuccess,
} from "@/lib/api-utils";

export const getProfessores = async (
  url = "api/professors"
): Promise<NormalizedListResponse<Professor>> => {
  const response = await axiosInstance.get(url);
  return normalizeListResponse<Professor>(response.data);
};

export const getProfessorById = async (id: number) => {
  const response = await axiosInstance.get<ApiSuccessResponse<Professor>>(
    `api/professors/${id}`
  );
  return extractResponseData<Professor>(response.data);
};

export const searchProfessores = async (value: string) => {
  const response = await axiosInstance.get(`api/professors/value/${value}`);
  return normalizeListResponse<Professor>(response.data);
};

export const postCadastrarProfessor = async (data: ProfessorPayload) => {
  try {
    const response = await axiosInstance.post<ApiSuccessResponse<Professor>>(
      "api/professors",
      data
    );
    notifyApiSuccess(response.data, "Professor cadastrado com sucesso!");
    return extractResponseData<Professor>(response.data);
  } catch (error) {
    handleApiError(error, "Erro ao cadastrar professor");
  }
};

export const putAtualizarProfessor = async (
  id: number,
  data: ProfessorPayload
) => {
  try {
    const response = await axiosInstance.put<ApiSuccessResponse<Professor>>(
      `api/professors/${id}`,
      data
    );
    notifyApiSuccess(response.data, "Professor atualizado com sucesso!");
    return extractResponseData<Professor>(response.data);
  } catch (error) {
    handleApiError(error, "Erro ao atualizar professor");
  }
};

export const deleteProfessor = async (id: number) => {
  try {
    await axiosInstance.delete(`api/professors/${id}`);
  } catch (error) {
    handleApiError(error, "Erro ao deletar professor");
  }
};
