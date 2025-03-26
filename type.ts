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
