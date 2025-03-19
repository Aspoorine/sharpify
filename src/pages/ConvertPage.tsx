import React, { useState, ChangeEvent } from "react";
import { toast } from "react-toastify";

export default function ConvertPage() {
    const [imageInfo, setImageInfo] = useState<{
        name: string;
        size: string;
        type: string;
        file: File;
        formData: FormData;
    } | null>(null);
    console.log(imageInfo);
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append("File", file);

            setImageInfo({
                name: file.name,
                size: (file.size / 1024).toFixed(2) + " KB",
                type: file.type,
                file,
                formData,
            });
        }
    };
    const notify = () => toast('Wow so easy !');
    const handleSubmit = () => {
      notify()
        if (imageInfo?.formData) {
            // Ici tu peux utiliser fetch ou axios pour envoyer vers ton endpoint NestJS
            console.log(
                "Envoi de l'image sous forme de FormData",
                imageInfo.formData
            );
            // Ex: axios.post('/api/convert', imageInfo.formData)
        }
    };

    return (
        <div className="min-h-screen  flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-[#1E293B] rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                    Dépose ton image
                </h2>
                <label
                    htmlFor="file-upload"
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
                    />
                </label>

                {imageInfo && (
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
                )}
            </div>
        </div>
    );
}
