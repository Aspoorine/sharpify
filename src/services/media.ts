import { apiService } from "./apiService";
import { MediaEntityType, MediaItem, MissionType } from "../../type";

const api = apiService();

export type PostMediaResponse = { 
    message:string;
    file : MediaEntityType
}
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
    const { data } = await api.post("/media/convert-to-webp", formData, config);
    return data;
}

export async function getMedias() {
    const { data } = await api.get("/media");
    return data;
}
