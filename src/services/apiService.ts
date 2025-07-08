import axios, { AxiosInstance } from "axios";

// URL de base de l'API depuis les variables d'environnement
const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// Création de l'instance axios avec configuration de base
const api: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    },
});

// Fonction pour récupérer le token depuis localStorage
const getAuthToken = (): string | null => {
    return localStorage.getItem("auth_token");
};

// Intercepteur pour ajouter automatiquement le token d'authentification
api.interceptors.request.use((config) => {
    const token = getAuthToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Intercepteur pour gérer les erreurs d'authentification
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expiré ou invalide, on déconnecte l'utilisateur
            localStorage.removeItem("auth_token");
            window.location.href = "/signin";
        }
        return Promise.reject(error);
    }
);

// Service d'API unifié
export const apiService = {
    // Instance axios configurée
    instance: api,

    // Méthodes utilitaires pour l'authentification
    setToken(token: string): void {
        localStorage.setItem("auth_token", token);
    },

    getToken(): string | null {
        return getAuthToken();
    },

    removeToken(): void {
        localStorage.removeItem("auth_token");
    },

    isAuthenticated(): boolean {
        return !!getAuthToken();
    },
};

// Export de l'instance pour compatibilité
export function getApiService() {
    return api;
}
