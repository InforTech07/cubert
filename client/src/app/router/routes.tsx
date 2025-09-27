import React from 'react';
import type { RouteConfig } from './types';

// Importar páginas
import HomePage from '../../modules/dashboard/presentation/pages/HomePage';
import DashboardWithTopBar from '../../modules/dashboard/presentation/pages/DashboardWithTopBar';
import LoginPage from '../../modules/auth/presentation/pages/LoginPage';
import FileDetailPage from '../../modules/file-management/presentation/pages/FileDetailPage';

// Placeholder para FilesPage (lo crearemos después)
const FilesPage: React.FC = () => {
  return (
    <div className="min-h-screen p-6">
      <div className="futuristic-surface rounded-2xl p-8 text-center futuristic-highlight">
        <h1 className="text-2xl font-light futuristic-text mb-4">Página de Archivos</h1>
        <p className="futuristic-text-secondary">Próximamente...</p>
      </div>
    </div>
  );
};

// Configuración de rutas
export const routes: RouteConfig[] = [
  {
    path: '/',
    component: HomePage, // Usar HomePage normal
    layout: 'main',
    exact: true,
    title: 'Cubert - Dashboard'
  },
  {
    path: '/login',
    component: LoginPage,
    layout: 'auth',
    exact: true,
    title: 'Cubert - Iniciar Sesión'
  },
  {
    path: '/files',
    component: FilesPage,
    layout: 'main',
    exact: true,
    title: 'Cubert - Archivos'
  },
  {
    path: '/files/:id',
    component: FileDetailPage,
    layout: 'main',
    title: 'Cubert - Detalle de Archivo'
  },
  // Ejemplo de rutas anidadas
  {
    path: '/dashboard',
    component: DashboardWithTopBar, // Usar la nueva página con TopBar
    layout: 'main',
    children: [
      {
        path: '/dashboard/analytics',
        component: DashboardWithTopBar, // También aquí
        layout: 'main',
        title: 'Cubert - Analytics'
      },
      {
        path: '/dashboard/settings',
        component: HomePage, // Ahora también usa main layout
        layout: 'main', // Cambiado de 'simple' a 'main'
        title: 'Cubert - Configuración'
      }
    ]
  }
];