// Datos mock para el dashboard
export interface FavoriteFolder {
  id: string;
  name: string;
  path: string;
  itemCount: number;
  lastAccessed: Date;
  color?: string;
}

export interface FavoriteFile {
  id: string;
  name: string;
  path: string;
  size: number;
  extension: string;
  lastModified: Date;
  thumbnail?: string;
}

export interface SystemStats {
  totalFiles: number;
  totalFolders: number;
  totalSize: number; // en bytes
  availableSpace: number; // en bytes
  lastBackup: Date;
  activeUsers: number;
}

export interface RecentActivity {
  id: string;
  type: 'create' | 'modify' | 'delete' | 'share' | 'download';
  fileName: string;
  timestamp: Date;
  user?: string;
}

export interface QuickAccess {
  id: string;
  name: string;
  path: string;
  type: 'folder' | 'file';
  icon: string;
  color: string;
}

// Datos mock
export const mockFavoriteFolders: FavoriteFolder[] = [
  {
    id: 'fav-folder-1',
    name: 'Proyectos Importantes',
    path: '/Documentos/Proyectos',
    itemCount: 24,
    lastAccessed: new Date('2024-09-26'),
    color: '#3b82f6'
  },
  {
    id: 'fav-folder-2',
    name: 'Fotos Familia',
    path: '/Imagenes/Familia',
    itemCount: 156,
    lastAccessed: new Date('2024-09-25'),
    color: '#10b981'
  },
  {
    id: 'fav-folder-3',
    name: 'Música Favorita',
    path: '/Audio/Favoritas',
    itemCount: 89,
    lastAccessed: new Date('2024-09-24'),
    color: '#f59e0b'
  },
  {
    id: 'fav-folder-4',
    name: 'Trabajo',
    path: '/Documentos/Trabajo',
    itemCount: 67,
    lastAccessed: new Date('2024-09-23'),
    color: '#8b5cf6'
  }
];

export const mockFavoriteFiles: FavoriteFile[] = [
  {
    id: 'fav-file-1',
    name: 'Presentacion_Final.pdf',
    path: '/Documentos/Presentacion_Final.pdf',
    size: 2547892,
    extension: 'pdf',
    lastModified: new Date('2024-09-26')
  },
  {
    id: 'fav-file-2',
    name: 'Vacaciones_2024.jpg',
    path: '/Imagenes/Vacaciones_2024.jpg',
    size: 1234567,
    extension: 'jpg',
    lastModified: new Date('2024-09-25')
  },
  {
    id: 'fav-file-3',
    name: 'Config_Sistema.json',
    path: '/Config/Config_Sistema.json',
    size: 3456,
    extension: 'json',
    lastModified: new Date('2024-09-24')
  },
  {
    id: 'fav-file-4',
    name: 'Backup_DB.sql',
    path: '/Backups/Backup_DB.sql',
    size: 8901234,
    extension: 'sql',
    lastModified: new Date('2024-09-23')
  }
];

export const mockSystemStats: SystemStats = {
  totalFiles: 1247,
  totalFolders: 89,
  totalSize: 15678912345, // ~14.6GB
  availableSpace: 234567890123, // ~218GB
  lastBackup: new Date('2024-09-26T03:30:00'),
  activeUsers: 3
};

export const mockRecentActivity: RecentActivity[] = [
  {
    id: 'activity-1',
    type: 'create',
    fileName: 'Nuevo_Documento.docx',
    timestamp: new Date('2024-09-27T10:30:00'),
    user: 'Usuario'
  },
  {
    id: 'activity-2',
    type: 'modify',
    fileName: 'Presentacion_Final.pdf',
    timestamp: new Date('2024-09-27T09:15:00'),
    user: 'Usuario'
  },
  {
    id: 'activity-3',
    type: 'share',
    fileName: 'Fotos_Proyecto.zip',
    timestamp: new Date('2024-09-27T08:45:00'),
    user: 'Usuario'
  },
  {
    id: 'activity-4',
    type: 'download',
    fileName: 'Manual_Usuario.pdf',
    timestamp: new Date('2024-09-26T16:20:00'),
    user: 'Invitado'
  },
  {
    id: 'activity-5',
    type: 'delete',
    fileName: 'Archivo_Temporal.tmp',
    timestamp: new Date('2024-09-26T14:10:00'),
    user: 'Usuario'
  }
];

export const mockQuickAccess: QuickAccess[] = [
  {
    id: 'quick-1',
    name: 'Descargas',
    path: '/Descargas',
    type: 'folder',
    icon: 'download',
    color: '#06b6d4'
  },
  {
    id: 'quick-2',
    name: 'Documentos',
    path: '/Documentos',
    type: 'folder',
    icon: 'file-text',
    color: '#3b82f6'
  },
  {
    id: 'quick-3',
    name: 'Imágenes',
    path: '/Imagenes',
    type: 'folder',
    icon: 'image',
    color: '#10b981'
  },
  {
    id: 'quick-4',
    name: 'Música',
    path: '/Audio',
    type: 'folder',
    icon: 'music',
    color: '#f59e0b'
  },
  {
    id: 'quick-5',
    name: 'Videos',
    path: '/Videos',
    type: 'folder',
    icon: 'video',
    color: '#ef4444'
  },
  {
    id: 'quick-6',
    name: 'Compartidos',
    path: '/Compartidos',
    type: 'folder',
    icon: 'share-2',
    color: '#8b5cf6'
  }
];

// Funciones utilitarias
export const formatFileSize = (bytes: number): string => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
};

export const getRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInHours = diffInMs / (1000 * 60 * 60);
  const diffInDays = diffInHours / 24;

  if (diffInHours < 1) {
    return 'Hace unos minutos';
  } else if (diffInHours < 24) {
    return `Hace ${Math.floor(diffInHours)} hora${Math.floor(diffInHours) !== 1 ? 's' : ''}`;
  } else if (diffInDays < 7) {
    return `Hace ${Math.floor(diffInDays)} día${Math.floor(diffInDays) !== 1 ? 's' : ''}`;
  } else {
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: '2-digit'
    });
  }
};

export const getActivityIcon = (type: RecentActivity['type']): string => {
  const icons = {
    create: 'plus',
    modify: 'edit',
    delete: 'trash-2',
    share: 'share-2',
    download: 'download'
  };
  return icons[type];
};

export const getActivityColor = (type: RecentActivity['type']): string => {
  const colors = {
    create: '#10b981', // verde
    modify: '#3b82f6', // azul  
    delete: '#ef4444', // rojo
    share: '#f59e0b', // amarillo
    download: '#06b6d4'  // cian
  };
  return colors[type];
};