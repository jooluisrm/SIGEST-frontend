import { NormalizedListResponse } from "@/types/api";

export const listAvaliacoes = async (url?: string): Promise<NormalizedListResponse<any>> => {
  // TODO: Implement actual API call
  return {
    data: [],
    links: null,
    meta: null,
    status: true,
    code: 200,
    message: "Mocked",
  };
};

export const getAvaliacaoById = async (id: number): Promise<any> => {
  // TODO: Implement actual API call
  return {};
};

export const removeAvaliacao = async (id: number): Promise<void> => {
  // TODO: Implement actual API call
};

export const searchAvaliacoes = async (term: string): Promise<NormalizedListResponse<any>> => {
  // TODO: Implement actual API call
  return {
    data: [],
    links: null,
    meta: null,
    status: true,
    code: 200,
    message: "Mocked",
  };
};
