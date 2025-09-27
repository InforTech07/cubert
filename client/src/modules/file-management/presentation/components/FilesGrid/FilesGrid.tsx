import React, { useState } from 'react';
import { LayoutGrid } from 'lucide-react';
import { FileCard } from '../FileCard';
import type { FileItem, FileItemSize } from '../../../domain/entities/FileItem';

interface FilesGridProps {
  items: FileItem[];
  onItemSelect?: (item: FileItem) => void;
  onItemDoubleClick?: (item: FileItem) => void;
  cardSize: FileItemSize;
  className?: string;
}

const FilesGrid: React.FC<FilesGridProps> = ({
  items,
  onItemSelect,
  onItemDoubleClick,
  cardSize,
  className = ''
}) => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const handleItemSelect = (item: FileItem) => {
    const newSelected = new Set([item.id]); // Por ahora solo selección simple
    setSelectedItems(newSelected);
    onItemSelect?.(item);
  };

  const getGridColumns = () => {
    switch (cardSize) {
      case 'small':
        return 'grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12';
      case 'medium':
        return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6';
      case 'large':
        return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5';
      default:
        return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Grid de archivos */}
      {items.length === 0 ? (
        <div className="futuristic-surface rounded-2xl p-12 text-center futuristic-highlight">
          <div className="futuristic-surface rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <LayoutGrid className="w-8 h-8 futuristic-text-muted" />
          </div>
          <h3 className="futuristic-text text-lg font-light mb-2">
            No hay elementos
          </h3>
          <p className="futuristic-text-muted">
            Esta carpeta está vacía
          </p>
        </div>
      ) : (
        <div className={`grid gap-4 ${getGridColumns()}`}>
          {items.map((item) => (
            <FileCard
              key={item.id}
              item={item}
              size={cardSize}
              onSelect={handleItemSelect}
              onDoubleClick={onItemDoubleClick}
              isSelected={selectedItems.has(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FilesGrid;