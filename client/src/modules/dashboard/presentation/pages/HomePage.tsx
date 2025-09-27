import React from 'react';
import { useSimpleDateTime, useSimpleLogout } from '../../../../shared/components/simple-topbar/SimpleTopBarHooks';

// Componentes del dashboard
import FavoriteFolders from '../components/FavoriteFolders/FavoriteFolders';
import FavoriteFiles from '../components/FavoriteFiles/FavoriteFiles';
import SystemStatistics from '../components/SystemStatistics/SystemStatistics';
import RecentActivity from '../components/RecentActivity/RecentActivity';
import QuickAccess from '../components/QuickAccess/QuickAccess';
import MusicPlayerDashboard from '../components/MusicPlayer/MusicPlayerDashboard';

// Datos mock
import {
  mockFavoriteFolders,
  mockFavoriteFiles,
  mockSystemStats,
  mockRecentActivity,
  mockQuickAccess
} from '../../data/mockDashboardData';

const HomePage: React.FC = () => {
  // Activar herramientas del TopBar para el dashboard
  useSimpleDateTime();

  useSimpleLogout(() => {
    console.log('Cerrando sesión desde el dashboard');
    // Aquí puedes agregar la lógica de logout
    alert('¡Cerrando sesión!');
  });

  // Handlers para interacciones
  const handleFolderClick = (folder: any) => {
    console.log('Navegando a carpeta:', folder.path);
  };

  const handleFileClick = (file: any) => {
    console.log('Abriendo archivo:', file.path);
  };

  const handleActivityClick = (activity: any) => {
    console.log('Detalle de actividad:', activity);
  };

  const handleQuickAccessClick = (item: any) => {
    console.log('Acceso rápido a:', item.path);
  };

  return (
    <div className="min-h-screen p-6">
      {/* Bento Grid Layout */}
      <div className="max-w-7xl mx-auto">
        {/* Grid responsivo estilo bento */}
        <div className="grid grid-cols-12 gap-6 auto-rows-fr">
          
          {/* Fila 1: Estadísticas del Sistema (más compacto) + Reproductor de Música */}
          <div className="col-span-12 md:col-span-8">
            <SystemStatistics stats={mockSystemStats} />
          </div>

          <div className="col-span-12 md:col-span-4">
            <MusicPlayerDashboard />
          </div>

          {/* Fila 2: Carpetas favoritas + Archivos favoritos */}
          <div className="col-span-12 md:col-span-6">
            <FavoriteFolders 
              folders={mockFavoriteFolders} 
              onFolderClick={handleFolderClick}
            />
          </div>
          
          <div className="col-span-12 md:col-span-6">
            <FavoriteFiles 
              files={mockFavoriteFiles} 
              onFileClick={handleFileClick}
            />
          </div>

          {/* Fila 3: Actividad reciente + Accesos rápidos */}
          <div className="col-span-12 md:col-span-8">
            <RecentActivity 
              activities={mockRecentActivity}
              onActivityClick={handleActivityClick}
            />
          </div>

          <div className="col-span-12 md:col-span-4">
            <QuickAccess 
              items={mockQuickAccess}
              onItemClick={handleQuickAccessClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;