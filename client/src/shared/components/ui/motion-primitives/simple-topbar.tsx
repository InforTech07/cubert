'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { useRouter } from '../../../../app/router/Router';
import SimpleMusicPlayer from '../../common/music-player/SimpleMusicPlayer';

// Componente de Breadcrumbs
const Breadcrumbs: React.FC = () => {
  const { currentPath } = useRouter();

  const getBreadcrumbs = (pathname: string) => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ label: 'Inicio', path: '/' }];

    let currentPath = '';
    segments.forEach((segment) => {
      currentPath += `/${segment}`;
      const label = segment.charAt(0).toUpperCase() + segment.slice(1);
      breadcrumbs.push({ label, path: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs(currentPath);

  return (
    <nav className="flex items-center gap-2 text-sm">
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.path}>
          {index > 0 && <span className="futuristic-text-secondary">/</span>}
          <motion.span
            whileHover={{ scale: 1.05 }}
            className={`cursor-pointer transition-colors ${
              index === breadcrumbs.length - 1
                ? 'futuristic-text font-medium'
                : 'futuristic-text-secondary hover:futuristic-text'
            }`}
          >
            {breadcrumb.label}
          </motion.span>
        </React.Fragment>
      ))}
    </nav>
  );
};

// Componente de Fecha y Hora
const DateTime: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
    });
  };

  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-lg font-mono futuristic-text">
        {formatTime(currentTime)}
      </div>
      <div className="text-xs futuristic-text-secondary">
        {formatDate(currentTime)}
      </div>
    </div>
  );
};

// Componente del Menú Desplegable
const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { 
      icon: User, 
      label: 'Perfil', 
      onClick: () => console.log('Ir a perfil') 
    },
    { 
      icon: Settings, 
      label: 'Configuración', 
      onClick: () => console.log('Ir a configuración') 
    },
    { 
      icon: LogOut, 
      label: 'Cerrar Sesión', 
      onClick: () => console.log('Cerrar sesión'),
      className: 'text-red-400 hover:text-red-300'
    },
  ];

  return (
    <div className="relative z-10">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg futuristic-glass futuristic-highlight hover:bg-white/10 transition-colors"
      >
        <User className="w-4 h-4 futuristic-text" />
        <ChevronDown className={`w-4 h-4 futuristic-text transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />
            
            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-12 z-50 w-48 py-2 rounded-xl border border-white/20 shadow-2xl backdrop-blur-lg"
              style={{
                background: 'rgba(15, 20, 30, 0.95)',
                backdropFilter: 'blur(16px)',
              }}
            >
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={index}
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                    onClick={() => {
                      item.onClick();
                      setIsOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full px-4 py-3 text-sm transition-colors ${
                      item.className || 'futuristic-text hover:futuristic-text-secondary'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </motion.button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// TopBar Principal con elementos fijos
export function SimpleTopBar() {
  return (
    <div className="w-full p-4 relative z-30">
      <div
        className="mx-auto flex items-center justify-between w-full max-w-screen-2xl rounded-2xl px-6 py-3"
        style={{
          height: 60,
          background: 'rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Izquierda - Breadcrumbs */}
        <div className="flex items-center flex-1">
          <Breadcrumbs />
        </div>

        {/* Centro - Fecha y Hora */}
        <div className="flex items-center justify-center">
          <DateTime />
        </div>

        {/* Derecha - Reproductor de Música + Menú de Usuario */}
        <div className="flex items-center gap-4 flex-1 justify-end">
          <SimpleMusicPlayer className="max-w-sm" />
          
          {/* Separador */}
          <div className="w-px h-6 bg-white/20" />
          
          <UserMenu />
        </div>
      </div>
    </div>
  );
}

// Provider simplificado (ya no necesario pero mantenemos compatibilidad)
export function SimpleTopBarProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

// Hook simplificado (mantenemos para compatibilidad)
export function useSimpleTopBar() {
  return {
    sections: [],
    addSection: () => {},
    removeSection: () => {},
  };
}

// Hook simplificado (mantenemos para compatibilidad)
export function useSimpleTopBarSection() {
  // No hace nada ya que ahora es estático
}