import { apiService } from "./apiService";

const api = apiService();

export async function getFile(path: string) {
    return api.get(path, { responseType: 'blob' });
  }

