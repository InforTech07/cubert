// File management module exports
export { default as FilesPage } from './presentation/pages/FilesPage';
export { default as FileDetailPage } from './presentation/pages/FileDetailPage';
export { FileCard } from './presentation/components/FileCard';
export { FilesGrid } from './presentation/components/FilesGrid';
export { FileExplorerHeader } from './presentation/components/FileExplorerHeader';
export type { FileItem, FileItemSize } from './domain/entities/FileItem';
export { getAllItems, getFolders, getFiles, formatFileSize, getFileIcon } from './data/mockData';