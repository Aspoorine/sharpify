import { apiService } from "./apiService";
import { MediaItem, MissionType } from "../../type";

const api = apiService();

export async function postMedia({
    file,
    mission,
}: {
    file: MediaItem;
    mission: MissionType;
}): Promise<any> {
    // TODO promise à définir
    const formData = new FormData();
    formData.append("file", file.file);
    formData.append("mission", JSON.stringify(mission));
    console.log("formData", formData);
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
