import axiosInstance from "@/lib/axiosInstance";

export const getAlunos = async () => {
    const response = await axiosInstance.get('api/aluno');
    console.log(response.data);
    return response.data.data;
}
