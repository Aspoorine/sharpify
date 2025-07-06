import { useQuery } from "@tanstack/react-query";
import { getMedias } from "../services/media";
import { MediaEntityType } from "../../type";
import { ArrowDownTrayIcon, TrashIcon } from "@heroicons/react/24/outline";
import { formatDateToShortString } from "../utils/formatDateToString";
import { useState } from "react";
import DeleteModal from "../components/DeleteModal";

export default function DocumentsPage() {
  const { data: files, isSuccess } = useQuery({
    queryKey: ["medias"],
    queryFn: () => getMedias(),
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
    <DeleteModal open={isDeleteModalOpen} setOpen={setIsDeleteModalOpen} />

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
                src={`${import.meta.env.VITE_API_BASE_URL}${file.path}`}
                alt={file.originalName || `Image convertie`}
                className="pointer-events-none aspect-10/7 object-cover group-hover:opacity-75"
              />
            </div>

            <div className="mt-3 text-sm text-white space-y-2">
              <p className="truncate font-semibold">{file.originalName}</p>
              <div className="flex justify-between text-gray-400 text-sm">
                <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                <span>{file.format.toUpperCase()}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3">
              <p className="text-xs text-gray-200">
                {formatDateToShortString(file.createdAt)}
              </p>
              <div className="flex items-center gap-2">
                <a
                  href={`${import.meta.env.VITE_API_BASE_URL}${file.path}`}
                  download={file.originalName} // TODO: faire en sorte que le DL se lance
                  className="flex items-center justify-center bg-white/10 hover:bg-green-700 text-white p-2 rounded-md transition"
                >
                  <ArrowDownTrayIcon className="h-5 w-5" />
                </a>

                <button
                  onClick={() => {
                    console.log("Suppression"); // TODO: ajouter suppression
                  }}
                  className="flex items-center justify-center bg-white/10 hover:bg-red-500/70 text-white p-2 rounded-md transition"
                >
                  <TrashIcon
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="h-5 w-5"
                  />
                </button>
              </div>
            </div>
          </li>
        ))}
    </ul>
    </>
  );
}
