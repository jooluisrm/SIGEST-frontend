import axiosInstance from "@/lib/axiosInstance";
import {
  extractResponseData,
  handleApiError,
  normalizeListResponse,
  notifyApiSuccess,
} from "@/lib/api-utils";
import { ApiSuccessResponse, NormalizedListResponse } from "@/types/api";
import { Classroom } from "@/types/classroom";
import { CreatePeriodPayload, GenerateClassroomsPayload, Period } from "@/types/period";

const PERIODS_ENDPOINT = "periods";
const PERIODO_LETIVO_ENDPOINT = "periodoletivo";

export const listPeriodos = async (
  url = PERIODO_LETIVO_ENDPOINT
): Promise<NormalizedListResponse<Period>> => {
  const response = await axiosInstance.get(url);
  return normalizeListResponse<Period>(response.data);
};

export const getPeriodoById = async (id: number) => {
  const response = await axiosInstance.get<ApiSuccessResponse<Period>>(
    `${PERIODO_LETIVO_ENDPOINT}/${id}`
  );
  return extractResponseData<Period>(response.data);
};

export const getPeriodosLetivosByCurso = async (courseId: number) => {
  const response = await axiosInstance.get(`courses/${courseId}/periodos-letivos`);
  return normalizeListResponse<Period>(response.data);
};

export const getSeriesByPeriodoLetivo = async (periodoLetivoId: number) => {
  const response = await axiosInstance.get(
    `${PERIODS_ENDPOINT}/${periodoLetivoId}/series-por-periodo-letivo`
  );
  return normalizeListResponse<Period>(response.data);
};

export const getPeriodosByCurso = async (courseId: number) => {
  const periodosLetivos = await getPeriodosLetivosByCurso(courseId);
  const seriesResponses = await Promise.all(
    periodosLetivos.data.map((periodoLetivo) =>
      getSeriesByPeriodoLetivo(periodoLetivo.id)
    )
  );

  return {
    ...periodosLetivos,
    data: seriesResponses.flatMap((response) => response.data),
  };
};

export const createPeriodo = async (payload: CreatePeriodPayload) => {
  try {
    const response = await axiosInstance.post<ApiSuccessResponse<Period>>(
      PERIODO_LETIVO_ENDPOINT,
      {
        course_id: payload.course_id,
        name: payload.name,
        data_inicio: payload.start_date,
        data_encerramento: payload.end_date,
      }
    );
    notifyApiSuccess(response.data, "Periodo Letivo criado com sucesso!");
    return extractResponseData<Period>(response.data);
  } catch (error) {
    handleApiError(error, "Erro ao criar periodo letivo");
  }
};

export const closePeriodo = async (id: number) => {
  try {
    const response = await axiosInstance.patch<ApiSuccessResponse<Period>>(
      `${PERIODO_LETIVO_ENDPOINT}/${id}`,
      { status: false }
    );
    notifyApiSuccess(response.data, "Periodo Letivo fechado com sucesso!");
    return extractResponseData<Period>(response.data);
  } catch (error) {
    handleApiError(error, "Erro ao fechar periodo letivo");
  }
};

export const generateTurmasByPeriodo = async (
  periodId: number,
  params: GenerateClassroomsPayload
) => {
  try {
    const response = await axiosInstance.get<ApiSuccessResponse<Classroom[] | null>>(
      `${PERIODS_ENDPOINT}/${periodId}/generate-classrooms`,
      { params }
    );
    notifyApiSuccess(response.data, "Turmas geradas com sucesso!");
    return extractResponseData<Classroom[] | null>(response.data) ?? [];
  } catch (error) {
    handleApiError(error, "Erro ao gerar turmas");
  }
};
