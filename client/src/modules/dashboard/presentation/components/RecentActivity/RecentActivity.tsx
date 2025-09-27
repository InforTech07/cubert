import React from 'react';
import { motion } from 'motion/react';
import { Activity, Plus, Edit, Trash2, Share2, Download, Clock } from 'lucide-react';
import type { RecentActivity } from '../../../data/mockDashboardData';
import { getRelativeTime, getActivityColor } from '../../../data/mockDashboardData';

interface RecentActivityProps {
  activities: RecentActivity[];
  onActivityClick?: (activity: RecentActivity) => void;
}

const RecentActivityComponent: React.FC<RecentActivityProps> = ({ activities, onActivityClick }) => {
  const getIcon = (type: RecentActivity['type']) => {
    const iconMap = {
      create: Plus,
      modify: Edit,
      delete: Trash2,
      share: Share2,
      download: Download
    };
    return iconMap[type];
  };

  const getActionLabel = (type: RecentActivity['type']): string => {
    const labels = {
      create: 'Creado',
      modify: 'Modificado',
      delete: 'Eliminado',
      share: 'Compartido',
      download: 'Descargado'
    };
    return labels[type];
  };

  return (
    <div className="bg-transparent border border-white/10 rounded-2xl p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-10 h-10 futuristic-glass rounded-xl flex items-center justify-center futuristic-highlight mr-3">
            <Activity className="w-5 h-5 futuristic-text" />
          </div>
          <div>
            <h3 className="text-lg font-light futuristic-text">Actividad Reciente</h3>
            <p className="text-xs futuristic-text-muted">Últimas acciones</p>
          </div>
        </div>
        <span className="text-xs futuristic-text-muted">{activities.length}</span>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {activities.map((activity, index) => {
          const Icon = getIcon(activity.type);
          const color = getActivityColor(activity.type);
          
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onActivityClick?.(activity)}
              className="group cursor-pointer"
            >
              <div className="flex items-center p-3 rounded-xl hover:bg-white/5 transition-all duration-200">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center mr-3 flex-shrink-0"
                  style={{ 
                    backgroundColor: `${color}20`, 
                    border: `1px solid ${color}40` 
                  }}
                >
                  <Icon 
                    className="w-4 h-4" 
                    style={{ color }} 
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm futuristic-text font-medium truncate group-hover:futuristic-text-secondary transition-colors">
                      {activity.fileName}
                    </h4>
                    <span 
                      className="text-xs px-2 py-1 rounded-full ml-2 flex-shrink-0"
                      style={{ 
                        backgroundColor: `${color}20`, 
                        color,
                        fontSize: '10px'
                      }}
                    >
                      {getActionLabel(activity.type)}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-xs futuristic-text-muted mt-1">
                    <span>{activity.user || 'Sistema'}</span>
                    <span className="mx-2">•</span>
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{getRelativeTime(activity.timestamp)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {activities.length === 0 && (
        <div className="text-center py-8">
          <Activity className="w-12 h-12 futuristic-text-muted mx-auto mb-3" />
          <p className="futuristic-text-muted text-sm">No hay actividad reciente</p>
        </div>
      )}
    </div>
  );
};

export default RecentActivityComponent;