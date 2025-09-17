import axiosInstance from "@/lib/axiosInstance";

export const getDisciplina = async () => {
    const response = await axiosInstance.get('api/disciplina');
    console.log(response.data);
    return response.data.data;
};