import type { FileItem } from '../domain/entities/FileItem';

// Datos mock para demostración
export const mockFolders: FileItem[] = [
  {
    id: 'folder-1',
    name: 'Documentos',
    type: 'folder',
    createdAt: new Date('2024-01-15'),
    modifiedAt: new Date('2024-09-25'),
    permissions: { read: true, write: true, share: true },
    path: '/Documentos'
  },
  {
    id: 'folder-2',
    name: 'Proyectos',
    type: 'folder',
    createdAt: new Date('2024-02-10'),
    modifiedAt: new Date('2024-09-26'),
    permissions: { read: true, write: true, share: false },
    path: '/Proyectos'
  },
  {
    id: 'folder-3',
    name: 'Imagenes',
    type: 'folder',
    createdAt: new Date('2024-03-05'),
    modifiedAt: new Date('2024-09-20'),
    permissions: { read: true, write: true, share: true },
    isShared: true,
    path: '/Imagenes'
  },
  {
    id: 'folder-4',
    name: 'Videos',
    type: 'folder',
    createdAt: new Date('2024-04-12'),
    modifiedAt: new Date('2024-09-15'),
    permissions: { read: true, write: false, share: true },
    path: '/Videos'
  },
  {
    id: 'folder-5',
    name: 'Descargas',
    type: 'folder',
    createdAt: new Date('2024-05-20'),
    modifiedAt: new Date('2024-09-27'),
    permissions: { read: true, write: true, share: false },
    path: '/Descargas'
  },
  // Carpetas anidadas para probar breadcrumbs
  {
    id: 'folder-6',
    name: 'Frontend',
    type: 'folder',
    createdAt: new Date('2024-06-01'),
    modifiedAt: new Date('2024-09-25'),
    permissions: { read: true, write: true, share: true },
    path: '/Proyectos/Frontend'
  },
  {
    id: 'folder-7',
    name: 'React',
    type: 'folder',
    createdAt: new Date('2024-06-15'),
    modifiedAt: new Date('2024-09-24'),
    permissions: { read: true, write: true, share: true },
    path: '/Proyectos/Frontend/React'
  },
  {
    id: 'folder-8',
    name: 'Components',
    type: 'folder',
    createdAt: new Date('2024-07-01'),
    modifiedAt: new Date('2024-09-23'),
    permissions: { read: true, write: true, share: false },
    path: '/Proyectos/Frontend/React/Components'
  },
  {
    id: 'folder-9',
    name: 'UI',
    type: 'folder',
    createdAt: new Date('2024-07-15'),
    modifiedAt: new Date('2024-09-22'),
    permissions: { read: true, write: true, share: false },
    path: '/Proyectos/Frontend/React/Components/UI'
  }
];

export const mockFiles: FileItem[] = [
  {
    id: 'file-1',
    name: 'Presentacion_Q3.pdf',
    type: 'file',
    size: 2547892, // ~2.5MB
    extension: 'pdf',
    createdAt: new Date('2024-07-15'),
    modifiedAt: new Date('2024-09-20'),
    permissions: { read: true, write: true, share: true },
    isShared: true,
    path: '/Documentos/Presentacion_Q3.pdf'
  },
  {
    id: 'file-2',
    name: 'Informe_Anual_2024.docx',
    type: 'file',
    size: 1234567, // ~1.2MB
    extension: 'docx',
    createdAt: new Date('2024-08-10'),
    modifiedAt: new Date('2024-09-25'),
    permissions: { read: true, write: true, share: false },
    path: '/Documentos/Informe_Anual_2024.docx'
  },
  {
    id: 'file-3',
    name: 'Dashboard_Analytics.xlsx',
    type: 'file',
    size: 892345, // ~870KB
    extension: 'xlsx',
    createdAt: new Date('2024-06-22'),
    modifiedAt: new Date('2024-09-18'),
    permissions: { read: true, write: false, share: true },
    path: '/Documentos/Dashboard_Analytics.xlsx'
  },
  {
    id: 'file-4',
    name: 'Logo_Cubert_v2.png',
    type: 'file',
    size: 456789, // ~446KB
    extension: 'png',
    createdAt: new Date('2024-05-30'),
    modifiedAt: new Date('2024-09-10'),
    permissions: { read: true, write: true, share: true },
    thumbnail: '/assets/images/placeholder-thumbnail.png',
    path: '/Imagenes/Logo_Cubert_v2.png'
  },
  {
    id: 'file-5',
    name: 'Tutorial_Instalacion.mp4',
    type: 'file',
    size: 15678912, // ~15MB
    extension: 'mp4',
    createdAt: new Date('2024-04-18'),
    modifiedAt: new Date('2024-09-05'),
    permissions: { read: true, write: false, share: true },
    path: '/Videos/Tutorial_Instalacion.mp4'
  },
  {
    id: 'file-6',
    name: 'database_backup.sql',
    type: 'file',
    size: 8901234, // ~8.5MB
    extension: 'sql',
    createdAt: new Date('2024-09-01'),
    modifiedAt: new Date('2024-09-01'),
    permissions: { read: true, write: false, share: false },
    path: '/Descargas/database_backup.sql'
  },
  {
    id: 'file-7',
    name: 'README.md',
    type: 'file',
    size: 12345, // ~12KB
    extension: 'md',
    createdAt: new Date('2024-01-10'),
    modifiedAt: new Date('2024-09-26'),
    permissions: { read: true, write: true, share: true },
    path: '/README.md'
  },
  {
    id: 'file-8',
    name: 'Config_Sistema.json',
    type: 'file',
    size: 3456, // ~3KB
    extension: 'json',
    createdAt: new Date('2024-03-15'),
    modifiedAt: new Date('2024-09-22'),
    permissions: { read: true, write: true, share: false },
    path: '/Config_Sistema.json'
  },
  // Archivos en rutas profundas
  {
    id: 'file-9',
    name: 'Button.tsx',
    type: 'file',
    size: 8765, // ~8.5KB
    extension: 'tsx',
    createdAt: new Date('2024-07-20'),
    modifiedAt: new Date('2024-09-21'),
    permissions: { read: true, write: true, share: true },
    path: '/Proyectos/Frontend/React/Components/UI/Button.tsx'
  },
  {
    id: 'file-10',
    name: 'Modal.tsx',
    type: 'file',
    size: 12345, // ~12KB
    extension: 'tsx',
    createdAt: new Date('2024-07-22'),
    modifiedAt: new Date('2024-09-20'),
    permissions: { read: true, write: true, share: true },
    path: '/Proyectos/Frontend/React/Components/UI/Modal.tsx'
  },
  {
    id: 'file-11',
    name: 'Input.tsx',
    type: 'file',
    size: 6789, // ~6.5KB
    extension: 'tsx',
    createdAt: new Date('2024-07-25'),
    modifiedAt: new Date('2024-09-19'),
    permissions: { read: true, write: true, share: false },
    path: '/Proyectos/Frontend/React/Components/UI/Input.tsx'
  }
];

export const getAllItems = (): FileItem[] => {
  return [...mockFolders, ...mockFiles].sort((a, b) => {
    // Primero las carpetas, luego los archivos
    if (a.type !== b.type) {
      return a.type === 'folder' ? -1 : 1;
    }
    // Ordenar alfabéticamente por nombre
    return a.name.localeCompare(b.name);
  });
};

export const getFolders = (): FileItem[] => mockFolders;
export const getFiles = (): FileItem[] => mockFiles;

// Función para formatear el tamaño de archivo
export const formatFileSize = (bytes?: number): string => {
  if (!bytes) return '-';
  
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
};

// Función para obtener el icono basado en la extensión
export const getFileIcon = (extension?: string): string => {
  if (!extension) return 'file';
  
  const iconMap: Record<string, string> = {
    pdf: 'file-text',
    docx: 'file-text',
    doc: 'file-text',
    xlsx: 'spreadsheet',
    xls: 'spreadsheet',
    png: 'image',
    jpg: 'image',
    jpeg: 'image',
    gif: 'image',
    svg: 'image',
    mp4: 'video',
    avi: 'video',
    mkv: 'video',
    mp3: 'music',
    wav: 'music',
    json: 'code',
    js: 'code',
    ts: 'code',
    tsx: 'code',
    jsx: 'code',
    html: 'code',
    css: 'code',
    md: 'file-text',
    txt: 'file-text',
    sql: 'database'
  };
  
  return iconMap[extension.toLowerCase()] || 'file';
};