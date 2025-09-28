import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface TransitionConfig {
  type?: 'fade' | 'slide' | 'scale' | 'blur' | 'matrix';
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  stagger?: boolean;
}

interface RouteTransitionProps {
  children: React.ReactNode;
  routeKey: string;
  transition?: TransitionConfig;
}

// Variantes de animación predefinidas
const transitionVariants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  
  slide: (direction: string) => ({
    initial: {
      opacity: 0,
      x: direction === 'left' ? -50 : direction === 'right' ? 50 : 0,
      y: direction === 'up' ? -50 : direction === 'down' ? 50 : 0
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0
    },
    exit: {
      opacity: 0,
      x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0,
      y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0
    }
  }),
  
  scale: {
    initial: { 
      opacity: 0, 
      scale: 0.95,
      filter: 'blur(2px)'
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      filter: 'blur(0px)'
    },
    exit: { 
      opacity: 0, 
      scale: 1.05,
      filter: 'blur(2px)'
    }
  },
  
  blur: {
    initial: {
      opacity: 0,
      filter: 'blur(8px)',
      scale: 0.98
    },
    animate: {
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1
    },
    exit: {
      opacity: 0,
      filter: 'blur(8px)',
      scale: 1.02
    }
  },
  
  matrix: {
    initial: {
      opacity: 0,
      rotateX: -10,
      y: 20,
      filter: 'brightness(0.8) blur(1px)'
    },
    animate: {
      opacity: 1,
      rotateX: 0,
      y: 0,
      filter: 'brightness(1) blur(0px)'
    },
    exit: {
      opacity: 0,
      rotateX: 10,
      y: -20,
      filter: 'brightness(1.2) blur(1px)'
    }
  }
};

const RouteTransition: React.FC<RouteTransitionProps> = ({ 
  children, 
  routeKey, 
  transition = { type: 'matrix', duration: 0.4, direction: 'up' }
}) => {
  const { type = 'matrix', duration = 0.4, direction = 'up', stagger = false } = transition;
  
  // Seleccionar las variantes apropiadas
  let variants;
  if (type === 'slide') {
    variants = transitionVariants.slide(direction);
  } else {
    variants = transitionVariants[type] || transitionVariants.matrix;
  }

  // Configuración de transición
  const transitionConfig = {
    duration,
    ease: [0.22, 1, 0.36, 1] as const, // Curva de easing suave
    layout: true
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={routeKey}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={transitionConfig}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformOrigin: 'center center',
          transformStyle: 'preserve-3d'
        }}
        className="route-transition-container"
      >
        {stagger ? (
          <motion.div
            variants={{
              animate: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.1
                }
              }
            }}
            initial="initial"
            animate="animate"
            className="w-full h-full"
          >
            {children}
          </motion.div>
        ) : (
          children
        )}
      </motion.div>
    </AnimatePresence>
  );
};

// Componente para elementos que aparecen con stagger
export const StaggerChild: React.FC<{ children: React.ReactNode; delay?: number }> = ({ 
  children, 
  delay = 0 
}) => (
  <motion.div
    variants={{
      initial: { opacity: 0, y: 20 },
      animate: { 
        opacity: 1, 
        y: 0,
        transition: { delay }
      }
    }}
  >
    {children}
  </motion.div>
);

// Hook para transiciones personalizadas por página
export const usePageTransition = (config?: TransitionConfig) => {
  const defaultConfig: TransitionConfig = {
    type: 'matrix',
    duration: 0.4,
    direction: 'up'
  };

  return { ...defaultConfig, ...config };
};

export default RouteTransition;