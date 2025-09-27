export interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: number; // en bytes, solo para archivos
  extension?: string; // extensión del archivo
  createdAt: Date;
  modifiedAt: Date;
  permissions: {
    read: boolean;
    write: boolean;
    share: boolean;
  };
  isShared?: boolean;
  parentId?: string; // ID de la carpeta padre
  path: string; // ruta completa
  thumbnail?: string; // URL del thumbnail para archivos de imagen
}

export interface FolderContent {
  files: FileItem[];
  folders: FileItem[];
  totalItems: number;
  currentPath: string;
}

export type FileItemSize = 'small' | 'medium' | 'large';
export type ViewMode = 'grid' | 'list';