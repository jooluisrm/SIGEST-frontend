// lib/axiosInstance.ts

import axios from 'axios';

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

export default axiosInstance;
