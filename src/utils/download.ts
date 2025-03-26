import JSZip from "jszip";
import { saveAs } from "file-saver";
import { getFile } from "../services/getFile";

export type UploadedFile = { filename: string; path: string };

export async function downloadAll(uploadedFiles: UploadedFile[]) {
  console.log(uploadedFiles)
    const zip = new JSZip();

    await Promise.all(
        uploadedFiles.map(async (file) => {
            const response = await getFile(file.path);
            const blob = response.data;
            zip.file(file.filename, blob);
        })
    );

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "converted-images.zip");
}

export const checkSize = (total: number, list1: number, list2: number) => {
    if (total === 0) return false;
    if (list1 + list2 === total) return true;
    return false;
};
