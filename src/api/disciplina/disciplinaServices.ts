import axiosInstance from "@/lib/axiosInstance";
import { Disciplina, DisciplinaPayload } from "@/types/disciplina";
import { ApiSuccessResponse, NormalizedListResponse } from "@/types/api";
import {
  extractResponseData,
  handleApiError,
  normalizeListResponse,
  notifyApiSuccess,
} from "@/lib/api-utils";

export const getDisciplinas = async (
  url = "api/disciplinas"
): Promise<NormalizedListResponse<Disciplina>> => {
  const response = await axiosInstance.get(url);
  return normalizeListResponse<Disciplina>(response.data);
};

export const getDisciplinaById = async (id: number) => {
  const response = await axiosInstance.get<ApiSuccessResponse<Disciplina>>(
    `api/disciplinas/${id}`
  );
  return extractResponseData<Disciplina>(response.data);
};

export const searchDisciplinas = async (value: string) => {
  const response = await axiosInstance.get(`api/disciplinas/value/${value}`);
  return normalizeListResponse<Disciplina>(response.data);
};

export const postCadastrarDisciplina = async (data: DisciplinaPayload) => {
  try {
    const response = await axiosInstance.post<ApiSuccessResponse<Disciplina>>(
      "api/disciplinas",
      data
    );
    notifyApiSuccess(response.data, "Disciplina cadastrada com sucesso!");
    return extractResponseData<Disciplina>(response.data);
  } catch (error) {
    handleApiError(error, "Erro ao cadastrar disciplina");
  }
};

export const putAtualizarDisciplina = async (
  id: number,
  data: DisciplinaPayload
) => {
  try {
    const response = await axiosInstance.put<ApiSuccessResponse<Disciplina>>(
      `api/disciplinas/${id}`,
      data
    );
    notifyApiSuccess(response.data, "Disciplina atualizada com sucesso!");
    return extractResponseData<Disciplina>(response.data);
  } catch (error) {
    handleApiError(error, "Erro ao atualizar disciplina");
  }
};

export const deleteDisciplina = async (id: number) => {
  try {
    await axiosInstance.delete(`api/disciplinas/${id}`);
  } catch (error) {
    handleApiError(error, "Erro ao deletar disciplina");
  }
};
