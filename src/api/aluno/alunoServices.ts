import axiosInstance from "@/lib/axiosInstance";
import { Aluno, AlunoPayload } from "@/types/aluno";
import { ApiSuccessResponse, NormalizedListResponse } from "@/types/api";
import {
  extractResponseData,
  handleApiError,
  normalizeListResponse,
  notifyApiSuccess,
} from "@/lib/api-utils";

export const getAlunos = async (
  url = "api/alunos"
): Promise<NormalizedListResponse<Aluno>> => {
  const response = await axiosInstance.get(url);
  return normalizeListResponse<Aluno>(response.data);
};

export const getAlunoById = async (id: number) => {
  const response = await axiosInstance.get<ApiSuccessResponse<Aluno>>(
    `api/alunos/${id}`
  );
  return extractResponseData<Aluno>(response.data);
};

export const searchAlunos = async (value: string) => {
  const response = await axiosInstance.get(`api/alunos/value/${value}`);
  return normalizeListResponse<Aluno>(response.data);
};

export const postCadastrarAluno = async (data: AlunoPayload) => {
  try {
    const response = await axiosInstance.post<ApiSuccessResponse<Aluno>>(
      "api/alunos",
      data
    );
    notifyApiSuccess(response.data, "Aluno cadastrado com sucesso!");
    return extractResponseData<Aluno>(response.data);
  } catch (error) {
    handleApiError(error, "Erro ao cadastrar aluno");
  }
};

export const putAtualizarAluno = async (id: number, data: AlunoPayload) => {
  try {
    const response = await axiosInstance.put<ApiSuccessResponse<Aluno>>(
      `api/alunos/${id}`,
      data
    );
    notifyApiSuccess(response.data, "Aluno atualizado com sucesso!");
    return extractResponseData<Aluno>(response.data);
  } catch (error) {
    handleApiError(error, "Erro ao atualizar aluno");
  }
};

export const deleteAluno = async (id: number) => {
  try {
    await axiosInstance.delete(`api/alunos/${id}`);
  } catch (error) {
    handleApiError(error, "Erro ao deletar aluno");
  }
};
