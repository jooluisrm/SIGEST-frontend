import axiosInstance from "@/lib/axiosInstance";

type TypeLogin = {
    email: string;
    password: string;
}

export const postLogin = async (data: TypeLogin) => {
    const response = await axiosInstance.post('api/login', data);
    return response.data;
}