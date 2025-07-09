import { apiService } from "./apiService";
import { LoginData, LoginResponse, User } from "../types/auth";

// Service d'authentification utilisant le service API unifié
export const authService = {
    // Connexion utilisateur
    async login(credentials: LoginData): Promise<LoginResponse> {
        const response = await apiService.instance.post(
            "/auth/login",
            credentials
        );
        return response.data;
    },

    // Récupération des informations utilisateur
    async getMe(): Promise<User> {
        const token = apiService.getToken();
        if (!token) {
            throw new Error("Aucun token trouvé");
        }

        const response = await apiService.instance.get("/auth/me");
        return response.data;
    },
};
