import React from 'react';
import { useSimpleDateTime, useSimpleLogout, useSimpleBreadcrumb } from '../../../../shared/components/simple-topbar/SimpleTopBarHooks';
import { Package, Activity, Component } from 'lucide-react';

const DashboardWithTopBar: React.FC = () => {
  // Activar herramientas del TopBar usando hooks simples
  useSimpleDateTime();
  
  useSimpleLogout(() => {
    console.log('Cerrando sesión desde el dashboard');
    alert('¡Funciona! Cerrando sesión...');
  });

  useSimpleBreadcrumb([
    { label: 'Dashboard', path: '/' },
    { label: 'Analytics', path: '/dashboard/analytics' },
  ]);

  return (
    <div className="min-h-screen p-6">
      {/* Mensaje de confirmación */}
      <div className="futuristic-glass rounded-2xl p-4 mb-8 text-center">
        <p className="futuristic-text">
          🎉 ¡TopBar activado! Mira la parte superior de la pantalla
        </p>
      </div>

      {/* Header */}
      <header className="mb-8">
        <div className="futuristic-glass rounded-2xl p-6 futuristic-highlight">
          <h1 className="text-4xl font-light futuristic-text mb-2 tracking-wide">
            Cubert Dashboard con TopBar
          </h1>
          <p className="futuristic-text-secondary text-lg font-light">
            Sistema de archivos futurista con TopBar dinámico
          </p>
        </div>
      </header>

      {/* Información del TopBar */}
      <div className="futuristic-surface rounded-2xl p-6 mb-8">
        <h2 className="text-2xl font-semibold futuristic-text mb-4">
          Herramientas Activas en el TopBar
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="futuristic-glass rounded-lg p-4">
            <h3 className="futuristic-text font-medium mb-2">📅 Fecha y Hora</h3>
            <p className="futuristic-text-secondary text-sm">
              Se actualiza en tiempo real en el centro del TopBar
            </p>
          </div>
          <div className="futuristic-glass rounded-lg p-4">
            <h3 className="futuristic-text font-medium mb-2">🏠 Breadcrumb</h3>
            <p className="futuristic-text-secondary text-sm">
              Navegación de rutas en la izquierda del TopBar
            </p>
          </div>
          <div className="futuristic-glass rounded-lg p-4">
            <h3 className="futuristic-text font-medium mb-2">🚪 Logout</h3>
            <p className="futuristic-text-secondary text-sm">
              Botón de cierre de sesión en la derecha del TopBar
            </p>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="futuristic-surface rounded-2xl p-6 futuristic-highlight">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 futuristic-glass rounded-xl flex items-center justify-center futuristic-highlight mr-4">
              <Package className="w-6 h-6 futuristic-text" />
            </div>
            <div>
              <h3 className="text-xl font-light futuristic-text">Archivos</h3>
              <p className="futuristic-text-muted text-sm">Gestión de archivos</p>
            </div>
          </div>
          <p className="futuristic-text-secondary">
            Explora y gestiona todos tus archivos en un entorno futurista.
          </p>
        </div>

        <div className="futuristic-surface rounded-2xl p-6 futuristic-highlight">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 futuristic-glass rounded-xl flex items-center justify-center futuristic-highlight mr-4">
              <Activity className="w-6 h-6 futuristic-text" />
            </div>
            <div>
              <h3 className="text-xl font-light futuristic-text">Actividad</h3>
              <p className="futuristic-text-muted text-sm">Registro de acciones</p>
            </div>
          </div>
          <p className="futuristic-text-secondary">
            Monitorea la actividad reciente en tu sistema.
          </p>
        </div>

        <div className="futuristic-surface rounded-2xl p-6 futuristic-highlight">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 futuristic-glass rounded-xl flex items-center justify-center futuristic-highlight mr-4">
              <Component className="w-6 h-6 futuristic-text" />
            </div>
            <div>
              <h3 className="text-xl font-light futuristic-text">Componentes</h3>
              <p className="futuristic-text-muted text-sm">Elementos del sistema</p>
            </div>
          </div>
          <p className="futuristic-text-secondary">
            Accede a los componentes principales del sistema.
          </p>
        </div>
      </main>
    </div>
  );
};

export default DashboardWithTopBar;