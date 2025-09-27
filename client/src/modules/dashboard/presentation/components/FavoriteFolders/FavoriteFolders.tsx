import React from 'react';
import { motion } from 'motion/react';
import { Folder, Calendar } from 'lucide-react';
import type { FavoriteFolder } from '../../../data/mockDashboardData';
import { getRelativeTime } from '../../../data/mockDashboardData';

interface FavoriteFoldersProps {
  folders: FavoriteFolder[];
  onFolderClick?: (folder: FavoriteFolder) => void;
}

const FavoriteFolders: React.FC<FavoriteFoldersProps> = ({ folders, onFolderClick }) => {
  return (
    <div className="bg-transparent border border-white/10 rounded-2xl p-6 h-full">
      <div className="flex items-center justify-between mb-6">\
        <div className="flex items-center">
          <div className="w-10 h-10 futuristic-glass rounded-xl flex items-center justify-center futuristic-highlight mr-3">
            <Folder className="w-5 h-5 futuristic-text" />
          </div>
          <div>
            <h3 className="text-lg font-light futuristic-text">Carpetas Favoritas</h3>
            <p className="text-xs futuristic-text-muted">Acceso rápido</p>
          </div>
        </div>
        <span className="text-xs futuristic-text-muted">{folders.length}</span>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {folders.map((folder, index) => (
          <motion.div
            key={folder.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onFolderClick?.(folder)}
            className="group cursor-pointer"
          >
            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all duration-200">
              <div className="flex items-center flex-1 min-w-0">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center mr-3 flex-shrink-0"
                  style={{ backgroundColor: `${folder.color}20`, border: `1px solid ${folder.color}40` }}
                >
                  <Folder 
                    className="w-4 h-4" 
                    style={{ color: folder.color }} 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm futuristic-text truncate font-medium group-hover:futuristic-text-secondary transition-colors">
                    {folder.name}
                  </h4>
                  <div className="flex items-center text-xs futuristic-text-muted mt-1">
                    <span>{folder.itemCount} elementos</span>
                    <span className="mx-2">•</span>
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{getRelativeTime(folder.lastAccessed)}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {folders.length === 0 && (
        <div className="text-center py-8">
          <Folder className="w-12 h-12 futuristic-text-muted mx-auto mb-3" />
          <p className="futuristic-text-muted text-sm">No hay carpetas favoritas</p>
        </div>
      )}
    </div>
  );
};

export default FavoriteFolders;