export type MediaEntityType = {
    id: string;
    originalName: string;
    filename: string;
    path: string;
    format: string;
    size: number;
    width: number | null;
    height: number | null;
    createdAt: string;
  };  

export type MediaItem = {
    id: string;
    name: string;
    size: string;
    type: string;
    file: File;
    status: "Pending" | "Uploaded" | "Error" | "Loading";
};

export type UploadedFile = { filename: string; path: string };
export type ErrorFile = { id: string; name: string };
