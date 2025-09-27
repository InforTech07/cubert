import React from 'react';
import { 
  Folder, 
  FileText, 
  Image, 
  Video, 
  Music, 
  Code, 
  Database, 
  File,
  Share2,
  Lock,
  MoreVertical
} from 'lucide-react';
import type { FileItem, FileItemSize } from '../../../domain/entities/FileItem';
import { formatFileSize } from '../../../data/mockData';

interface FileCardProps {
  item: FileItem;
  size: FileItemSize;
  onSelect?: (item: FileItem) => void;
  onDoubleClick?: (item: FileItem) => void;
  isSelected?: boolean;
}

const FileCard: React.FC<FileCardProps> = ({
  item,
  size,
  onSelect,
  onDoubleClick,
  isSelected = false
}) => {
  const getFileIcon = (item: FileItem) => {
    if (item.type === 'folder') {
      return <Folder className="futuristic-text" />;
    }

    const extension = item.extension?.toLowerCase();
    const iconSize = size === 'small' ? 'w-4 h-4' : size === 'medium' ? 'w-6 h-6' : 'w-8 h-8';

    const iconMap: Record<string, React.ReactNode> = {
      pdf: <FileText className={`${iconSize} futuristic-text`} />,
      docx: <FileText className={`${iconSize} futuristic-text`} />,
      doc: <FileText className={`${iconSize} futuristic-text`} />,
      xlsx: <FileText className={`${iconSize} futuristic-text`} />,
      xls: <FileText className={`${iconSize} futuristic-text`} />,
      png: <Image className={`${iconSize} futuristic-text`} />,
      jpg: <Image className={`${iconSize} futuristic-text`} />,
      jpeg: <Image className={`${iconSize} futuristic-text`} />,
      gif: <Image className={`${iconSize} futuristic-text`} />,
      svg: <Image className={`${iconSize} futuristic-text`} />,
      mp4: <Video className={`${iconSize} futuristic-text`} />,
      avi: <Video className={`${iconSize} futuristic-text`} />,
      mkv: <Video className={`${iconSize} futuristic-text`} />,
      mp3: <Music className={`${iconSize} futuristic-text`} />,
      wav: <Music className={`${iconSize} futuristic-text`} />,
      json: <Code className={`${iconSize} futuristic-text`} />,
      js: <Code className={`${iconSize} futuristic-text`} />,
      ts: <Code className={`${iconSize} futuristic-text`} />,
      tsx: <Code className={`${iconSize} futuristic-text`} />,
      jsx: <Code className={`${iconSize} futuristic-text`} />,
      html: <Code className={`${iconSize} futuristic-text`} />,
      css: <Code className={`${iconSize} futuristic-text`} />,
      md: <FileText className={`${iconSize} futuristic-text`} />,
      txt: <FileText className={`${iconSize} futuristic-text`} />,
      sql: <Database className={`${iconSize} futuristic-text`} />
    };

    return iconMap[extension || ''] || <File className={`${iconSize} futuristic-text`} />;
  };

  const getCardStyles = () => {
    const baseStyles = `futuristic-glass rounded-2xl futuristic-highlight cursor-pointer transition-all duration-300 hover:scale-[1.02] border border-transparent file-grid-transition`;
    const selectedStyles = isSelected ? 'futuristic-highlight-active border-blue-400/30' : '';
    const statusStyles = item.isShared ? 'file-status-indicator file-status-shared' : !item.permissions.write ? 'file-status-indicator file-status-locked' : '';
    
    switch (size) {
      case 'small':
        return `${baseStyles} ${selectedStyles} ${statusStyles} p-3 min-h-[100px] file-card-small`;
      case 'medium':
        return `${baseStyles} ${selectedStyles} ${statusStyles} p-4 min-h-[140px] file-card-medium`;
      case 'large':
        return `${baseStyles} ${selectedStyles} ${statusStyles} p-6 min-h-[180px] file-card-large`;
      default:
        return `${baseStyles} ${selectedStyles} ${statusStyles} p-4 min-h-[140px] file-card-medium`;
    }
  };

  const getIconContainerStyles = () => {
    switch (size) {
      case 'small':
        return 'w-10 h-10 mb-2';
      case 'medium':
        return 'w-12 h-12 mb-3';
      case 'large':
        return 'w-16 h-16 mb-4';
      default:
        return 'w-12 h-12 mb-3';
    }
  };

  const getTitleStyles = () => {
    switch (size) {
      case 'small':
        return 'text-sm font-medium';
      case 'medium':
        return 'text-base font-medium';
      case 'large':
        return 'text-lg font-medium';
      default:
        return 'text-base font-medium';
    }
  };

  const handleClick = () => {
    onSelect?.(item);
  };

  const handleDoubleClick = () => {
    onDoubleClick?.(item);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: '2-digit'
    });
  };

  return (
    <div 
      className={getCardStyles()}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <div className="flex flex-col h-full">
        {/* Header con icono y opciones */}
        <div className="flex items-start justify-between mb-2">
          <div className={`futuristic-surface rounded-xl flex items-center justify-center ${getIconContainerStyles()}`}>
            {getFileIcon(item)}
          </div>
          
          {size !== 'small' && (
            <div className="flex items-center space-x-1 opacity-60">
              {item.isShared && <Share2 className="w-3 h-3 futuristic-text" />}
              {!item.permissions.write && <Lock className="w-3 h-3 futuristic-text" />}
              <button className="p-1 hover:bg-white/10 rounded">
                <MoreVertical className="w-3 h-3 futuristic-text" />
              </button>
            </div>
          )}
        </div>

        {/* Título */}
        <div className="flex-grow">
          <h3 className={`futuristic-text ${getTitleStyles()} mb-1 line-clamp-2`}>
            {item.name}
          </h3>
          
          {/* Información adicional */}
          {size !== 'small' && (
            <div className="space-y-1">
              {item.type === 'file' && item.size && (
                <p className="text-xs futuristic-text-muted">
                  {formatFileSize(item.size)}
                </p>
              )}
              <p className="text-xs futuristic-text-muted">
                {formatDate(item.modifiedAt)}
              </p>
            </div>
          )}

          {/* Información extendida solo para cards large */}
          {size === 'large' && (
            <div className="mt-3 pt-3 border-t border-white/10">
              <div className="flex items-center justify-between text-xs">
                <span className="futuristic-text-muted">Permisos:</span>
                <div className="flex space-x-1">
                  <div className={`w-2 h-2 rounded-full ${item.permissions.read ? 'bg-green-400/60' : 'bg-red-400/60'}`} title="Lectura" />
                  <div className={`w-2 h-2 rounded-full ${item.permissions.write ? 'bg-green-400/60' : 'bg-red-400/60'}`} title="Escritura" />
                  <div className={`w-2 h-2 rounded-full ${item.permissions.share ? 'bg-green-400/60' : 'bg-red-400/60'}`} title="Compartir" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileCard;