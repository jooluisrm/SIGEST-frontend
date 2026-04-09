import axiosInstance from "@/lib/axiosInstance";
import { FrequenciaStub } from "@/types/frequencia";

export const listFrequenciasStub = async () => {
  const response = await axiosInstance.get<FrequenciaStub>("frequencias");
  return response.data;
};
