import React from 'react';
import { motion } from 'motion/react';
import { MusicPlayerProvider } from '../../contexts/MusicPlayerContext';

interface AuthLayoutProps {
  children?: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  // Generar partículas con propiedades aleatorias
  const generateParticles = () => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.6 + 0.2
    }));
  };

  const particles = generateParticles();

  return (
    <MusicPlayerProvider>
      <div className="min-h-screen w-full relative overflow-hidden" style={{ background: 'var(--futuristic-bg)' }}>
        {/* Fondo futurista con patrón sutil */}
        <div className="absolute inset-0 z-0 futuristic-pattern">
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

          {/* Partículas animadas */}
          <div className="absolute inset-0 overflow-hidden">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30"
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  filter: 'blur(1px)'
                }}
                animate={{
                  x: [0, 50, -30, 0],
                  y: [0, -30, 20, 0],
                  opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity * 0.5, particle.opacity],
                  scale: [1, 1.2, 0.8, 1]
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Líneas conectoras animadas */}
          <div className="absolute inset-0 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={`line-${i}`}
                className="absolute bg-gradient-to-r from-transparent via-blue-400/10 to-transparent"
                style={{
                  width: '200px',
                  height: '1px',
                  left: `${20 + i * 25}%`,
                  top: `${30 + i * 20}%`,
                  transformOrigin: 'center'
                }}
                animate={{
                  rotate: [0, 360],
                  opacity: [0.1, 0.3, 0.1],
                  scaleX: [0.5, 1.5, 0.5]
                }}
                transition={{
                  duration: 15 + i * 3,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 2
                }}
              />
            ))}
          </div>

          {/* Partículas grandes flotantes */}
          <div className="absolute inset-0 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={`large-particle-${i}`}
                className="absolute rounded-full"
                style={{
                  width: `${15 + i * 5}px`,
                  height: `${15 + i * 5}px`,
                  left: `${Math.random() * 80 + 10}%`,
                  top: `${Math.random() * 80 + 10}%`,
                  background: `radial-gradient(circle, ${
                    i % 2 === 0 
                      ? 'rgba(59, 130, 246, 0.1)' 
                      : 'rgba(147, 51, 234, 0.1)'
                  }, transparent)`,
                  filter: 'blur(2px)'
                }}
                animate={{
                  x: [0, 100, -50, 0],
                  y: [0, -80, 60, 0],
                  rotate: [0, 180, 360],
                  opacity: [0.2, 0.6, 0.2],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 25 + i * 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 3
                }}
              />
            ))}
          </div>

          {/* Ondas sutiles */}
          <div className="absolute inset-0 overflow-hidden">
            {[1, 2].map((i) => (
              <motion.div
                key={`wave-${i}`}
                className="absolute border border-blue-400/5 rounded-full"
                style={{
                  width: '300px',
                  height: '300px',
                  left: `${30 + i * 40}%`,
                  top: `${20 + i * 30}%`,
                  transformOrigin: 'center'
                }}
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.1, 0.2, 0.1],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 20 + i * 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 4
                }}
              />
            ))}
          </div>
        </div>

        {/* Contenido principal */}
        <div className="relative z-5 min-h-screen flex flex-col">
          {/* Área de contenido - aquí se renderizará el children */}
          <main className="flex-1 w-full">
            {children}
          </main>
        </div>
      </div>
    </MusicPlayerProvider>
  );
};

export default AuthLayout;