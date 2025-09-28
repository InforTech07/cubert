import React, { useState, useEffect, createContext, useContext } from 'react';
import type { RouteConfig } from './types';
import type { TransitionConfig } from './RouteTransition';
import LayoutWrapper from './LayoutWrapper';
import RouteTransition from './RouteTransition';

// Context para el router
interface RouterContextType {
  currentPath: string;
  navigate: (path: string) => void;
  params: Record<string, string>;
  transitionConfig?: TransitionConfig;
  setTransitionConfig: (config: TransitionConfig) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

// Hook para usar el router
export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a Router');
  }
  return context;
};

// Hook para navigation
export const useNavigate = () => {
  const { navigate } = useRouter();
  return navigate;
};

// Hook para obtener parámetros de ruta
export const useParams = () => {
  const { params } = useRouter();
  return params;
};

// Hook para controlar transiciones
export const useRouteTransition = () => {
  const { transitionConfig, setTransitionConfig } = useRouter();
  
  const setTransition = (config: TransitionConfig) => {
    setTransitionConfig(config);
  };
  
  const resetTransition = () => {
    setTransitionConfig({ type: 'matrix', duration: 0.4, direction: 'up' });
  };
  
  return {
    currentTransition: transitionConfig,
    setTransition,
    resetTransition
  };
};

// Función para extraer parámetros de la ruta
const extractParams = (routePath: string, currentPath: string): Record<string, string> => {
  const routeSegments = routePath.split('/').filter(Boolean);
  const pathSegments = currentPath.split('/').filter(Boolean);
  const params: Record<string, string> = {};

  routeSegments.forEach((segment, index) => {
    if (segment.startsWith(':')) {
      const paramName = segment.slice(1);
      params[paramName] = pathSegments[index] || '';
    }
  });

  return params;
};

// Función para verificar si una ruta coincide
const matchRoute = (routePath: string, currentPath: string, exact = false): boolean => {
  if (exact) {
    return routePath === currentPath;
  }

  const routeSegments = routePath.split('/').filter(Boolean);
  const pathSegments = currentPath.split('/').filter(Boolean);

  if (routeSegments.length > pathSegments.length) {
    return false;
  }

  return routeSegments.every((segment, index) => {
    if (segment.startsWith(':')) {
      return true; // Parámetro dinámico
    }
    return segment === pathSegments[index];
  });
};

// Función para encontrar la ruta coincidente
const findMatchingRoute = (routes: RouteConfig[], currentPath: string): RouteConfig | null => {
  for (const route of routes) {
    if (matchRoute(route.path, currentPath, route.exact)) {
      return route;
    }

    // Buscar en rutas hijas
    if (route.children) {
      const childRoute = findMatchingRoute(route.children, currentPath);
      if (childRoute) {
        return { ...childRoute, layout: childRoute.layout || route.layout };
      }
    }
  }
  return null;
};

interface RouterProps {
  routes: RouteConfig[];
  defaultTransition?: TransitionConfig;
}

const Router: React.FC<RouterProps> = ({ routes, defaultTransition }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [params, setParams] = useState<Record<string, string>>({});
  const [transitionConfig, setTransitionConfig] = useState<TransitionConfig | undefined>(
    defaultTransition || { type: 'matrix', duration: 0.4, direction: 'up' }
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState(null, '', path);
    setCurrentPath(path);
  };

  // Encontrar la ruta coincidente
  const matchedRoute = findMatchingRoute(routes, currentPath);

  useEffect(() => {
    if (matchedRoute) {
      const extractedParams = extractParams(matchedRoute.path, currentPath);
      setParams(extractedParams);

      // Actualizar el título de la página si está definido
      if (matchedRoute.title) {
        document.title = matchedRoute.title;
      }
    }
  }, [currentPath, matchedRoute]);

  const routerValue: RouterContextType = {
    currentPath,
    navigate,
    params,
    transitionConfig,
    setTransitionConfig,
  };

  return (
    <RouterContext.Provider value={routerValue}>
      {matchedRoute ? (
        <LayoutWrapper layout={matchedRoute.layout}>
          <RouteTransition 
            routeKey={currentPath} 
            transition={transitionConfig}
          >
            <matchedRoute.component />
          </RouteTransition>
        </LayoutWrapper>
      ) : (
        <LayoutWrapper layout="main">
          <RouteTransition 
            routeKey="404" 
            transition={transitionConfig}
          >
            <div className="min-h-screen flex items-center justify-center">
              <div className="futuristic-surface rounded-3xl p-8 text-center futuristic-highlight">
                <h1 className="text-2xl font-light futuristic-text mb-4">404</h1>
                <p className="futuristic-text-secondary">Página no encontrada</p>
              </div>
            </div>
          </RouteTransition>
        </LayoutWrapper>
      )}
    </RouterContext.Provider>
  );
};

export default Router;