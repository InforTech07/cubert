import React from 'react';

// Definir los tipos de layouts disponibles
export type LayoutType = 'main' | 'simple' | 'auth';

// Configuración de ruta
export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  layout?: LayoutType;
  children?: RouteConfig[];
  exact?: boolean;
  title?: string;
}

// Props del componente de ruta
export interface RouteProps {
  path: string;
  component: React.ComponentType;
  layout?: LayoutType;
  exact?: boolean;
}