import React, { useState } from 'react';
import { FileExplorerHeader } from '../components/FileExplorerHeader';
import { FilesGrid } from '../components/FilesGrid';
import { FileCard } from '../components/FileCard';
import type { FileItem, FileItemSize } from '../../domain/entities/FileItem';
import { getAllItems } from '../../data/mockData';

const FilesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPath, setCurrentPath] = useState('/');
  const [cardSize, setCardSize] = useState<FileItemSize>('medium');
  const [allItems] = useState<FileItem[]>(getAllItems());
  
  // Filtrar elementos por búsqueda
  const filteredItems = allItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleItemSelect = (item: FileItem) => {
    console.log('Item seleccionado:', item);
  };

  const handleItemDoubleClick = (item: FileItem) => {
    if (item.type === 'folder') {
      setCurrentPath(item.path);
      console.log('Navegando a carpeta:', item.path);
    } else {
      console.log('Abriendo archivo:', item.name);
    }
  };

  const handleUpload = () => {
    console.log('Subir archivos');
    // Aquí se implementaría la lógica de subida
  };

  const handleCreateFolder = () => {
    console.log('Crear nueva carpeta');
    // Aquí se implementaría la lógica de creación de carpeta
  };

  // Para demostrar breadcrumbs profundos, agregar botones de prueba
  const testPaths = [
    '/',
    '/Proyectos',
    '/Proyectos/Frontend',
    '/Proyectos/Frontend/React',
    '/Proyectos/Frontend/React/Components',
    '/Proyectos/Frontend/React/Components/UI'
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header unificado */}
        <FileExplorerHeader
          currentPath={currentPath}
          onNavigate={setCurrentPath}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          cardSize={cardSize}
          onCardSizeChange={setCardSize}
          totalItems={filteredItems.length}
          onUpload={handleUpload}
          onCreateFolder={handleCreateFolder}
        />

        {/* Contenido principal */}
        <main className="mt-8">
          {searchQuery && (
            <div className="mb-4">
              <p className="futuristic-text-muted text-sm">
                {filteredItems.length} resultado{filteredItems.length !== 1 ? 's' : ''} para "{searchQuery}"
              </p>
            </div>
          )}

          <FilesGrid
            items={filteredItems}
            onItemSelect={handleItemSelect}
            onItemDoubleClick={handleItemDoubleClick}
            cardSize={cardSize}
          />
        </main>
      </div>
    </div>
  );
};

export default FilesPage;