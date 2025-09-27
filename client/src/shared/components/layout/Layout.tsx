import React from 'react';
import {
  Activity,
  Component,
  HomeIcon,
  Mail,
  Package,
  ScrollText,
  SunMoon,
} from 'lucide-react';
import { Dock, DockIcon, DockItem, DockLabel } from '../ui/motion-primitives/dock';
import { SimpleTopBar, SimpleTopBarProvider } from '../ui/motion-primitives/simple-topbar';

const dockData = [
  {
    title: 'Home',
    icon: (
      <HomeIcon className='h-full w-full futuristic-text transition-colors duration-300 hover:text-white' />
    ),
    href: '/',
  },
  {
    title: 'Files',
    icon: (
      <Package className='h-full w-full futuristic-text transition-colors duration-300 hover:text-white' />
    ),
    href: '/files',
  },
  {
    title: 'Components',
    icon: (
      <Component className='h-full w-full futuristic-text transition-colors duration-300 hover:text-white' />
    ),
    href: '/dashboard/settings',
  },
  {
    title: 'Activity',
    icon: (
      <Activity className='h-full w-full futuristic-text transition-colors duration-300 hover:text-white' />
    ),
    href: '/dashboard/analytics',
  },
  {
    title: 'Login',
    icon: (
      <ScrollText className='h-full w-full futuristic-text transition-colors duration-300 hover:text-white' />
    ),
    href: '/login',
  },
  {
    title: 'Email',
    icon: (
      <Mail className='h-full w-full futuristic-text transition-colors duration-300 hover:text-white' />
    ),
    href: '#',
  },
  {
    title: 'Theme',
    icon: (
      <SunMoon className='h-full w-full futuristic-text transition-colors duration-300 hover:text-white' />
    ),
    href: '#',
  },
];

interface LayoutProps {
  children?: React.ReactNode;
  // Removido showDock - ahora el layout principal siempre muestra TopBar y Dock
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SimpleTopBarProvider>
      <div className="min-h-screen w-full relative overflow-hidden" style={{ background: 'var(--futuristic-bg)' }}>
        {/* TopBar - siempre visible en layout principal */}
        <SimpleTopBar />
        
        {/* Fondo futurista con patrón sutil */}
        <div className="absolute inset-0 z-0 futuristic-pattern">
          {/* Gradientes ambientales sutiles */}
          {/* <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-full blur-3xl futuristic-pulse"></div> */}
          {/* <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/3 to-blue-500/3 rounded-full blur-3xl futuristic-pulse" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-cyan-500/4 to-teal-500/4 rounded-full blur-3xl futuristic-pulse" style={{ animationDelay: '3s' }}></div> */}
          
          {/* Grid sutil */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div className="h-full w-full" style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}></div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="relative z-10 min-h-screen flex flex-col" style={{ paddingTop: '80px', paddingBottom: '120px' }}>
          {/* Área de contenido - aquí se renderizará el children */}
          <main className="flex-1 w-full">
            {children}
          </main>
        </div>

        {/* Dock futurista fijo - siempre visible en layout principal */}
        <div className='fixed bottom-6 left-1/2 max-w-full -translate-x-1/2 z-50'>
          <Dock className='items-end pb-3'>
            {dockData.map((item, idx) => (
              <DockItem
                key={idx}
                className='aspect-square rounded-xl futuristic-glass futuristic-highlight cursor-pointer'
                onClick={() => {
                  if (item.href !== '#') {
                    window.history.pushState(null, '', item.href);
                    window.dispatchEvent(new Event('popstate'));
                  }
                }}
              >
                <DockLabel className="futuristic-text-secondary futuristic-glass rounded-lg px-3 py-1.5 text-sm font-light">
                  {item.title}
                </DockLabel>
                <DockIcon>{item.icon}</DockIcon>
              </DockItem>
            ))}
          </Dock>
        </div>
      </div>
    </SimpleTopBarProvider>
  );
};

export default Layout;