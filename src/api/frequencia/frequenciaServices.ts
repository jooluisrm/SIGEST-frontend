import axiosInstance from "@/lib/axiosInstance";
import { FrequenciaStub } from "@/types/frequencia";

export const getFrequenciasStub = async () => {
  const response = await axiosInstance.get<FrequenciaStub>("api/frequencias");
  return response.data;
};
