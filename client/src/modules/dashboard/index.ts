// Dashboard module exports
export { default as HomePage } from './presentation/pages/HomePage';

// Componentes del dashboard
export { default as FavoriteFolders } from './presentation/components/FavoriteFolders/FavoriteFolders';
export { default as FavoriteFiles } from './presentation/components/FavoriteFiles/FavoriteFiles';
export { default as SystemStatistics } from './presentation/components/SystemStatistics/SystemStatistics';
export { default as RecentActivityComponent } from './presentation/components/RecentActivity/RecentActivity';
export { default as QuickAccessComponent } from './presentation/components/QuickAccess/QuickAccess';
export { default as MusicPlayerDashboard } from './presentation/components/MusicPlayer/MusicPlayerDashboard';

// Tipos y datos mock
export type {
  FavoriteFolder,
  FavoriteFile,
  SystemStats,
  RecentActivity,
  QuickAccess
} from './data/mockDashboardData';

export {
  mockFavoriteFolders,
  mockFavoriteFiles,
  mockSystemStats,
  mockRecentActivity,
  mockQuickAccess,
  formatFileSize,
  getRelativeTime,
  getActivityColor
} from './data/mockDashboardData';