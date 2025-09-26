import React from 'react';
import { useParams } from '../../../../app/router';
import { FileText, Download, Share, Eye } from 'lucide-react';

const FileDetailPage: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="futuristic-glass rounded-2xl p-6 futuristic-highlight">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-16 h-16 futuristic-surface rounded-2xl flex items-center justify-center futuristic-highlight mr-6">
                  <FileText className="w-8 h-8 futuristic-text" />
                </div>
                <div>
                  <h1 className="text-3xl font-light futuristic-text mb-2">
                    Archivo #{id}
                  </h1>
                  <p className="futuristic-text-secondary text-lg">
                    documento-importante.pdf
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button className="w-12 h-12 futuristic-glass rounded-xl flex items-center justify-center futuristic-highlight transition-all duration-300 hover:scale-105">
                  <Eye className="w-5 h-5 futuristic-text" />
                </button>
                <button className="w-12 h-12 futuristic-glass rounded-xl flex items-center justify-center futuristic-highlight transition-all duration-300 hover:scale-105">
                  <Download className="w-5 h-5 futuristic-text" />
                </button>
                <button className="w-12 h-12 futuristic-glass rounded-xl flex items-center justify-center futuristic-highlight transition-all duration-300 hover:scale-105">
                  <Share className="w-5 h-5 futuristic-text" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Información del archivo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="futuristic-surface rounded-2xl p-6 futuristic-highlight">
            <h3 className="text-xl font-light futuristic-text mb-4">Información</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="futuristic-text-muted">Tamaño:</span>
                <span className="futuristic-text">2.5 MB</span>
              </div>
              <div className="flex justify-between">
                <span className="futuristic-text-muted">Tipo:</span>
                <span className="futuristic-text">PDF</span>
              </div>
              <div className="flex justify-between">
                <span className="futuristic-text-muted">Creado:</span>
                <span className="futuristic-text">26 Sep 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="futuristic-text-muted">Modificado:</span>
                <span className="futuristic-text">26 Sep 2025</span>
              </div>
            </div>
          </div>

          <div className="futuristic-surface rounded-2xl p-6 futuristic-highlight">
            <h3 className="text-xl font-light futuristic-text mb-4">Permisos</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="futuristic-text-secondary">Lectura</span>
                <div className="w-3 h-3 bg-green-400/60 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="futuristic-text-secondary">Escritura</span>
                <div className="w-3 h-3 bg-green-400/60 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="futuristic-text-secondary">Compartir</span>
                <div className="w-3 h-3 bg-yellow-400/60 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileDetailPage;