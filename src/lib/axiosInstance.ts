// lib/axiosInstance.ts

import axios, { InternalAxiosRequestConfig } from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL não está definida.');
}

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para adicionar o token de autenticação nas requisições
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Verificar se estamos no cliente (browser)
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('sigest_access_token');
            const tokenType = localStorage.getItem('sigest_token_type') || 'Bearer';

            if (token) {
                config.headers.Authorization = `${tokenType} ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para tratar erros de autenticação
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Se receber 401 (Unauthorized), limpar os dados do usuário
        if (error.response?.status === 401) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('sigest_user');
                localStorage.removeItem('sigest_access_token');
                localStorage.removeItem('sigest_token_type');
                // Redirecionar para login se necessário
                // window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
