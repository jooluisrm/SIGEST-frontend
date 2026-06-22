import axiosInstance from "@/lib/axiosInstance";
import { normalizeListResponse } from "@/lib/api-utils";
import { NormalizedListResponse } from "@/types/api";
import { OfertaDisciplina } from "@/types/oferta-disciplina";

export const listOfertaDisciplinas = async (
  url = "oferta-disciplinas"
): Promise<NormalizedListResponse<OfertaDisciplina>> => {
  const response = await axiosInstance.get(url);
  return normalizeListResponse<OfertaDisciplina>(response.data);
};
