import { MissionType, OutputType } from "../../type";
import {
    Cog6ToothIcon,
    PhotoIcon,
    SparklesIcon,
    InformationCircleIcon,
    ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

interface ConversionSettingsProps {
    mission: MissionType; // Paramètres de conversion (qualité, format...)
    setMission: (mission: MissionType) => void; // Setter pour les paramètres
    maxImageDimensions?: { width: number; height: number }; // Dimensions max des images sélectionnées
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

// Presets de taille maximale
const sizePresets = [
    {
        value: { width: 1920, height: 1080 },
        label: "Full HD",
        description: "1920×1080",
    },
    {
        value: { width: 1280, height: 720 },
        label: "HD",
        description: "1280×720",
    },
    {
        value: { width: 800, height: 600 },
        label: "Web",
        description: "800×600",
    },
    {
        value: { width: 400, height: 300 },
        label: "Miniature",
        description: "400×300",
    },
];

export default function ConversionSettings({
    mission,
    setMission,
    maxImageDimensions,
}: ConversionSettingsProps) {
    // Pour le toggle "Taille personnalisée"
    const [customSizeActive, setCustomSizeActive] = useState(
        !!mission.maxOutputSize &&
            !sizePresets.some(
                (preset) =>
                    preset.value.width === mission.maxOutputSize?.width &&
                    preset.value.height === mission.maxOutputSize?.height
            )
    );

    // Gestion du toggle
    const handleCustomSizeToggle = () => {
        if (!customSizeActive) {
            setMission({
                ...mission,
                maxOutputSize: { width: 1920, height: 1080 },
            });
        } else {
            setMission({ ...mission, maxOutputSize: undefined });
        }
        setCustomSizeActive((v) => !v);
    };

    // Uniformisation des classes boutons
    const buttonClass = (active: boolean) =>
        `w-full px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2 flex flex-col items-center justify-center h-16 ${
            active
                ? "bg-indigo-600 border-indigo-500 text-white shadow"
                : "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:border-gray-500"
        }`;
    const buttonClassAlt = (active: boolean) =>
        `w-full px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2 flex flex-col items-center justify-center h-16 ${
            active
                ? "bg-purple-600 border-purple-500 text-white shadow"
                : "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:border-gray-500"
        }`;

    return (
        <div className="w-full max-w-5xl mx-auto mb-8">
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
                    {/* Sélection du format de sortie */}
                    <div className="space-y-4 flex flex-col justify-between h-full flex-1">
                        <div className="flex flex-col h-full">
                            <div className="flex items-center gap-2 mb-2">
                                <PhotoIcon className="h-5 w-5 text-indigo-400" />
                                <h3 className="text-lg font-medium text-white">
                                    Format de sortie
                                </h3>
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                                <div className="grid grid-cols-2 gap-3 h-full flex-1">
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
                                            className={buttonClass(
                                                mission.outputType ===
                                                    format.value
                                            )}
                                            style={{ height: "100%" }}
                                        >
                                            <div className="text-center space-y-2 flex flex-col justify-center h-full">
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
                                        </button>
                                    ))}
                                </div>
                                <div className="flex-1 flex items-end mt-4">
                                    <div className="invisible">
                                        Conseil Sharp
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sélection de la qualité (presets + slider) */}
                    <div className="space-y-4 flex flex-col justify-between h-full">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <SparklesIcon className="h-5 w-5 text-green-400" />
                                <h3 className="text-lg font-medium text-white">
                                    Qualité d'optimisation
                                </h3>
                            </div>
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                {qualityPresets.map((preset) => (
                                    <button
                                        key={preset.value}
                                        onClick={() =>
                                            setMission({
                                                ...mission,
                                                quality: preset.value,
                                            })
                                        }
                                        className={buttonClass(
                                            mission.quality === preset.value
                                        )}
                                    >
                                        <span className="font-medium">
                                            {preset.label}
                                        </span>
                                        <span className="text-xs text-gray-400 mt-1">
                                            {preset.value}%
                                        </span>
                                    </button>
                                ))}
                            </div>
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
                        </div>
                        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3 mt-4">
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

                    {/* Configuration de la taille maximale */}
                    <div className="space-y-4 flex flex-col justify-between h-full">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <ArrowsPointingOutIcon className="h-5 w-5 text-purple-400" />
                                <h3 className="text-lg font-medium text-white">
                                    Taille maximale
                                </h3>
                            </div>
                            {/* Indication de la plus grande image */}
                            {maxImageDimensions && (
                                <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-3 mb-4">
                                    <div className="flex items-start gap-2">
                                        <InformationCircleIcon className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                                        <div className="text-xs text-amber-300">
                                            <p className="font-medium mb-1">
                                                Plus grande image détectée :
                                            </p>
                                            <p>
                                                {maxImageDimensions.width} ×{" "}
                                                {maxImageDimensions.height} px
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                {sizePresets.map((preset) => (
                                    <button
                                        key={preset.label}
                                        onClick={() => {
                                            setMission({
                                                ...mission,
                                                maxOutputSize: preset.value,
                                            });
                                            setCustomSizeActive(false);
                                        }}
                                        className={buttonClassAlt(
                                            !customSizeActive &&
                                                mission.maxOutputSize?.width ===
                                                    preset.value.width &&
                                                mission.maxOutputSize
                                                    ?.height ===
                                                    preset.value.height
                                        )}
                                        disabled={customSizeActive}
                                    >
                                        <div className="text-center">
                                            <div className="font-medium">
                                                {preset.label}
                                            </div>
                                            <div className="text-xs opacity-75">
                                                {preset.description}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                                <button
                                    type="button"
                                    onClick={handleCustomSizeToggle}
                                    className={buttonClassAlt(customSizeActive)}
                                >
                                    Taille personnalisée
                                </button>
                            </div>
                            {customSizeActive && (
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1">
                                            Largeur max
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="10000"
                                            placeholder="1920"
                                            value={
                                                mission.maxOutputSize?.width ||
                                                ""
                                            }
                                            onChange={(e) =>
                                                setMission({
                                                    ...mission,
                                                    maxOutputSize: {
                                                        width:
                                                            parseInt(
                                                                e.target.value
                                                            ) || 0,
                                                        height:
                                                            mission
                                                                .maxOutputSize
                                                                ?.height ||
                                                            1080,
                                                    },
                                                })
                                            }
                                            className="w-full px-3 py-2 rounded-lg text-sm bg-gray-700 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1">
                                            Hauteur max
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="10000"
                                            placeholder="1080"
                                            value={
                                                mission.maxOutputSize?.height ||
                                                ""
                                            }
                                            onChange={(e) =>
                                                setMission({
                                                    ...mission,
                                                    maxOutputSize: {
                                                        width:
                                                            mission
                                                                .maxOutputSize
                                                                ?.width || 1920,
                                                        height:
                                                            parseInt(
                                                                e.target.value
                                                            ) || 0,
                                                    },
                                                })
                                            }
                                            className="w-full px-3 py-2 rounded-lg text-sm bg-gray-700 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-3 mt-4">
                            <div className="flex items-start gap-2">
                                <InformationCircleIcon className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                                <div className="text-xs text-purple-300">
                                    <p className="font-medium mb-1">
                                        Redimensionnement intelligent :
                                    </p>
                                    <p>
                                        L'aspect ratio est préservé. Les images
                                        plus petites que la taille max ne sont
                                        pas agrandies.
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
