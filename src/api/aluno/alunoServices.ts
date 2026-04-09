import axiosInstance from "@/lib/axiosInstance";
import {
  extractResponseData,
  handleApiError,
  normalizeListResponse,
  notifyApiSuccess,
} from "@/lib/api-utils";
import { Aluno, AlunoPayload } from "@/types/aluno";
import { ApiSuccessResponse, NormalizedListResponse } from "@/types/api";

export const listAlunos = async (
  url = "alunos"
): Promise<NormalizedListResponse<Aluno>> => {
  const response = await axiosInstance.get(url);
  return normalizeListResponse<Aluno>(response.data);
};

export const getAlunoById = async (id: number) => {
  const response = await axiosInstance.get<ApiSuccessResponse<Aluno>>(`alunos/${id}`);
  return extractResponseData<Aluno>(response.data);
};

export const searchAlunos = async (value: string) => {
  const response = await axiosInstance.get(`alunos/value/${value}`);
  return normalizeListResponse<Aluno>(response.data);
};

export const createAluno = async (data: AlunoPayload) => {
  try {
    const response = await axiosInstance.post<ApiSuccessResponse<Aluno>>("alunos", data);
    notifyApiSuccess(response.data, "Aluno cadastrado com sucesso!");
    return extractResponseData<Aluno>(response.data);
  } catch (error) {
    handleApiError(error, "Erro ao cadastrar aluno");
  }
};

export const updateAluno = async (id: number, data: AlunoPayload) => {
  try {
    const response = await axiosInstance.put<ApiSuccessResponse<Aluno>>(
      `alunos/${id}`,
      data
    );
    notifyApiSuccess(response.data, "Aluno atualizado com sucesso!");
    return extractResponseData<Aluno>(response.data);
  } catch (error) {
    handleApiError(error, "Erro ao atualizar aluno");
  }
};

export const removeAluno = async (id: number) => {
  try {
    await axiosInstance.delete(`alunos/${id}`);
  } catch (error) {
    handleApiError(error, "Erro ao deletar aluno");
  }
};
