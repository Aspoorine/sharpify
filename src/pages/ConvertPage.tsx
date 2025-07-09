import {
    ArrowDownTrayIcon,
    DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import ConversionLogic from "../components/ConversionLogic";
import ConversionSettings from "../components/ConversionSettings";
import ConvertButton from "../components/ConvertButton";
import DropZone from "../components/DropZone";
import MediaTable from "../components/MediaTable";
import { checkSize, downloadAll } from "../utils/download";

// Page principale de conversion d'images
// Orchestration du workflow de conversion : sélection, configuration, upload, feedback utilisateur
export default function ConvertPage() {
    return (
        // Fournit toute la logique métier via un render prop
        <ConversionLogic>
            {({
                mediaList, // Liste des fichiers à convertir (avec leur statut)
                uploadedFiles, // Liste des fichiers convertis avec succès
                errorFiles, // Liste des fichiers en erreur
                mission, // Paramètres de conversion (qualité, format...)
                setMission, // Setter pour les paramètres
                handleFiles, // Handler pour ajout de fichiers
                handleSubmit, // Handler pour lancer la conversion
                isUploading, // Booléen : upload en cours ?
                maxImageDimensions, // Dimensions maximales des images sélectionnées
            }) => {
                // Nombre de fichiers en attente de conversion
                const pendingCount = mediaList.filter(
                    (item) => item.status === "Pending"
                ).length;
                // Peut-on activer le bouton de téléchargement ?
                const canDownload = checkSize(
                    mediaList.length,
                    uploadedFiles.length,
                    errorFiles.length
                );

                return (
                    // Layout principal avec background et padding
                    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-16 pb-8 px-2">
                        <div className="container mx-auto max-w-6xl">
                            {/* Header */}
                            <div className="text-center mb-12">
                                <h1 className="text-4xl font-bold text-white mb-4">
                                    Conversion d'images
                                </h1>
                                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                                    Optimisez et convertissez vos images avec la
                                    puissance de Sharp
                                </p>
                            </div>

                            {/* 1. Paramètres de conversion (format, qualité) */}
                            <ConversionSettings
                                mission={mission}
                                setMission={setMission}
                                maxImageDimensions={maxImageDimensions}
                            />

                            {/* 2. Zone de drop/upload d'images */}
                            <div className="mb-8">
                                <DropZone
                                    onFilesSelected={handleFiles}
                                    isUploading={isUploading}
                                />
                            </div>

                            {/* 3. Bouton pour lancer la conversion */}
                            <div className="mb-8">
                                <ConvertButton
                                    onClick={handleSubmit}
                                    disabled={isUploading}
                                    isUploading={isUploading}
                                    fileCount={pendingCount}
                                />
                            </div>

                            {/* 4. Bouton de téléchargement du zip si conversion terminée */}
                            {canDownload && (
                                <div className="mb-8">
                                    <div className="w-full max-w-5xl mx-auto">
                                        <button
                                            onClick={() =>
                                                downloadAll(uploadedFiles)
                                            }
                                            className="w-full py-6 px-8 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-green-500/25 transform hover:scale-105"
                                        >
                                            <div className="flex items-center justify-center gap-3">
                                                <ArrowDownTrayIcon className="h-6 w-6" />
                                                <span className="text-lg">
                                                    Télécharger toutes les
                                                    images (
                                                    {uploadedFiles.length})
                                                </span>
                                            </div>
                                        </button>

                                        <div className="mt-4 text-center">
                                            <div className="inline-flex items-center gap-2 text-sm text-gray-400 bg-gray-800/50 px-4 py-2 rounded-full">
                                                <DocumentDuplicateIcon className="h-4 w-4" />
                                                <span>
                                                    Fichiers convertis prêts au
                                                    téléchargement
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 5. Tableau de suivi des fichiers (statut, nom, etc.) */}
                            {mediaList.length > 0 && (
                                <div className="w-full max-w-5xl mx-auto">
                                    <MediaTable mediaList={mediaList} />
                                </div>
                            )}

                            {/* 6. Statistiques rapides sur le batch en cours */}
                            {mediaList.length > 0 && (
                                <div className="mt-12">
                                    <div className="w-full max-w-5xl mx-auto">
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                                                <div className="text-2xl font-bold text-white mb-1">
                                                    {mediaList.length}
                                                </div>
                                                <div className="text-sm text-gray-400">
                                                    Total
                                                </div>
                                            </div>
                                            <div className="bg-blue-900/20 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30">
                                                <div className="text-2xl font-bold text-blue-400 mb-1">
                                                    {
                                                        mediaList.filter(
                                                            (item) =>
                                                                item.status ===
                                                                "Loading"
                                                        ).length
                                                    }
                                                </div>
                                                <div className="text-sm text-gray-400">
                                                    En cours
                                                </div>
                                            </div>
                                            <div className="bg-green-900/20 backdrop-blur-sm rounded-xl p-4 border border-green-500/30">
                                                <div className="text-2xl font-bold text-green-400 mb-1">
                                                    {
                                                        mediaList.filter(
                                                            (item) =>
                                                                item.status ===
                                                                "Uploaded"
                                                        ).length
                                                    }
                                                </div>
                                                <div className="text-sm text-gray-400">
                                                    Succès
                                                </div>
                                            </div>
                                            <div className="bg-red-900/20 backdrop-blur-sm rounded-xl p-4 border border-red-500/30">
                                                <div className="text-2xl font-bold text-red-400 mb-1">
                                                    {
                                                        mediaList.filter(
                                                            (item) =>
                                                                item.status ===
                                                                "Error"
                                                        ).length
                                                    }
                                                </div>
                                                <div className="text-sm text-gray-400">
                                                    Erreurs
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );
            }}
        </ConversionLogic>
    );
}
