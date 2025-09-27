'use client';

import { useState, useEffect } from 'react';
import {
  ChevronRight,
  Calendar,
  Clock,
  LogOut,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  FolderOpen,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../ui/motion-primitives/utils/utils';
import { TopBarItem, TopBarSeparator } from '../ui/motion-primitives/topbar';

// Breadcrumb Component
export type BreadcrumbItem = {
  label: string;
  path: string;
  icon?: React.ReactNode;
};

export type BreadcrumbProps = {
  items: BreadcrumbItem[];
  onNavigate?: (path: string) => void;
  className?: string;
};

export function TopBarBreadcrumb({ 
  items, 
  onNavigate, 
  className 
}: BreadcrumbProps) {
  const displayItems = items.slice(-3); // Mostrar máximo 3 elementos

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <FolderOpen className="w-4 h-4 futuristic-text-secondary" />
      <TopBarSeparator />
      <div className="flex items-center gap-1">
        {displayItems.map((item, index) => (
          <div key={`${item.path}-${index}`} className="flex items-center gap-1">
            <TopBarItem
              onClick={() => onNavigate?.(item.path)}
              className="px-2 py-1 text-sm hover:bg-white/10 rounded"
            >
              <div className="flex items-center gap-1">
                {item.icon && <span className="w-3 h-3">{item.icon}</span>}
                <span className="futuristic-text-secondary">
                  {item.label}
                </span>
              </div>
            </TopBarItem>
            {index < displayItems.length - 1 && (
              <ChevronRight className="w-3 h-3 futuristic-text-muted" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// DateTime Component
export type DateTimeProps = {
  showDate?: boolean;
  showTime?: boolean;
  format24h?: boolean;
  className?: string;
};

export function TopBarDateTime({
  showDate = true,
  showTime = true,
  format24h = true,
  className,
}: DateTimeProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    if (format24h) {
      return date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
      });
    }
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
    });
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {showDate && (
        <>
          <Calendar className="w-4 h-4 futuristic-text-secondary" />
          <span className="text-sm futuristic-text">
            {formatDate(currentTime)}
          </span>
          {showTime && <TopBarSeparator />}
        </>
      )}
      {showTime && (
        <>
          <Clock className="w-4 h-4 futuristic-text-secondary" />
          <span className="text-sm futuristic-text font-mono">
            {formatTime(currentTime)}
          </span>
        </>
      )}
    </div>
  );
}

// Logout Component
export type LogoutProps = {
  onLogout?: () => void;
  showLabel?: boolean;
  className?: string;
};

export function TopBarLogout({ 
  onLogout, 
  showLabel = false, 
  className 
}: LogoutProps) {
  return (
    <TopBarItem
      onClick={onLogout}
      className={cn(
        'flex items-center gap-2 px-3 py-2',
        'hover:bg-red-500/20 hover:text-red-300',
        'transition-colors duration-200',
        className
      )}
    >
      <LogOut className="w-4 h-4" />
      {showLabel && (
        <span className="text-sm">Cerrar Sesión</span>
      )}
    </TopBarItem>
  );
}

// Music Player Component
export type Track = {
  id: string;
  title: string;
  artist: string;
  duration: number;
  url: string;
};

export type MusicPlayerProps = {
  tracks: Track[];
  currentTrack?: Track;
  isPlaying?: boolean;
  volume?: number;
  onPlay?: () => void;
  onPause?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onVolumeChange?: (volume: number) => void;
  className?: string;
};

export function TopBarMusicPlayer({
  currentTrack,
  isPlaying = false,
  volume = 100,
  onPlay,
  onPause,
  onNext,
  onPrevious,
  onVolumeChange,
  className,
}: Omit<MusicPlayerProps, 'tracks'>) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleVolumeToggle = () => {
    if (isMuted) {
      setIsMuted(false);
      onVolumeChange?.(volume);
    } else {
      setIsMuted(true);
      onVolumeChange?.(0);
    }
  };

  if (!currentTrack) return null;

  return (
    <motion.div
      className={cn('flex items-center gap-2', className)}
      animate={{ width: isExpanded ? 'auto' : 'fit-content' }}
    >
      {/* Play/Pause Button */}
      <TopBarItem
        onClick={isPlaying ? onPause : onPlay}
        className="p-2"
      >
        {isPlaying ? (
          <Pause className="w-4 h-4" />
        ) : (
          <Play className="w-4 h-4" />
        )}
      </TopBarItem>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            className="flex items-center gap-2"
          >
            {/* Previous */}
            <TopBarItem onClick={onPrevious} className="p-1">
              <SkipBack className="w-3 h-3" />
            </TopBarItem>

            {/* Track Info */}
            <div className="flex flex-col min-w-0">
              <span className="text-xs futuristic-text truncate max-w-24">
                {currentTrack.title}
              </span>
              <span className="text-xs futuristic-text-muted truncate max-w-24">
                {currentTrack.artist}
              </span>
            </div>

            {/* Next */}
            <TopBarItem onClick={onNext} className="p-1">
              <SkipForward className="w-3 h-3" />
            </TopBarItem>

            <TopBarSeparator />

            {/* Volume Control */}
            <TopBarItem onClick={handleVolumeToggle} className="p-1">
              {isMuted || volume === 0 ? (
                <VolumeX className="w-3 h-3" />
              ) : (
                <Volume2 className="w-3 h-3" />
              )}
            </TopBarItem>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expand/Collapse Toggle */}
      <TopBarItem
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-1"
      >
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight className="w-3 h-3" />
        </motion.div>
      </TopBarItem>
    </motion.div>
  );
}