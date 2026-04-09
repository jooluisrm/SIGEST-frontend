import axiosInstance from "@/lib/axiosInstance";
import {
  extractResponseData,
  handleApiError,
  normalizeListResponse,
  notifyApiSuccess,
} from "@/lib/api-utils";
import { ApiSuccessResponse, NormalizedListResponse } from "@/types/api";
import { Disciplina, DisciplinaPayload } from "@/types/disciplina";

export const listDisciplinas = async (
  url = "disciplinas"
): Promise<NormalizedListResponse<Disciplina>> => {
  const response = await axiosInstance.get(url);
  return normalizeListResponse<Disciplina>(response.data);
};

export const getDisciplinaById = async (id: number) => {
  const response = await axiosInstance.get<ApiSuccessResponse<Disciplina>>(
    `disciplinas/${id}`
  );
  return extractResponseData<Disciplina>(response.data);
};

export const searchDisciplinas = async (value: string) => {
  const response = await axiosInstance.get(`disciplinas/value/${value}`);
  return normalizeListResponse<Disciplina>(response.data);
};

export const createDisciplina = async (data: DisciplinaPayload) => {
  try {
    const response = await axiosInstance.post<ApiSuccessResponse<Disciplina>>(
      "disciplinas",
      data
    );
    notifyApiSuccess(response.data, "Disciplina cadastrada com sucesso!");
    return extractResponseData<Disciplina>(response.data);
  } catch (error) {
    handleApiError(error, "Erro ao cadastrar disciplina");
  }
};

export const updateDisciplina = async (id: number, data: DisciplinaPayload) => {
  try {
    const response = await axiosInstance.put<ApiSuccessResponse<Disciplina>>(
      `disciplinas/${id}`,
      data
    );
    notifyApiSuccess(response.data, "Disciplina atualizada com sucesso!");
    return extractResponseData<Disciplina>(response.data);
  } catch (error) {
    handleApiError(error, "Erro ao atualizar disciplina");
  }
};

export const removeDisciplina = async (id: number) => {
  try {
    await axiosInstance.delete(`disciplinas/${id}`);
  } catch (error) {
    handleApiError(error, "Erro ao deletar disciplina");
  }
};
