import JSZip from "jszip";
import { saveAs } from "file-saver";
import { getFile } from "../services/getFile";

export type UploadedFile = { filename: string; path: string };

export async function downloadAll(uploadedFiles: UploadedFile[]) {
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
