import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated, isLoading } = useAuth();

    // Affichage d'un loader pendant la vérification de l'authentification
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#1E293B]">
                <div className="text-white text-lg">Chargement...</div>
            </div>
        );
    }

    // Redirection vers la page de connexion si non authentifié
    if (!isAuthenticated) {
        return <Navigate to="/signin" replace />;
    }

    return <>{children}</>;
}
