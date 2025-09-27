import React from 'react';
import { motion } from 'motion/react';
import { BarChart3, HardDrive, Users, Shield } from 'lucide-react';
import type { SystemStats } from '../../../data/mockDashboardData';
import { formatFileSize, getRelativeTime } from '../../../data/mockDashboardData';

interface SystemStatisticsProps {
  stats: SystemStats;
}

const SystemStatistics: React.FC<SystemStatisticsProps> = ({ stats }) => {
  const usedSpacePercentage = ((stats.totalSize) / (stats.totalSize + stats.availableSpace)) * 100;
  
  const statItems = [
    {
      icon: HardDrive,
      label: 'Almacenamiento',
      value: formatFileSize(stats.totalSize),
      detail: `${usedSpacePercentage.toFixed(1)}% usado`,
      color: '#3b82f6'
    },
    {
      icon: BarChart3,
      label: 'Archivos',
      value: stats.totalFiles.toLocaleString(),
      detail: `${stats.totalFolders} carpetas`,
      color: '#10b981'
    },
    {
      icon: Users,
      label: 'Usuarios Activos',
      value: stats.activeUsers.toString(),
      detail: 'En línea',
      color: '#f59e0b'
    },
    {
      icon: Shield,
      label: 'Último Backup',
      value: getRelativeTime(stats.lastBackup),
      detail: stats.lastBackup.toLocaleDateString('es-ES'),
      color: '#8b5cf6'
    }
  ];

  return (
    <div className="bg-transparent border border-white/10 rounded-2xl p-4 h-full">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 futuristic-glass rounded-xl flex items-center justify-center futuristic-highlight mr-3">
          <BarChart3 className="w-4 h-4 futuristic-text" />
        </div>
        <div>
          <h3 className="text-base font-light futuristic-text">Estadísticas del Sistema</h3>
          <p className="text-xs futuristic-text-muted">Estado actual</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {statItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="p-3 rounded-xl futuristic-glass futuristic-highlight hover:bg-white/5 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <div 
                  className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ 
                    backgroundColor: `${item.color}20`, 
                    border: `1px solid ${item.color}40` 
                  }}
                >
                  <Icon 
                    className="w-3 h-3" 
                    style={{ color: item.color }} 
                  />
                </div>
              </div>
              
              <div>
                <p className="text-xs futuristic-text-muted mb-1">{item.label}</p>
                <p className="text-sm font-semibold futuristic-text mb-1">{item.value}</p>
                <p className="text-xs futuristic-text-muted truncate">{item.detail}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Barra de progreso del almacenamiento */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs futuristic-text-muted">Espacio Disponible</span>
          <span className="text-xs futuristic-text">{formatFileSize(stats.availableSpace)}</span>
        </div>
        <div className="w-full bg-black/20 rounded-full h-1.5 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${usedSpacePercentage}%` }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
            style={{ 
              background: `linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)` 
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SystemStatistics;