import { apiService } from "./apiService";
import { MediaEntityType, MediaItem, MissionType } from "../../type";

export type PostMediaResponse = {
    message: string;
    file: MediaEntityType;
};

export type StorageInfo = {
    currentSize: string;
    limit: string;
    remainingSpace: string;
    usagePercentage: number;
    canUpload: boolean;
};

export type StorageCheck = {
    currentSize: string;
    newTotalSize: string;
    limit: string;
    canUpload: boolean;
    remainingSpace: string;
    newFileSize: string;
    usagePercentage: number;
};

export async function postMedia({
    file,
    mission,
}: {
    file: MediaItem;
    mission: MissionType;
}): Promise<PostMediaResponse> {
    const formData = new FormData();
    formData.append("file", file.file);
    formData.append("mission", JSON.stringify(mission));
    const config = {
        headers: {
            "content-type": "multipart/form-data",
        },
    };
    const { data } = await apiService.instance.post(
        "/media/convert",
        formData,
        config
    );
    return data;
}

export async function getMedias() {
    const { data } = await apiService.instance.get("/media");
    return data;
}

export async function deleteMedia(id: string) {
    const { data } = await apiService.instance.delete(`/media/${id}`);
    return data;
}

export async function deleteAllMedias() {
    const { data } = await apiService.instance.delete("/media");
    return data;
}

export async function getStorageInfo(): Promise<StorageInfo> {
    const { data } = await apiService.instance.get("/media/storage/info");
    return data;
}

export async function checkStorageForFile(
    fileSize: number
): Promise<StorageCheck> {
    const { data } = await apiService.instance.post("/media/storage/check", {
        fileSize,
    });
    return data;
}
