import axios, { AxiosInstance } from "axios";

export function apiService() {
    const headers = { 'Access-Control-Allow-Origin': '*' };
    const api: AxiosInstance = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        headers: headers,
    });
    
    return api;
}
