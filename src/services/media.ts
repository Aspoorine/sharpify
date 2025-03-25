import { apiService } from "./apiService";

const api = apiService();

export async function postMedia(file: File) {
    const formData = new FormData();
    formData.append("file", file);    
    const config = {
        headers: {
            "content-type": "multipart/form-data",
        },
    };
    const { data } = await api.post("/media/convert-to-webp", formData, config);
    return data;
}