import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMedias, deleteMedia, deleteAllMedias } from "../services/media";
import { MediaEntityType } from "../../type";
import { ArrowDownTrayIcon, TrashIcon } from "@heroicons/react/24/outline";
import { formatDateToShortString } from "../utils/formatDateToString";
import { downloadSingle } from "../utils/download";
import { useState } from "react";
import DeleteModal from "../components/DeleteModal";

export default function DocumentsPage() {
    const queryClient = useQueryClient();
    const { data: files, isSuccess } = useQuery({
        queryKey: ["medias"],
        queryFn: () => getMedias(),
    });

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false);
    const [selectedMediaId, setSelectedMediaId] = useState<string | null>(null);

    // Mutation pour supprimer un média
    const deleteMediaMutation = useMutation({
        mutationFn: deleteMedia,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["medias"] });
        },
    });

    // Mutation pour supprimer tous les médias
    const deleteAllMediasMutation = useMutation({
        mutationFn: deleteAllMedias,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["medias"] });
        },
    });

    const handleDeleteMedia = (mediaId: string) => {
        setSelectedMediaId(mediaId);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteAllMedias = () => {
        setIsDeleteAllModalOpen(true);
    };

    const handleDownloadMedia = async (file: MediaEntityType) => {
        try {
            await downloadSingle(file);
        } catch (error) {
            console.error("Erreur lors du téléchargement:", error);
        }
    };

    const confirmDeleteMedia = () => {
        if (selectedMediaId) {
            deleteMediaMutation.mutate(selectedMediaId);
        }
    };

    const confirmDeleteAllMedias = () => {
        deleteAllMediasMutation.mutate();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-16 pb-8 px-2">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Mes documents
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Gérez et téléchargez vos images converties
                    </p>
                </div>

                {/* Bouton pour supprimer tous les médias */}
                {isSuccess && files.length > 0 && (
                    <div className="mb-8 flex justify-center">
                        <button
                            onClick={handleDeleteAllMedias}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 border border-red-500/20"
                        >
                            <TrashIcon className="h-5 w-5" />
                            Supprimer tous les médias ({files.length})
                        </button>
                    </div>
                )}

                {/* Modal de suppression d'un média */}
                <DeleteModal
                    open={isDeleteModalOpen}
                    setOpen={setIsDeleteModalOpen}
                    mediaId={selectedMediaId || undefined}
                    onConfirm={confirmDeleteMedia}
                    isDeleteAll={false}
                />

                {/* Modal de suppression de tous les médias */}
                <DeleteModal
                    open={isDeleteAllModalOpen}
                    setOpen={setIsDeleteAllModalOpen}
                    onConfirm={confirmDeleteAllMedias}
                    isDeleteAll={true}
                />

                {/* Grille des médias */}
                <div className="w-full max-w-6xl mx-auto">
                    <ul
                        role="list"
                        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
                    >
                        {isSuccess &&
                            files.map((file: MediaEntityType) => (
                                <li
                                    key={file.id}
                                    className="relative group rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-3 flex flex-col justify-between"
                                >
                                    <div className="overflow-hidden rounded-lg bg-gray-100">
                                        <img
                                            src={`${
                                                import.meta.env
                                                    .VITE_API_BASE_URL
                                            }${file.path}`}
                                            alt={
                                                file.originalName ||
                                                `Image convertie`
                                            }
                                            className="pointer-events-none aspect-10/7 object-cover group-hover:opacity-75"
                                        />
                                    </div>

                                    <div className="mt-3 text-sm text-white space-y-2">
                                        <p className="truncate font-semibold">
                                            {file.originalName}
                                        </p>
                                        <div className="flex justify-between text-gray-400 text-sm">
                                            <span>
                                                {(
                                                    file.size /
                                                    1024 /
                                                    1024
                                                ).toFixed(2)}{" "}
                                                MB
                                            </span>
                                            <span>
                                                {file.format.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-3">
                                        <p className="text-xs text-gray-200">
                                            {formatDateToShortString(
                                                file.createdAt
                                            )}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() =>
                                                    handleDownloadMedia(file)
                                                }
                                                className="flex items-center justify-center bg-white/10 hover:bg-green-700 text-white p-2 rounded-md transition-colors duration-200 hover:scale-105"
                                                title="Télécharger le fichier"
                                            >
                                                <ArrowDownTrayIcon className="h-5 w-5" />
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDeleteMedia(file.id)
                                                }
                                                className="flex items-center justify-center bg-white/10 hover:bg-red-500/70 text-white p-2 rounded-md transition-colors duration-200 hover:scale-105"
                                                title="Supprimer le fichier"
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                    </ul>

                    {/* Message si aucun fichier */}
                    {isSuccess && files.length === 0 && (
                        <div className="text-center py-12">
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
                                <p className="text-xl text-gray-400 mb-4">
                                    Aucun document trouvé
                                </p>
                                <p className="text-gray-500">
                                    Commencez par convertir quelques images pour
                                    les voir apparaître ici.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
