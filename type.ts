export type MediaItem = {
    id: string;
    name: string;
    size: string;
    type: string;
    file: File;
    status: "En attente" | "Envoyé" | "Erreur";
  };