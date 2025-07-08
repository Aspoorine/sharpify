import { apiService } from "./apiService";

export async function getFile(path: string) {
    return apiService.instance.get(path, { responseType: "blob" });
}
