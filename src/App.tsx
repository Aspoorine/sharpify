import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { useAuth } from "./hooks/useAuth";
import ConvertPage from "./pages/ConvertPage";
import DocumentsPage from "./pages/DocumentsPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/ReportPage";
import SigninPage from "./pages/SigninPage";

// Composant principal de l'application
function App() {
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


export default App;
