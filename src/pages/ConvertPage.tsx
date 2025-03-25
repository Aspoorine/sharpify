import { useMutation } from "@tanstack/react-query";
import React, { useState, ChangeEvent } from "react";
import { toast } from "react-toastify";
import { postMedia } from "../services/media";
import MediaTable from "../components/MediaTable";
import { v4 as uuidv4 } from "uuid";

type MediaItem = {
    id: string;
    name: string;
    size: string;
    type: string;
    file: File;
    status: "En attente" | "Envoyé" | "Erreur";
};

const statusStyles = {
    "En attente": "text-yellow-400 bg-yellow-400/10",
    Envoyé: "text-green-400 bg-green-400/10",
    Erreur: "text-rose-400 bg-rose-400/10",
};

export default function ConvertPage() {
    const [mediaList, setMediaList] = useState<MediaItem[]>([]);

    const { mutate: uploadMedia } = useMutation({
        mutationFn: postMedia,
        onSuccess: () => {
            notify();
            setMediaList([]);
        },
        onError: () => {
            toast.error("Erreur lors de l'envoi de l'image.");
        },
    });

    const handleFiles = (files: FileList | null) => {
        if (!files) return;
        const newItems: MediaItem[] = Array.from(files).map((file) => ({
            id: uuidv4(),
            name: file.name,
            size: (file.size / 1024).toFixed(2) + " KB",
            type: file.type,
            file,
            status: "En attente",
        }));
        setMediaList((prev) => [...prev, ...newItems]);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleFiles(e.target.files);
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };

    const notify = () => toast("Image envoyée avec succès !");

    const handleSubmit = () => {
        mediaList.forEach((item) => {
            if (item.status === "En attente") {
                uploadMedia(item);
            }
        });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-md rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                    Dépose ton image
                </h2>
                <label
                    htmlFor="file-upload"
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-xl p-8 cursor-pointer hover:border-indigo-500 transition"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-gray-400 mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16V4m0 0l-4 4m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"
                        />
                    </svg>
                    <p className="text-gray-400">
                        Clique ou glisse une image ici
                    </p>
                    <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        multiple
                    />
                </label>

                {/* {imageInfo && (
                    <div className="mt-4 bg-[#334155] rounded-xl p-4 text-sm text-gray-300 space-y-1">
                        <p>
                            <span className="font-semibold text-white">
                                Nom :
                            </span>{" "}
                            {imageInfo.name}
                        </p>
                        <p>
                            <span className="font-semibold text-white">
                                Taille :
                            </span>{" "}
                            {imageInfo.size}
                        </p>
                        <p>
                            <span className="font-semibold text-white">
                                Type :
                            </span>{" "}
                            {imageInfo.type}
                        </p>

                        <button
                            onClick={handleSubmit}
                            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition"
                        >
                            Envoyer l'image
                        </button>
                    </div>
                )} */}
            </div>
            <MediaTable />
        </div>
    );
}
