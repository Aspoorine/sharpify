import JSZip from "jszip";
import { saveAs } from "file-saver";
import { getFile } from "../services/getFile";
import { MediaEntityType } from "../../type";

/**
 * Downloads all provided media files, compresses them into a ZIP archive,
 * and triggers a download of the resulting ZIP file.
 *
 * @param uploadedFiles - An array of media file entities to be downloaded and included in the ZIP archive.
 * Each entity should contain the following properties:
 *   - `path`: The file path or URL to fetch the file from.
 *   - `originalName`: The original name of the file, including its extension.
 *   - `format`: The desired format or extension for the file in the ZIP archive.
 *
 * @returns A promise that resolves once the ZIP file has been generated and the download has been triggered.
 *
 * @throws Will throw an error if any file fails to download or if the ZIP generation process encounters an issue.
 */
export async function downloadAll(uploadedFiles: MediaEntityType[]) {
    const zip = new JSZip();

    await Promise.all(
        uploadedFiles.map(async (file) => {
            const response = await getFile(file.path);
            const blob = response.data;
            const originalNameWithoutFormat = file.originalName.split(".")[0];
            zip.file(`${originalNameWithoutFormat}.${file.format}`, blob);
        })
    );

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "converted-images.zip");
}

/**
 * Downloads a single media file directly without compression.
 *
 * @param file - The media file entity to be downloaded.
 * Each entity should contain the following properties:
 *   - `path`: The file path or URL to fetch the file from.
 *   - `originalName`: The original name of the file, including its extension.
 *   - `format`: The desired format or extension for the file.
 *
 * @returns A promise that resolves once the file has been downloaded.
 *
 * @throws Will throw an error if the file fails to download.
 */
export async function downloadSingle(file: MediaEntityType) {
    const response = await getFile(file.path);
    const blob = response.data;
    const originalNameWithoutFormat = file.originalName.split(".")[0];
    const fileName = `${originalNameWithoutFormat}.${file.format}`;
    saveAs(blob, fileName);
}

export const checkSize = (total: number, list1: number, list2: number) => {
    if (total === 0) return false;
    if (list1 + list2 === total) return true;
    return false;
};
