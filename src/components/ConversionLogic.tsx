import { useMutation } from "@tanstack/react-query";
import { useState, useRef, useMemo } from "react";
import { toast } from "react-toastify";
import { postMedia } from "../services/media";
import { v4 as uuidv4 } from "uuid";
import { ErrorFile, MediaEntityType, MediaItem, MissionType } from "../../type";

export interface ConversionLogicProps {
    children: (props: {
        mediaList: MediaItem[];
        uploadedFiles: MediaEntityType[];
        errorFiles: ErrorFile[];
        mission: MissionType;
        setMission: (mission: MissionType) => void;
        handleFiles: (files: FileList | null) => void;
        handleSubmit: () => void;
        isUploading: boolean;
        uploadProgress: { [key: string]: number };
        maxImageDimensions?: { width: number; height: number };
    }) => React.ReactNode;
}

// Composant logique principal pour la conversion d'images
// Gère tous les états, la mutation, le suivi des statuts et la communication avec le backend
export default function ConversionLogic({ children }: ConversionLogicProps) {
    // Liste des fichiers à convertir (avec leur statut)
    const [mediaList, setMediaList] = useState<MediaItem[]>([]);
    // Liste des fichiers convertis avec succès
    const [uploadedFiles, setUploadedFiles] = useState<MediaEntityType[]>([]);
    // Liste des fichiers en erreur
    const [errorFiles, setErrorFiles] = useState<ErrorFile[]>([]);
    // Suivi de la progression d'upload (clé = id du fichier)
    const [uploadProgress, setUploadProgress] = useState<{
        [key: string]: number;
    }>({});
    // Flag pour éviter les toasts multiples
    const toastShownRef = useRef(false);
    // Paramètres de conversion (qualité, format...)
    const [mission, setMission] = useState<MissionType>({
        quality: 80,
        outputType: "webp",
    });

    // Calcul des dimensions maximales des images sélectionnées
    const maxImageDimensions = useMemo(() => {
        if (mediaList.length === 0) return undefined;

        let maxWidth = 0;
        let maxHeight = 0;

        // Fonction pour obtenir les dimensions d'une image
        const getImageDimensions = (
            file: File
        ): Promise<{ width: number; height: number }> => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => {
                    resolve({ width: img.width, height: img.height });
                };
                img.onerror = () => {
                    resolve({ width: 0, height: 0 });
                };
                img.src = URL.createObjectURL(file);
            });
        };

        // Pour l'instant, on retourne undefined car on ne peut pas calculer les dimensions
        // de manière synchrone. On pourrait implémenter un système de cache ou
        // calculer les dimensions lors de l'ajout des fichiers.
        return undefined;
    }, [mediaList]);

    // Vérifie si tous les fichiers ont été traités (succès ou erreur) et affiche un toast global
    const checkAllUploadsComplete = (currentMediaList: MediaItem[]) => {
        const allProcessed = currentMediaList.every(
            (item) => item.status === "Uploaded" || item.status === "Error"
        );

        if (
            allProcessed &&
            currentMediaList.length > 0 &&
            !toastShownRef.current
        ) {
            const successCount = currentMediaList.filter(
                (item) => item.status === "Uploaded"
            ).length;
            const errorCount = currentMediaList.filter(
                (item) => item.status === "Error"
            ).length;

            // Affiche un toast global selon le résultat du batch
            if (errorCount === 0) {
                toast.success(
                    `Tous les fichiers (${successCount}) ont été convertis avec succès !`
                );
            } else {
                toast.success(
                    `${successCount} fichiers convertis avec succès, ${errorCount} erreurs. Vérifiez les détails.`
                );
            }
            toastShownRef.current = true;
        }
    };

    // Mutation React Query pour envoyer un fichier au backend
    const { mutate: uploadMedia, isPending: isUploading } = useMutation({
        mutationFn: postMedia,
        onSuccess: (data, variables) => {
            // Ajoute le fichier converti à la liste des succès
            setUploadedFiles((prev) => [
                ...prev,
                {
                    id: data.file.id,
                    originalName: data.file.originalName,
                    filename: data.file.filename,
                    path: data.file.path,
                    format: data.file.format,
                    size: data.file.size,
                    width: data.file.width,
                    height: data.file.height,
                    createdAt: data.file.createdAt,
                },
            ]);

            // Met à jour le statut du fichier dans la liste
            setMediaList((prev) => {
                const updatedList = prev.map((item) =>
                    item.id === variables.file.id
                        ? { ...item, status: "Uploaded" as const }
                        : item
                );
                setTimeout(() => {
                    checkAllUploadsComplete(updatedList);
                }, 0);
                return updatedList;
            });

            // Nettoie la progression pour ce fichier
            setUploadProgress((prev) => {
                const newProgress = { ...prev };
                delete newProgress[variables.file.id];
                return newProgress;
            });
        },
        onError: (_data, variables) => {
            // Ajoute le fichier à la liste des erreurs
            setErrorFiles((prev) => [
                ...prev,
                { id: variables.file.id, name: variables.file.name },
            ]);

            // Met à jour le statut du fichier dans la liste
            setMediaList((prev) => {
                const updatedList = prev.map((item) =>
                    item.id === variables.file.id
                        ? { ...item, status: "Error" as const }
                        : item
                );
                setTimeout(() => {
                    checkAllUploadsComplete(updatedList);
                }, 0);
                return updatedList;
            });

            // Nettoie la progression pour ce fichier
            setUploadProgress((prev) => {
                const newProgress = { ...prev };
                delete newProgress[variables.file.id];
                return newProgress;
            });
        },
    });

    // Met à jour le statut d'un fichier dans la liste
    const updateStatus = (id: string, status: MediaItem["status"]) => {
        setMediaList((prev) =>
            prev.map((item) => (item.id === id ? { ...item, status } : item))
        );
    };

    // Ajoute des fichiers à la liste à partir d'un FileList (input ou drag&drop)
    const handleFiles = (files: FileList | null) => {
        if (!files) return;
        const newItems: MediaItem[] = Array.from(files).map((file) => ({
            id: uuidv4(),
            name: file.name,
            size: (file.size / 1024).toFixed(2) + " KB",
            type: file.type,
            file,
            status: "Pending",
        }));
        setMediaList((prev) => [...newItems, ...prev]);
    };

    // Lance la conversion de tous les fichiers en attente
    const handleSubmit = () => {
        const pendingItems = mediaList.filter(
            (item) => item.status === "Pending"
        );

        toastShownRef.current = false;

        pendingItems.forEach((item) => {
            updateStatus(item.id, "Loading");
            // Simule la progression (peut être amélioré pour du vrai progress)
            setUploadProgress((prev) => ({ ...prev, [item.id]: 0 }));
            uploadMedia({ file: item, mission });
        });
    };

    // Passe tous les états et handlers aux enfants (UI)
    return (
        <>
            {children({
                mediaList,
                uploadedFiles,
                errorFiles,
                mission,
                setMission,
                handleFiles,
                handleSubmit,
                isUploading,
                uploadProgress,
                maxImageDimensions,
            })}
        </>
    );
}
