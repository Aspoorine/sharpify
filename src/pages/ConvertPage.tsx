import { useMutation } from "@tanstack/react-query";
import React, { useState, ChangeEvent } from "react";
import { toast } from "react-toastify";
import { postMedia } from "../services/media";
import MediaTable from "../components/MediaTable";
import { v4 as uuidv4 } from "uuid";
import { ErrorFile, MediaEntityType, MediaItem, MissionType } from "../../type";
import { checkSize, downloadAll } from "../utils/download";
import MissionInputs from "../components/MissionInputs";

export default function ConvertPage() {
    const [mediaList, setMediaList] = useState<MediaItem[]>([]);
    const [uploadedFiles, setUploadedFiles] = useState<MediaEntityType[]>([]);
    console.log("data", uploadedFiles);

    const [errorFiles, setErrorFiles] = useState<ErrorFile[]>([]);
    const [mission, setMission] = useState<MissionType>({
        quality: 80,
        outputType: undefined,
    });
    const { mutate: uploadMedia } = useMutation({
        mutationFn: postMedia,
        onSuccess: (data, variables) => {
            updateStatus(variables.file.id, "Uploaded");
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
            toast.success(`${variables.file.name} envoyée avec succès !`);
        },
        onError: (_data, variables) => {
            updateStatus(variables.file.id, "Error");
            setErrorFiles((prev) => [
                ...prev,
                { id: variables.file.id, name: variables.file.name },
            ]);
            toast.error(`Erreur lors de l'envoi de ${variables.file.name}`);
        },
    });

    const updateStatus = (id: string, status: MediaItem["status"]) => {
        setMediaList((prev) =>
            prev.map((item) => (item.id === id ? { ...item, status } : item))
        );
    };

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

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleFiles(e.target.files);
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };

    const handleSubmit = () => {
        mediaList.forEach((item) => {
            if (item.status === "Pending") {
                updateStatus(item.id, "Loading");
                uploadMedia({ file: item, mission });
            }
        });
    };

    return (
        <div className="flex flex-col items-center justify-center p-6">
            <MissionInputs
                mission={mission}
                setMission={setMission}
            ></MissionInputs>
            <div className="w-full max-w-4xl rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                    Dépose tes images
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

                {mediaList.length > 0 && (
                    <button
                        onClick={handleSubmit}
                        className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition"
                    >
                        Convertir
                    </button>
                )}
                {checkSize(
                    mediaList.length,
                    uploadedFiles.length,
                    errorFiles.length
                ) && (
                    <button
                        onClick={() => downloadAll(uploadedFiles)}
                        className=" w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-6 px-4 rounded-lg transition"
                    >
                        Télécharger toutes les images en .zip
                    </button>
                )}
            </div>
            <MediaTable mediaList={mediaList} />
        </div>
    );
}
