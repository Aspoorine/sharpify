import {
    CheckCircleIcon,
    ClockIcon,
    DocumentIcon,
    ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { MediaItem } from "../../type";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

type MediaTableProps = {
    mediaList: MediaItem[];
};

const statusConfig = {
    Pending: {
        icon: ClockIcon,
        text: "En attente",
        className: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    },
    Uploaded: {
        icon: CheckCircleIcon,
        text: "Succès",
        className: "text-green-400 bg-green-400/10 border-green-400/20",
    },
    Error: {
        icon: ExclamationTriangleIcon,
        text: "Erreur",
        className: "text-red-400 bg-red-400/10 border-red-400/20",
    },
    Loading: {
        icon: ClockIcon,
        text: "En cours",
        className: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    },
};

type DimensionsMap = { [id: string]: { width: number; height: number } };

// Fonction utilitaire pour obtenir les dimensions d'une image File
function getImageDimensions(
    file: File
): Promise<{ width: number; height: number }> {
    return new Promise((resolve) => {
        const img = new window.Image();
        img.onload = () => {
            resolve({ width: img.width, height: img.height });
        };
        img.onerror = () => {
            resolve({ width: 0, height: 0 });
        };
        img.src = URL.createObjectURL(file);
    });
}

export default function MediaTable({ mediaList }: MediaTableProps) {
    const [dimensions, setDimensions] = useState<DimensionsMap>({});

    useEffect(() => {
        let isMounted = true;
        async function fetchDimensions() {
            const newDims: DimensionsMap = {};
            await Promise.all(
                mediaList.map(async (item) => {
                    if (item.file && !dimensions[item.id]) {
                        const dim = await getImageDimensions(item.file);
                        newDims[item.id] = dim;
                    }
                })
            );
            if (isMounted && Object.keys(newDims).length > 0) {
                setDimensions((prev) => ({ ...prev, ...newDims }));
            }
        }
        fetchDimensions();
        return () => {
            isMounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mediaList]);

    if (mediaList.length === 0) return null;

    return (
        <div className="w-full max-w-5xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
                {/* Header du tableau */}
                <div className="px-6 py-4 border-b border-gray-700/50">
                    <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                        <DocumentIcon className="h-5 w-5 text-gray-400" />
                        Fichiers sélectionnés
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">
                        {mediaList.length} fichier
                        {mediaList.length > 1 ? "s" : ""} à traiter
                    </p>
                </div>

                {/* Tableau */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-900/30 border-b border-gray-700/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Fichier
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Taille
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Type
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Dimensions
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Statut
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700/50">
                            {mediaList.map((item) => {
                                const status = statusConfig[item.status];
                                const StatusIcon = status.icon;
                                const dim = dimensions[item.id];
                                return (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-gray-700/30 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0">
                                                    <DocumentIcon className="h-8 w-8 text-gray-400" />
                                                </div>
                                                <div className="ml-3">
                                                    <div className="text-sm font-medium text-white truncate max-w-xs">
                                                        {item.name}
                                                    </div>
                                                    <div className="text-xs text-gray-400">
                                                        ID:{" "}
                                                        {item.id.slice(0, 8)}...
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-300">
                                                {item.size}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-300">
                                                {item.type || "Image"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-300">
                                                {dim ? (
                                                    `${dim.width} × ${dim.height}`
                                                ) : (
                                                    <span className="text-gray-500 italic">
                                                        Calcul...
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end">
                                                <span
                                                    className={classNames(
                                                        status.className,
                                                        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border"
                                                    )}
                                                >
                                                    <StatusIcon className="h-3 w-3" />
                                                    {status.text}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Footer avec statistiques */}
                <div className="px-6 py-4 bg-gray-900/20 border-t border-gray-700/50">
                    <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center gap-4">
                            <span>
                                Total:{" "}
                                <span className="text-white font-medium">
                                    {mediaList.length}
                                </span>
                            </span>
                            <span>
                                En cours:{" "}
                                <span className="text-blue-400 font-medium">
                                    {
                                        mediaList.filter(
                                            (item) => item.status === "Loading"
                                        ).length
                                    }
                                </span>
                            </span>
                            <span>
                                Succès:{" "}
                                <span className="text-green-400 font-medium">
                                    {
                                        mediaList.filter(
                                            (item) => item.status === "Uploaded"
                                        ).length
                                    }
                                </span>
                            </span>
                            <span>
                                Erreurs:{" "}
                                <span className="text-red-400 font-medium">
                                    {
                                        mediaList.filter(
                                            (item) => item.status === "Error"
                                        ).length
                                    }
                                </span>
                            </span>
                        </div>
                        <div className="text-xs text-gray-500">
                            Sharp - Optimisation d'images
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
