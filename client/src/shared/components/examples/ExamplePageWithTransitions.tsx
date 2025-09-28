import React from 'react';
import { motion } from 'motion/react';
import { useRouteTransition } from '../../../app/router/Router';
import { StaggerChild } from '../../../app/router/RouteTransition';

// Ejemplo de página que usa transiciones personalizadas
const ExamplePageWithTransitions: React.FC = () => {
  const { setTransition, resetTransition } = useRouteTransition();

  // Configurar una transición específica para esta página
  React.useEffect(() => {
    setTransition({
      type: 'blur',
      duration: 0.6,
      direction: 'up'
    });

    // Resetear al salir
    return () => resetTransition();
  }, [setTransition, resetTransition]);

  return (
    <div className="min-h-screen p-8 futuristic-pattern">
      {/* Contenedor principal con efecto de cristal */}
      <motion.div 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Header con stagger */}
        <div className="mb-12">
          <StaggerChild delay={0.1}>
            <motion.h1 
              className="text-4xl font-light futuristic-text mb-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Ejemplo de Transiciones
            </motion.h1>
          </StaggerChild>
          
          <StaggerChild delay={0.2}>
            <p className="futuristic-text-secondary text-lg">
              Esta página demuestra diferentes tipos de transiciones de ruta.
            </p>
          </StaggerChild>
        </div>

        {/* Cards con diferentes efectos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <StaggerChild key={item} delay={0.1 * (index + 3)}>
              <motion.div
                className="futuristic-surface rounded-2xl p-6 futuristic-highlight transition-gpu-accelerated"
                whileHover={{ 
                  y: -8,
                  boxShadow: "0 16px 64px rgba(100, 120, 150, 0.2)",
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className="flex items-center justify-center h-24 mb-4">
                  <div className="w-12 h-12 rounded-full futuristic-glass border-2 border-futuristic-accent" />
                </div>
                <h3 className="futuristic-text font-medium mb-2">Card {item}</h3>
                <p className="futuristic-text-secondary text-sm">
                  Contenido de ejemplo con transiciones suaves.
                </p>
              </motion.div>
            </StaggerChild>
          ))}
        </div>

        {/* Botones para cambiar tipos de transición */}
        <StaggerChild delay={0.8}>
          <div className="mt-12 flex flex-wrap gap-4 justify-center">
            {[
              { type: 'fade', label: 'Fade' },
              { type: 'slide', label: 'Slide' },
              { type: 'scale', label: 'Scale' },
              { type: 'blur', label: 'Blur' },
              { type: 'matrix', label: 'Matrix' }
            ].map(({ type, label }) => (
              <motion.button
                key={type}
                onClick={() => setTransition({ 
                  type: type as any, 
                  duration: 0.5, 
                  direction: 'up' 
                })}
                className="px-6 py-2 futuristic-surface rounded-full futuristic-border futuristic-text hover:futuristic-border-hover transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {label}
              </motion.button>
            ))}
          </div>
        </StaggerChild>

        {/* Elementos flotantes decorativos */}
        <motion.div
          className="fixed top-1/4 right-10 w-2 h-2 rounded-full bg-futuristic-accent opacity-30"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="fixed bottom-1/3 left-10 w-1 h-1 rounded-full bg-futuristic-accent-light opacity-40"
          animate={{
            x: [0, 15, 0],
            y: [0, -10, 0],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </motion.div>
    </div>
  );
};

export default ExamplePageWithTransitions;