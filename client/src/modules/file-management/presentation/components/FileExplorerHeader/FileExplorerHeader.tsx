import React, { useState } from 'react';
import { 
  Search, 
  Upload, 
  Plus, 
  Home, 
  ChevronRight, 
  Grid, 
  LayoutGrid, 
  List,
  MoreHorizontal
} from 'lucide-react';
import type { FileItemSize } from '../../../domain/entities/FileItem';

interface FileExplorerHeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cardSize: FileItemSize;
  onCardSizeChange: (size: FileItemSize) => void;
  totalItems: number;
  onUpload?: () => void;
  onCreateFolder?: () => void;
}

const FileExplorerHeader: React.FC<FileExplorerHeaderProps> = ({
  currentPath,
  onNavigate,
  searchQuery,
  onSearchChange,
  cardSize,
  onCardSizeChange,
  totalItems,
  onUpload,
  onCreateFolder
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Procesar breadcrumbs con profundidad máxima de 3
  const getBreadcrumbs = () => {
    const parts = currentPath.split('/').filter(Boolean);
    
    if (parts.length <= 3) {
      return parts;
    }
    
    // Si hay más de 3, mostrar: primera / ... / últimas 2
    return [parts[0], '...', ...parts.slice(-2)];
  };

  const getFullPath = (index: number, breadcrumbs: string[]) => {
    if (breadcrumbs[index] === '...') return null;
    
    const parts = currentPath.split('/').filter(Boolean);
    
    if (parts.length <= 3) {
      return '/' + parts.slice(0, index + 1).join('/');
    }
    
    // Para el caso truncado
    if (index === 0) {
      return '/' + parts[0];
    } else {
      // Los últimos elementos
      const realIndex = parts.length - (breadcrumbs.length - index);
      return '/' + parts.slice(0, realIndex + 1).join('/');
    }
  };

  const getSizeLabel = (size: FileItemSize) => {
    return size === 'small' ? 'Pequeño' : size === 'medium' ? 'Mediano' : 'Grande';
  };

  const getSizeIcon = (size: FileItemSize) => {
    return size === 'small' ? Grid : size === 'medium' ? LayoutGrid : List;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="space-y-4">
      {/* Header unificado - estilo toolbar */}
      <div className="flex items-center justify-between file-explorer-header rounded-2xl p-4">
        
        {/* Lado izquierdo: Breadcrumbs */}
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 min-w-0">
            <button 
              onClick={() => onNavigate('/')}
              className="flex items-center space-x-1 breadcrumb-item rounded px-2 py-1 transition-all flex-shrink-0"
            >
              <Home className="w-4 h-4 futuristic-text" />
              <span className="futuristic-text text-sm hidden sm:inline">Inicio</span>
            </button>
            
            {breadcrumbs.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 min-w-0">
                <ChevronRight className="w-4 h-4 futuristic-text-muted breadcrumb-separator flex-shrink-0" />
                {item === '...' ? (
                  <div className="flex items-center">
                    <MoreHorizontal className="w-4 h-4 futuristic-text-muted" />
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      const path = getFullPath(index, breadcrumbs);
                      if (path) onNavigate(path);
                    }}
                    className="futuristic-text text-sm breadcrumb-item rounded px-2 py-1 transition-all truncate"
                    title={item}
                  >
                    {item}
                  </button>
                )}
              </div>
            ))}
          </nav>

          {/* Contador de elementos */}
          <div className="hidden md:block">
            <span className="futuristic-text-muted text-sm">
              {totalItems} elemento{totalItems !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Centro: Buscador */}
        <div className="flex-1 max-w-md mx-4">
          <div className={`relative ${isSearchFocused ? 'search-focused' : ''}`}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 futuristic-text-muted" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full file-explorer-search rounded-xl pl-10 pr-4 py-2 futuristic-text placeholder:futuristic-text-muted outline-none"
            />
          </div>
        </div>

        {/* Lado derecho: Acciones y controles */}
        <div className="flex items-center space-x-3">
          {/* Botones de acción */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={onUpload}
              className="file-explorer-button rounded-lg px-3 py-2 flex items-center space-x-2"
              title="Subir archivos"
            >
              <Upload className="w-4 h-4 futuristic-text" />
              <span className="futuristic-text text-sm hidden lg:inline">Subir</span>
            </button>
            
            <button 
              onClick={onCreateFolder}
              className="file-explorer-button rounded-lg px-3 py-2 flex items-center space-x-2"
              title="Nueva carpeta"
            >
              <Plus className="w-4 h-4 futuristic-text" />
              <span className="futuristic-text text-sm hidden lg:inline">Carpeta</span>
            </button>
          </div>

          {/* Separador visual */}
          <div className="w-px h-6 bg-white/10"></div>

          {/* Controles de tamaño */}
          <div className="flex items-center space-x-2">
            <span className="futuristic-text-muted text-sm hidden xl:inline">Vista:</span>
            
            <div className="flex items-center file-explorer-button rounded-lg p-1">
              {(['small', 'medium', 'large'] as FileItemSize[]).map((size) => {
                const isActive = cardSize === size;
                const Icon = getSizeIcon(size);
                
                return (
                  <button
                    key={size}
                    onClick={() => onCardSizeChange(size)}
                    className={`p-2 rounded transition-all duration-200 ${
                      isActive 
                        ? 'file-explorer-button active' 
                        : 'hover:bg-white/10 futuristic-text-muted'
                    }`}
                    title={getSizeLabel(size)}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileExplorerHeader;