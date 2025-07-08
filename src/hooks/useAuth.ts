import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/authService";
import { toast } from "react-toastify";
import { User } from "../types/auth";

// Hook pour gérer l'authentification
export const useAuth = () => {
    const queryClient = useQueryClient();

    // Query pour récupérer les informations utilisateur
    const {
        data: user,
        isLoading,
        error,
        refetch,
    } = useQuery<User>({
        queryKey: ["auth", "me"],
        queryFn: authService.getMe,
        enabled: authService.isAuthenticated(), // Ne s'exécute que si un token existe
        retry: false, // Ne pas réessayer en cas d'échec
        staleTime: 5 * 60 * 1000, // Considérer les données comme fraîches pendant 5 minutes
    });

    // Mutation pour la connexion
    const loginMutation = useMutation({
        mutationFn: authService.login,
        onSuccess: (data) => {
            // Stocker le token
            authService.setToken(data.access_token);

            // Invalider et refetch les données utilisateur
            queryClient.invalidateQueries({ queryKey: ["auth", "me"] });

            // Afficher un message de succès
            toast.success("Connexion réussie !");
        },
        onError: (error: any) => {
            // Afficher l'erreur
            const message =
                error.response?.data?.message || "Erreur de connexion";
            toast.error(message);
        },
    });

    // Fonction de déconnexion
    const logout = () => {
        authService.removeToken();
        queryClient.clear(); // Vider le cache
        toast.info("Déconnexion réussie");
    };

    // Fonction de connexion
    const login = (email: string, password: string) => {
        loginMutation.mutate({ email, password });
    };

    return {
        // État
        user: user || null,
        isLoading,
        error,
        isAuthenticated: !!user,

        // Actions
        login,
        logout,
        refetch,

        // État de la mutation
        isLoggingIn: loginMutation.isPending,
    };
};
