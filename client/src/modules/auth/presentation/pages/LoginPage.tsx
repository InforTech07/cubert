import React, { useState } from 'react';
import AuthLayout from '../../../../shared/components/layout/AuthLayout';
import { Lock, User, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { TextShimmer } from '../../../../shared/components/ui/motion-primitives/text-shimmer-basic';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redireccionar al dashboard sin validación por ahora
    window.location.href = '/';
  };

  return (
    <AuthLayout>
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Formulario - Lado Izquierdo */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <div className="max-w-lg">
                {/* Formulario con fondo transparente */}
                <div className="bg-transparent border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                    <div className="mb-6">
                      <TextShimmer className="text-2xl font-light" duration={4}>
                        Accede al sistema
                      </TextShimmer>
                    </div>
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Campo de usuario */}
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 futuristic-text-muted group-focus-within:text-blue-400 transition-colors" />
                      </div>
                      <input
                        type="text"
                        placeholder="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-transparent border border-white/20 rounded-xl futuristic-text placeholder-gray-500 focus:outline-none focus:border-blue-400/60 focus:ring-0 transition-all duration-300"
                      />
                    </div>

                    {/* Campo de contraseña */}
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 futuristic-text-muted group-focus-within:text-blue-400 transition-colors" />
                      </div>
                      <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-transparent border border-white/20 rounded-xl futuristic-text placeholder-gray-500 focus:outline-none focus:border-blue-400/60 focus:ring-0 transition-all duration-300"
                      />
                    </div>

                    {/* Botón de acceso */}
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-2 futuristic-glass futuristic-highlight rounded-xl futuristic-text font-medium text-lg transition-all duration-300 focus:outline-none focus:ring-0 flex items-center justify-center gap-3"
                    >
                      Acceder
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </form>
                </div>
              </div>
            </motion.div>

            {/* Información de la aplicación - Lado Derecho */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="order-1 lg:order-2"
            >
              <div className="text-center lg:text-left space-y-8">

                {/* Información de la aplicación con TextShimmer */}
                <div className="space-y-6">
                  <TextShimmer className="text-3xl lg:text-4xl font-light" duration={4}>
                    Cubert Web
                  </TextShimmer>
                  
                  <div className="space-y-4">
                    <TextShimmer className="text-lg lg:text-xl futuristic-text-secondary block" duration={5}>
                      Gestión inteligente de archivos
                    </TextShimmer>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;