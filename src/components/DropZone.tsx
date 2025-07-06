import {
    CloudArrowUpIcon,
    DocumentIcon,
    PhotoIcon,
} from "@heroicons/react/24/outline";
import { ChangeEvent, DragEvent, useState } from "react";

interface DropZoneProps {
    onFilesSelected: (files: FileList | null) => void; // Callback pour ajouter des fichiers
    isUploading?: boolean; // Indique si un upload est en cours (désactive la zone)
}

// Zone de drop/upload pour sélectionner ou glisser-déposer des images
export default function DropZone({
    onFilesSelected,
    isUploading = false,
}: DropZoneProps) {
    // État pour gérer le survol drag&drop
    const [isDragOver, setIsDragOver] = useState(false);
    // Compteur pour gérer les entrées/sorties de drag (évite les bugs de dragleave)
    const [dragCounter, setDragCounter] = useState(0);

    // Gestion de l'entrée d'un fichier dans la zone
    const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragCounter((prev) => prev + 1);
        setIsDragOver(true);
    };

    // Gestion de la sortie d'un fichier de la zone
    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragCounter((prev) => prev - 1);
        if (dragCounter <= 1) {
            setIsDragOver(false);
        }
    };

    // Empêche le comportement par défaut lors du dragover
    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    // Gestion du drop effectif : ajoute les fichiers
    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
        setDragCounter(0);
        onFilesSelected(e.dataTransfer.files);
    };

    // Gestion de la sélection via l'input file
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        onFilesSelected(e.target.files);
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div
                className={`relative group transition-all duration-300 ${
                    isDragOver ? "scale-105" : "hover:scale-[1.02]"
                }`}
            >
                {/* Zone de drop principale (drag&drop ou clic) */}
                <div
                    className={`
            relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300
            ${
                isDragOver
                    ? "border-indigo-400 bg-indigo-500/10 shadow-2xl shadow-indigo-500/25"
                    : "border-gray-600 bg-gray-800/30 hover:border-gray-500 hover:bg-gray-800/50"
            }
            ${isUploading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    {/* Effet de brillance au hover (visuel) */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                    {/* Contenu principal : icône, texte, bouton, input file */}
                    <div className="relative p-12 text-center">
                        {/* Icône principale selon l'état drag */}
                        <div
                            className={`
              inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 transition-all duration-300
              ${
                  isDragOver
                      ? "bg-indigo-500 text-white scale-110"
                      : "bg-gray-700 text-gray-400 group-hover:bg-gray-600 group-hover:text-white"
              }
            `}
                        >
                            {isDragOver ? (
                                <CloudArrowUpIcon className="h-10 w-10 animate-bounce" />
                            ) : (
                                <PhotoIcon className="h-10 w-10" />
                            )}
                        </div>

                        {/* Texte principal selon l'état drag */}
                        <h3
                            className={`
              text-xl font-semibold mb-2 transition-colors duration-300
              ${isDragOver ? "text-indigo-400" : "text-white"}
            `}
                        >
                            {isDragOver
                                ? "Déposez vos images ici"
                                : "Glissez vos images ici"}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-400 mb-6 max-w-md mx-auto">
                            {isDragOver
                                ? "Relâchez pour commencer la conversion"
                                : "ou cliquez pour sélectionner des fichiers"}
                        </p>

                        {/* Formats supportés et bouton de sélection */}
                        <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                                <DocumentIcon className="h-4 w-4" />
                                <span>JPG, PNG, GIF</span>
                            </div>
                            <div className="w-1 h-1 bg-gray-500 rounded-full" />
                            <div className="flex items-center gap-1">
                                <span>Max 10MB par fichier</span>
                            </div>
                        </div>

                        {/* Bouton de sélection (input file caché) */}
                        {!isDragOver && (
                            <button
                                className={`
                  mt-6 px-6 py-3 rounded-lg font-medium transition-all duration-200
                  ${
                      isUploading
                          ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                          : "bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-lg hover:shadow-indigo-500/25"
                  }
                `}
                                disabled={isUploading}
                            >
                                Sélectionner des fichiers
                            </button>
                        )}
                    </div>

                    {/* Input file caché (recouvre toute la zone) */}
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={isUploading}
                    />
                </div>

                {/* Indicateur visuel de drag&drop */}
                {isDragOver && (
                    <div className="absolute inset-0 bg-indigo-500/20 rounded-2xl border-2 border-indigo-400 pointer-events-none animate-pulse" />
                )}

                {/* Badge de statut si upload en cours */}
                {isUploading && (
                    <div className="absolute -top-3 -right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                        Conversion en cours...
                    </div>
                )}
            </div>

            {/* Conseils d'utilisation (texte sous la zone) */}
            <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-2 text-sm text-gray-500 bg-gray-800/50 px-4 py-2 rounded-full">
                    <span>💡</span>
                    <span>
                        Conseil : Utilisez des images de haute qualité pour de
                        meilleurs résultats
                    </span>
                </div>
            </div>
        </div>
    );
}
