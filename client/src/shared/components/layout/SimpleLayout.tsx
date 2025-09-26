import React from 'react';

interface SimpleLayoutProps {
  children?: React.ReactNode;
}

const SimpleLayout: React.FC<SimpleLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden" style={{ background: 'var(--futuristic-bg)' }}>
      {/* Fondo futurista básico (sin gradientes complejos) */}
      <div className="absolute inset-0 z-0">
        {/* Solo un gradiente sutil */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 to-purple-500/2"></div>
        
        {/* Grid más simple */}
        <div className="absolute inset-0 opacity-[0.01]">
          <div className="h-full w-full" style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}></div>
        </div>
      </div>

      {/* Contenido principal - más limpio y minimalista */}
      <div className="relative z-10 min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default SimpleLayout;