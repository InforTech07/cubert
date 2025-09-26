import React from 'react';
import { Package, Activity, Component } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <header className="mb-8">
        <div className="futuristic-glass rounded-2xl p-6 futuristic-highlight">
          <h1 className="text-4xl font-light futuristic-text mb-2 tracking-wide">
            Cubert Dashboard
          </h1>
          <p className="futuristic-text-secondary text-lg font-light">
            Sistema de archivos futurista
          </p>
        </div>
      </header>

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

export default HomePage;