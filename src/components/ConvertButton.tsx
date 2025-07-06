import {
    ArrowRightIcon,
    CheckIcon,
    ExclamationTriangleIcon,
    SparklesIcon,
} from "@heroicons/react/24/outline";

interface ConvertButtonProps {
    onClick: () => void; // Handler pour lancer la conversion
    disabled?: boolean; // Désactive le bouton
    isUploading?: boolean; // Indique si une conversion est en cours
    fileCount?: number; // Nombre de fichiers à convertir
    className?: string; // Classes CSS additionnelles
}

// Bouton principal pour lancer la conversion
// Affiche différents états selon le contexte (prêt, en cours, désactivé)
export default function ConvertButton({
    onClick,
    disabled = false,
    isUploading = false,
    fileCount = 0,
    className = "",
}: ConvertButtonProps) {
    // Détermine le contenu du bouton selon l'état
    const getButtonContent = () => {
        if (isUploading) {
            return (
                <>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        </div>
                        <span>Conversion en cours...</span>
                    </div>
                </>
            );
        }

        if (fileCount > 0) {
            return (
                <>
                    <div className="flex items-center gap-3">
                        <SparklesIcon className="h-5 w-5" />
                        <span>
                            Convertir {fileCount} image
                            {fileCount > 1 ? "s" : ""}
                        </span>
                        <ArrowRightIcon className="h-4 w-4" />
                    </div>
                </>
            );
        }

        return (
            <>
                <div className="flex items-center gap-3">
                    <SparklesIcon className="h-5 w-5" />
                    <span>Sélectionnez des images</span>
                </div>
            </>
        );
    };

    // Détermine le style du bouton selon l'état
    const getButtonStyle = () => {
        if (disabled || fileCount === 0) {
            return "bg-gray-600 text-gray-400 cursor-not-allowed";
        }

        if (isUploading) {
            return "bg-indigo-600 text-white cursor-not-allowed animate-pulse";
        }

        return "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white hover:shadow-xl hover:shadow-indigo-500/25 transform hover:scale-105";
    };

    return (
        <div className={`w-full max-w-4xl mx-auto ${className}`}>
            <button
                onClick={onClick}
                disabled={disabled || fileCount === 0 || isUploading}
                className={`
          w-full py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300
          ${getButtonStyle()}
          ${fileCount > 0 && !isUploading ? "hover:scale-[1.02]" : ""}
        `}
            >
                {getButtonContent()}
            </button>

            {/* Indicateur de statut (nombre d'images prêtes à convertir) */}
            {fileCount > 0 && (
                <div className="mt-4 text-center">
                    <div className="inline-flex items-center gap-2 text-sm text-gray-400 bg-gray-800/50 px-4 py-2 rounded-full">
                        <CheckIcon className="h-4 w-4 text-green-400" />
                        <span>
                            {fileCount} image{fileCount > 1 ? "s" : ""} prête
                            {fileCount > 1 ? "s" : ""} à convertir
                        </span>
                    </div>
                </div>
            )}

            {/* Message d'aide si aucun fichier sélectionné */}
            {fileCount === 0 && (
                <div className="mt-4 text-center">
                    <div className="inline-flex items-center gap-2 text-sm text-gray-500 bg-gray-800/50 px-4 py-2 rounded-full">
                        <ExclamationTriangleIcon className="h-4 w-4" />
                        <span>
                            Ajoutez des images pour commencer la conversion
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
