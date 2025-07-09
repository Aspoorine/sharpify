import { Dialog } from "@headlessui/react";
import {
    ArrowRightOnRectangleIcon,
    Bars3Icon,
    ChartPieIcon,
    DocumentDuplicateIcon,
    HomeIcon,
    PhotoIcon,
    XMarkIcon
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Sidebar() {
    const location = useLocation();
    const { logout, user } = useAuth();

    const navigation = [
        { name: "Dashboard", href: "/", icon: HomeIcon },
        { name: "Conversion", href: "/convert", icon: PhotoIcon },
        { name: "Documents", href: "/documents", icon: DocumentDuplicateIcon },
        { name: "Reports", href: "/reports", icon: ChartPieIcon },
    ];

    return (
        <>
            {/* Sidebar */}
            <div className="hidden lg:flex lg:flex-col lg:w-64 lg:min-h-screen bg-gray-900 p-4">
                <div className="flex items-center mb-8">
                    <h2 className="text-white font-bold text-lg">Sharpify</h2>
                </div>

                {/* Navigation principale */}
                <nav className="space-y-4 flex-1">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={`flex items-center gap-3 text-sm font-medium rounded p-2 ${
                                location.pathname === item.href
                                    ? "bg-gray-800 text-white"
                                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                            }`}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Section utilisateur et déconnexion */}
                <div className="border-t border-gray-700 pt-4 mt-auto">
                    {/* Informations utilisateur */}
                    {user && (
                        <div className="mb-4 p-2 rounded bg-gray-800">
                            <p className="text-white text-sm font-medium">
                                {user.email}
                            </p>
                            <p className="text-gray-400 text-xs capitalize">
                                {user.role}
                            </p>
                        </div>
                    )}

                    {/* Bouton de déconnexion */}
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 text-sm font-medium rounded p-2 w-full text-gray-400 hover:bg-gray-800 hover:text-white"
                    >
                        <ArrowRightOnRectangleIcon className="h-5 w-5" />
                        Déconnexion
                    </button>
                </div>
            </div>
        </>
    );
}

Sidebar.MobileBurger = function MobileBurger() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const { logout, user } = useAuth();

    const navigation = [
        { name: "Dashboard", href: "/", icon: HomeIcon },
        { name: "Conversion", href: "/convert", icon: PhotoIcon },
        { name: "Documents", href: "/documents", icon: DocumentDuplicateIcon },
        { name: "Reports", href: "/reports", icon: ChartPieIcon },
    ];

    return (
        <>
            <button
                onClick={() => setSidebarOpen(true)}
                className="text-gray-700"
                aria-label="Open sidebar"
            >
                <Bars3Icon className="h-6 w-6" />
            </button>

            <Dialog
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                className="relative z-50"
            >
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-y-0 right-0 w-64 bg-gray-900 p-4 flex flex-col">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-white font-semibold text-lg">
                            Sharpify
                        </h2>
                        <button onClick={() => setSidebarOpen(false)}>
                            <XMarkIcon className="h-6 w-6 text-gray-400 hover:text-white" />
                        </button>
                    </div>

                    {/* Navigation principale */}
                    <nav className="space-y-4 flex-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 text-sm font-medium rounded p-2 ${
                                    location.pathname === item.href
                                        ? "bg-gray-800 text-white"
                                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                }`}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Section utilisateur et déconnexion */}
                    <div className="border-t border-gray-700 pt-4 mt-auto">
                        {/* Informations utilisateur */}
                        {user && (
                            <div className="mb-4 p-2 rounded bg-gray-800">
                                <p className="text-white text-sm font-medium">
                                    {user.email}
                                </p>
                                <p className="text-gray-400 text-xs capitalize">
                                    {user.role}
                                </p>
                            </div>
                        )}

                        {/* Bouton de déconnexion */}
                        <button
                            onClick={() => {
                                logout();
                                setSidebarOpen(false);
                            }}
                            className="flex items-center gap-3 text-sm font-medium rounded p-2 w-full text-gray-400 hover:bg-gray-800 hover:text-white"
                        >
                            <ArrowRightOnRectangleIcon className="h-5 w-5" />
                            Déconnexion
                        </button>
                    </div>
                </div>
            </Dialog>
        </>
    );
};
