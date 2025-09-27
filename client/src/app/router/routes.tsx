import type { RouteConfig } from './types';

// Importar páginas
import HomePage from '../../modules/dashboard/presentation/pages/HomePage';
import LoginPage from '../../modules/auth/presentation/pages/LoginPage';
import FilesPage from '../../modules/file-management/presentation/pages/FilesPage';
import FileDetailPage from '../../modules/file-management/presentation/pages/FileDetailPage';

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
    component: HomePage, // Usar HomePage normal
    layout: 'main',
    children: [
      {
        path: '/dashboard/analytics',
        component: HomePage, // Usar HomePage normal
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