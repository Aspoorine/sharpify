import { Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import AboutPage from "./pages/ReportPage";
import ConvertPage from "./pages/ConvertPage";
import HomePage from "./pages/HomePage";
import Sidebar from "./components/Sidebar";
import { ToastContainer } from "react-toastify";
import DocumentsPage from "./pages/DocumentsPage";
import SigninPage from "./pages/SigninPage";
import { useAuth } from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";

// Configuration de TanStack Query
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            retry: 1,
        },
    },
});

// Composant principal de l'application
function AppContent() {
    const { isAuthenticated } = useAuth();

    return (
        <div className="min-h-screen flex bg-[#1E293B]">
            <ToastContainer stacked />

            {/* Sidebar et contenu principal uniquement si authentifié */}
            {isAuthenticated ? (
                <>
                    <Sidebar />
                    <div className="flex-1 flex flex-col">
                        <div className="lg:hidden flex justify-end items-center px-4 py-3 shadow-sm bg-white">
                            <Sidebar.MobileBurger />
                        </div>

                        {/* Contenu */}
                        <div className="flex-1">
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route
                                    path="/convert"
                                    element={<ConvertPage />}
                                />
                                <Route
                                    path="/reports"
                                    element={<AboutPage />}
                                />
                                <Route
                                    path="/documents"
                                    element={<DocumentsPage />}
                                />
                                <Route
                                    path="/signin"
                                    element={<Navigate to="/" replace />}
                                />
                            </Routes>
                        </div>
                    </div>
                </>
            ) : (
                /* Page de connexion si non authentifié */
                <Routes>
                    <Route path="/signin" element={<SigninPage />} />
                    <Route
                        path="*"
                        element={<Navigate to="/signin" replace />}
                    />
                </Routes>
            )}
        </div>
    );
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AppContent />
        </QueryClientProvider>
    );
}

export default App;
