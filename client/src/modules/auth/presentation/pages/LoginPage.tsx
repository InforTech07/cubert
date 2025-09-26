import React from 'react';
import Layout from '../../../../shared/components/layout/Layout';
import { Mail, Lock, User } from 'lucide-react';

const LoginPage: React.FC = () => {
  return (
    <Layout showDock={false}>
      {/* Contenido centrado para la página de login */}
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="futuristic-surface rounded-3xl p-8 max-w-md w-full futuristic-highlight">
          <div className="text-center space-y-6">
            {/* Logo o ícono */}
            <div className="w-16 h-16 mx-auto futuristic-glass rounded-2xl flex items-center justify-center futuristic-highlight">
              <User className="w-8 h-8 futuristic-text" />
            </div>
            
            {/* Título */}
            <div>
              <h1 className="text-3xl font-light futuristic-text mb-2 tracking-wide">
                Bienvenido
              </h1>
              <p className="futuristic-text-secondary text-lg font-light">
                Accede a Cubert
              </p>
            </div>

            {/* Formulario de login */}
            <form className="space-y-4 mt-8">
              {/* Campo de email */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 futuristic-text-muted" />
                </div>
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  className="w-full pl-10 pr-4 py-3 futuristic-glass futuristic-highlight rounded-xl futuristic-text placeholder-gray-400 border-0 focus:outline-none focus:ring-0 bg-transparent"
                />
              </div>

              {/* Campo de contraseña */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 futuristic-text-muted" />
                </div>
                <input
                  type="password"
                  placeholder="Contraseña"
                  className="w-full pl-10 pr-4 py-3 futuristic-glass futuristic-highlight rounded-xl futuristic-text placeholder-gray-400 border-0 focus:outline-none focus:ring-0 bg-transparent"
                />
              </div>

              {/* Botón de login */}
              <button
                type="submit"
                className="w-full py-3 futuristic-surface futuristic-highlight rounded-xl futuristic-text font-light text-lg transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-0"
              >
                Iniciar Sesión
              </button>
            </form>

            {/* Enlaces adicionales */}
            <div className="text-center space-y-2 mt-6">
              <a href="#" className="futuristic-text-muted hover:futuristic-text-secondary transition-colors duration-300 text-sm">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;