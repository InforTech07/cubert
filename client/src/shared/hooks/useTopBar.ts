'use client';

import { useEffect, useRef } from 'react';
import { useTopBar, type TopBarSection } from '../components/ui/motion-primitives/topbar';

export type UseTopBarSectionOptions = {
  id: string;
  position: 'left' | 'center' | 'right';
  priority: number;
  enabled?: boolean;
};

/**
 * Hook para gestionar fácilmente secciones del TopBar
 * Se encarga del ciclo de vida automático (mount/unmount)
 */
export function useTopBarSection(
  component: React.ReactNode,
  options: UseTopBarSectionOptions
) {
  const { addSection, removeSection, updateSection } = useTopBar();
  const prevEnabledRef = useRef<boolean>(options.enabled ?? true);

  useEffect(() => {
    const { id, position, priority, enabled = true } = options;

    if (enabled) {
      const section: TopBarSection = {
        id,
        component,
        position,
        priority,
      };
      addSection(section);
    } else if (prevEnabledRef.current) {
      // Solo remover si previamente estaba habilitado
      removeSection(id);
    }

    prevEnabledRef.current = enabled;

    // Cleanup al desmontar
    return () => {
      removeSection(id);
    };
  }, [options.id, options.position, options.priority, options.enabled, addSection, removeSection]); // Removido 'component' de las dependencias

  // Función para actualizar la sección
  const updateSectionData = (updates: Partial<TopBarSection>) => {
    updateSection(options.id, updates);
  };

  return {
    updateSection: updateSectionData,
    removeSection: () => removeSection(options.id),
  };
}

/**
 * Hook para detectar si el dock está visible
 * Útil para mostrar/ocultar el TopBar condicionalmente
 */
export function useDockVisibility() {
  // En este caso, asumimos que el dock siempre está visible en el layout principal
  // Pero esto se puede extender para detectar dinámicamente la visibilidad
  return true;
}

/**
 * Hook combinado que maneja automáticamente la visibilidad del TopBar
 * basada en la presencia del dock
 */
export function useTopBarWithDock(
  component: React.ReactNode,
  options: Omit<UseTopBarSectionOptions, 'enabled'>
) {
  const isDockVisible = useDockVisibility();
  
  return useTopBarSection(component, {
    ...options,
    enabled: isDockVisible,
  });
}