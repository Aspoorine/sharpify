import { MissionType, OutputType } from "../../type";
import {
    Cog6ToothIcon,
    PhotoIcon,
    SparklesIcon,
    InformationCircleIcon,
} from "@heroicons/react/24/outline";

interface ConversionSettingsProps {
    mission: MissionType; // Paramètres de conversion (qualité, format...)
    setMission: (mission: MissionType) => void; // Setter pour les paramètres
}

// Options de format de sortie proposées à l'utilisateur
const formatOptions = [
    {
        value: "webp",
        label: "WebP",
        description: "Format moderne, excellente compression",
        icon: "🟢",
    },
    {
        value: "avif",
        label: "AVIF",
        description: "Compression ultra-optimisée",
        icon: "🟣",
    },
    {
        value: "jpeg",
        label: "JPEG",
        description: "Format universel, bonne compatibilité",
        icon: "🟡",
    },
    {
        value: "png",
        label: "PNG",
        description: "Sans perte, transparence supportée",
        icon: "🔵",
    },
];

// Presets de qualité proposés à l'utilisateur
const qualityPresets = [
    {
        value: 60,
        label: "Optimisé",
        description: "Taille réduite, qualité acceptable",
    },
    {
        value: 80,
        label: "Équilibré",
        description: "Bon compromis taille/qualité",
    },
    {
        value: 90,
        label: "Haute qualité",
        description: "Qualité élevée, taille modérée",
    },
    {
        value: 100,
        label: "Maximum",
        description: "Qualité maximale, taille importante",
    },
];

// Composant UI pour configurer les paramètres de conversion (format, qualité)
export default function ConversionSettings({
    mission,
    setMission,
}: ConversionSettingsProps) {
    return (
        <div className="w-full max-w-4xl mx-auto mb-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-lg">
                        <Cog6ToothIcon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-white">
                            Paramètres de conversion
                        </h2>
                        <p className="text-gray-400 text-sm">
                            Optimisez vos images avec Sharp
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Sélection du format de sortie */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <PhotoIcon className="h-5 w-5 text-indigo-400" />
                            <h3 className="text-lg font-medium text-white">
                                Format de sortie
                            </h3>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {formatOptions.map((format) => (
                                <button
                                    key={format.value}
                                    onClick={() =>
                                        setMission({
                                            ...mission,
                                            outputType:
                                                format.value as OutputType,
                                        })
                                    }
                                    className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                                        mission.outputType === format.value
                                            ? "border-indigo-500 bg-indigo-500/10"
                                            : "border-gray-600 bg-gray-700/30 hover:border-gray-500 hover:bg-gray-700/50"
                                    }`}
                                >
                                    <div className="text-center space-y-2">
                                        <div className="text-2xl">
                                            {format.icon}
                                        </div>
                                        <div className="font-medium text-white">
                                            {format.label}
                                        </div>
                                        <div className="text-xs text-gray-400 leading-tight">
                                            {format.description}
                                        </div>
                                    </div>
                                    {mission.outputType === format.value && (
                                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                                            <SparklesIcon className="h-3 w-3 text-white" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Sélection de la qualité (presets + slider) */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <SparklesIcon className="h-5 w-5 text-green-400" />
                            <h3 className="text-lg font-medium text-white">
                                Qualité d'optimisation
                            </h3>
                        </div>

                        {/* Presets rapides */}
                        <div className="grid grid-cols-2 gap-2 mb-4">
                            {qualityPresets.map((preset) => (
                                <button
                                    key={preset.value}
                                    onClick={() =>
                                        setMission({
                                            ...mission,
                                            quality: preset.value,
                                        })
                                    }
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                        mission.quality === preset.value
                                            ? "bg-green-600 text-white"
                                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                    }`}
                                >
                                    {preset.label}
                                </button>
                            ))}
                        </div>

                        {/* Slider personnalisé pour la qualité */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-400">
                                    Qualité personnalisée
                                </span>
                                <span className="text-sm font-medium text-white">
                                    {mission.quality}%
                                </span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="100"
                                value={mission.quality}
                                onChange={(e) =>
                                    setMission({
                                        ...mission,
                                        quality: parseInt(e.target.value),
                                    })
                                }
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                                style={{
                                    background: `linear-gradient(to right, #10b981 0%, #10b981 ${mission.quality}%, #374151 ${mission.quality}%, #374151 100%)`,
                                }}
                            />
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>Minimal</span>
                                <span>Maximal</span>
                            </div>
                        </div>

                        {/* Info/conseil sur la qualité choisie */}
                        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                            <div className="flex items-start gap-2">
                                <InformationCircleIcon className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                                <div className="text-xs text-blue-300">
                                    <p className="font-medium mb-1">
                                        Conseil Sharp :
                                    </p>
                                    <p>
                                        {(mission.quality ?? 80) <= 60 &&
                                            "Qualité optimisée pour le web - fichiers très légers"}
                                        {(mission.quality ?? 80) > 60 &&
                                            (mission.quality ?? 80) <= 80 &&
                                            "Qualité équilibrée - parfaite pour la plupart des usages"}
                                        {(mission.quality ?? 80) > 80 &&
                                            (mission.quality ?? 80) <= 90 &&
                                            "Haute qualité - idéal pour l'impression ou l'archivage"}
                                        {(mission.quality ?? 80) > 90 &&
                                            "Qualité maximale - préservation parfaite des détails"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Informations techniques sur Sharp */}
                <div className="mt-6 pt-6 border-t border-gray-700/50">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <SparklesIcon className="h-4 w-4" />
                        <span>
                            Propulsé par Sharp - Moteur d'optimisation d'images
                            haute performance
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
