import React from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  Download, 
  FileText, 
  Image, 
  Music, 
  Video, 
  Share2,
  Folder,
  ChevronRight
} from 'lucide-react';
import type { QuickAccess } from '../../../data/mockDashboardData';

interface QuickAccessProps {
  items: QuickAccess[];
  onItemClick?: (item: QuickAccess) => void;
}

const QuickAccessComponent: React.FC<QuickAccessProps> = ({ items, onItemClick }) => {
  const getIcon = (iconName: string) => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      download: Download,
      'file-text': FileText,
      image: Image,
      music: Music,
      video: Video,
      'share-2': Share2,
      folder: Folder
    };
    return iconMap[iconName] || Folder;
  };

  return (
    <div className="bg-transparent border border-white/10 rounded-2xl p-6 h-full">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 futuristic-glass rounded-xl flex items-center justify-center futuristic-highlight mr-3">
          <Zap className="w-5 h-5 futuristic-text" />
        </div>
        <div>
          <h3 className="text-lg font-light futuristic-text">Accesos Rápidos</h3>
          <p className="text-xs futuristic-text-muted">Carpetas frecuentes</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {items.map((item, index) => {
          const Icon = getIcon(item.icon);
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onItemClick?.(item)}
              className="group cursor-pointer"
            >
              <div className="relative p-4 rounded-xl futuristic-glass futuristic-highlight hover:bg-white/5 transition-all duration-300 group-hover:scale-105">
                <div className="flex flex-col items-center text-center">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300"
                    style={{ 
                      backgroundColor: `${item.color}20`, 
                      border: `1px solid ${item.color}40` 
                    }}
                  >
                    <Icon 
                      className="w-6 h-6" 
                      style={{ color: item.color }} 
                    />
                  </div>
                  
                  <h4 className="text-sm futuristic-text font-medium mb-1 group-hover:futuristic-text-secondary transition-colors">
                    {item.name}
                  </h4>
                  
                  <p className="text-xs futuristic-text-muted truncate max-w-full">
                    {item.path}
                  </p>
                </div>

                {/* Icono de navegación */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <ChevronRight className="w-4 h-4 futuristic-text-muted" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {items.length === 0 && (
        <div className="text-center py-8">
          <Zap className="w-12 h-12 futuristic-text-muted mx-auto mb-3" />
          <p className="futuristic-text-muted text-sm">No hay accesos configurados</p>
        </div>
      )}
    </div>
  );
};

export default QuickAccessComponent;