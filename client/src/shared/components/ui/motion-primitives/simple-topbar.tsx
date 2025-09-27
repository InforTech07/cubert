'use client';

import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import SimpleMusicPlayer from '../../common/music-player/SimpleMusicPlayer';

// Types simplificados
export type SimpleTopBarSection = {
  id: string;
  component: React.ReactNode;
  position: 'left' | 'center' | 'right';
  priority: number;
};

export type SimpleTopBarContextType = {
  sections: SimpleTopBarSection[];
  addSection: (section: SimpleTopBarSection) => void;
  removeSection: (id: string) => void;
};

// Context simplificado
const SimpleTopBarContext = createContext<SimpleTopBarContextType | undefined>(undefined);

// Provider simplificado
export function SimpleTopBarProvider({ children }: { children: React.ReactNode }) {
  const [sections, setSections] = useState<SimpleTopBarSection[]>([]);

  const addSection = useCallback((section: SimpleTopBarSection) => {
    setSections((prev) => {
      // Remover section existente con el mismo id
      const filtered = prev.filter(s => s.id !== section.id);
      // Agregar nueva section y ordenar por prioridad
      return [...filtered, section].sort((a, b) => a.priority - b.priority);
    });
  }, []);

  const removeSection = useCallback((id: string) => {
    setSections(prev => prev.filter(s => s.id !== id));
  }, []);

  const value = useMemo(() => ({
    sections,
    addSection,
    removeSection,
  }), [sections, addSection, removeSection]);

  return (
    <SimpleTopBarContext.Provider value={value}>
      {children}
    </SimpleTopBarContext.Provider>
  );
}

// Hook simplificado
export function useSimpleTopBar() {
  const context = useContext(SimpleTopBarContext);
  if (!context) {
    throw new Error('useSimpleTopBar must be used within a SimpleTopBarProvider');
  }
  return context;
}

// TopBar component simplificado con reproductor de música fijo
export function SimpleTopBar() {
  const { sections } = useSimpleTopBar();

  // Organizar sections por posición (sin incluir el reproductor que va fijo)
  const leftSections = sections.filter(s => s.position === 'left');
  const centerSections = sections.filter(s => s.position === 'center');
  const rightSections = sections.filter(s => s.position === 'right');

  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-4">
      <div
        className="mx-auto flex items-center justify-between w-full max-w-screen-2xl rounded-2xl px-6 py-3"
        style={{
          height: 60,
          background: 'var(--futuristic-glass)',
          border: '1px solid var(--futuristic-glass-border)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Left - Solo secciones dinámicas */}
        <div className="flex items-center gap-4 flex-1">
          {leftSections.map((section) => (
            <div key={section.id}>{section.component}</div>
          ))}
        </div>

        {/* Center */}
        <div className="flex items-center gap-4">
          {centerSections.map((section) => (
            <div key={section.id}>{section.component}</div>
          ))}
        </div>

        {/* Right - Reproductor de música FIJO + secciones dinámicas */}
        <div className="flex items-center gap-4 flex-1 justify-end">
          {/* Secciones dinámicas del lado derecho primero */}
          {rightSections.map((section) => (
            <div key={section.id}>{section.component}</div>
          ))}
          
          {/* Separador si hay secciones adicionales */}
          {rightSections.length > 0 && (
            <div className="w-px h-6 bg-white/20 mx-2" />
          )}
          
          {/* Reproductor de música siempre fijo al final (lado derecho) */}
          <SimpleMusicPlayer className="max-w-sm" />
        </div>
      </div>
    </div>
  );
}

// Hook de uso simplificado
export function useSimpleTopBarSection(
  id: string,
  component: React.ReactNode,
  position: 'left' | 'center' | 'right',
  priority: number = 1
) {
  const { addSection, removeSection } = useSimpleTopBar();

  // Usar useCallback para evitar recrear la función en cada render
  const stableAddSection = useCallback(() => {
    addSection({ id, component, position, priority });
  }, [id, position, priority, addSection]);

  // Agregar section al montar, remover al desmontar
  useEffect(() => {
    stableAddSection();
    return () => removeSection(id);
  }, [stableAddSection, removeSection, id]);
}