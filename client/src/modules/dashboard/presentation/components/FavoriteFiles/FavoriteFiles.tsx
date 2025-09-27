import React from 'react';
import { motion } from 'motion/react';
import { FileText, Image, Video, Music, Code, Database, File, Clock } from 'lucide-react';
import type { FavoriteFile } from '../../../data/mockDashboardData';
import { formatFileSize, getRelativeTime } from '../../../data/mockDashboardData';

interface FavoriteFilesProps {
  files: FavoriteFile[];
  onFileClick?: (file: FavoriteFile) => void;
}

const FavoriteFiles: React.FC<FavoriteFilesProps> = ({ files, onFileClick }) => {
  const getFileIcon = (extension: string) => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      pdf: FileText,
      docx: FileText,
      doc: FileText,
      txt: FileText,
      md: FileText,
      xlsx: FileText,
      xls: FileText,
      jpg: Image,
      jpeg: Image,
      png: Image,
      gif: Image,
      svg: Image,
      mp4: Video,
      avi: Video,
      mkv: Video,
      mp3: Music,
      wav: Music,
      flac: Music,
      js: Code,
      ts: Code,
      tsx: Code,
      jsx: Code,
      html: Code,
      css: Code,
      json: Code,
      sql: Database
    };

    const IconComponent = iconMap[extension.toLowerCase()] || File;
    return <IconComponent className="w-4 h-4" />;
  };

  const getFileColor = (extension: string): string => {
    const colorMap: Record<string, string> = {
      pdf: '#ef4444',
      docx: '#3b82f6',
      doc: '#3b82f6',
      xlsx: '#10b981',
      xls: '#10b981',
      jpg: '#f59e0b',
      jpeg: '#f59e0b',
      png: '#f59e0b',
      gif: '#f59e0b',
      mp4: '#8b5cf6',
      avi: '#8b5cf6',
      mp3: '#06b6d4',
      wav: '#06b6d4',
      js: '#f59e0b',
      ts: '#3b82f6',
      json: '#10b981',
      sql: '#ef4444'
    };
    return colorMap[extension.toLowerCase()] || '#6b7280';
  };

  return (
    <div className="bg-transparent border border-white/10 rounded-2xl p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-10 h-10 futuristic-glass rounded-xl flex items-center justify-center futuristic-highlight mr-3">
            <FileText className="w-5 h-5 futuristic-text" />
          </div>
          <div>
            <h3 className="text-lg font-light futuristic-text">Archivos Favoritos</h3>
            <p className="text-xs futuristic-text-muted">Recientes</p>
          </div>
        </div>
        <span className="text-xs futuristic-text-muted">{files.length}</span>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {files.map((file, index) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onFileClick?.(file)}
            className="group cursor-pointer"
          >
            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all duration-200">
              <div className="flex items-center flex-1 min-w-0">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center mr-3 flex-shrink-0"
                  style={{ 
                    backgroundColor: `${getFileColor(file.extension)}20`, 
                    border: `1px solid ${getFileColor(file.extension)}40`,
                    color: getFileColor(file.extension)
                  }}
                >
                  {getFileIcon(file.extension)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm futuristic-text truncate font-medium group-hover:futuristic-text-secondary transition-colors">
                    {file.name}
                  </h4>
                  <div className="flex items-center text-xs futuristic-text-muted mt-1">
                    <span>{formatFileSize(file.size)}</span>
                    <span className="mx-2">•</span>
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{getRelativeTime(file.lastModified)}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {files.length === 0 && (
        <div className="text-center py-8">
          <FileText className="w-12 h-12 futuristic-text-muted mx-auto mb-3" />
          <p className="futuristic-text-muted text-sm">No hay archivos favoritos</p>
        </div>
      )}
    </div>
  );
};

export default FavoriteFiles;