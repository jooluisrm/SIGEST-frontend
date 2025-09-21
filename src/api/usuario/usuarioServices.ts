import axiosInstance from "@/lib/axiosInstance";

export const getUsuarios = async () => {
    const response = await axiosInstance.get('api/servidor');
    console.log(response.data);
    return response.data.data;
}
