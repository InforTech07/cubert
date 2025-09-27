'use client';
import { useMemo } from 'react';
import { useTopBarWithDock } from '../../hooks/useTopBar';
import {
  TopBarBreadcrumb,
  TopBarDateTime, 
  TopBarLogout,
  TopBarMusicPlayer,
  type BreadcrumbItem,
  type Track,
} from './TopBarTools';

// Hook para el breadcrumb
export function useTopBarBreadcrumb(items: BreadcrumbItem[]) {
  const breadcrumbComponent = useMemo(() => (
    <TopBarBreadcrumb 
      items={items}
      onNavigate={(path) => {
        // Aquí se podría usar el router para navegar
        console.log('Navigate to:', path);
      }}
    />
  ), [items]);

  return useTopBarWithDock(breadcrumbComponent, {
    id: 'breadcrumb',
    position: 'left',
    priority: 1,
  });
}

// Hook para fecha y hora
export function useTopBarDateTime(
  options: {
    showDate?: boolean;
    showTime?: boolean;
    format24h?: boolean;
  } = {}
) {
  const dateTimeComponent = useMemo(() => (
    <TopBarDateTime {...options} />
  ), [options.showDate, options.showTime, options.format24h]);

  return useTopBarWithDock(dateTimeComponent, {
    id: 'datetime',
    position: 'center',
    priority: 1,
  });
}

// Hook para logout
export function useTopBarLogout(onLogout?: () => void) {
  const logoutComponent = useMemo(() => (
    <TopBarLogout 
      onLogout={onLogout || (() => {
        // Acción predeterminada de logout
        console.log('Logout clicked');
      })}
    />
  ), [onLogout]);

  return useTopBarWithDock(logoutComponent, {
    id: 'logout',
    position: 'right',
    priority: 5,
  });
}

// Hook para el reproductor de música
export function useTopBarMusicPlayer(
  currentTrack?: Track,
  playerState?: {
    isPlaying?: boolean;
    volume?: number;
  },
  handlers?: {
    onPlay?: () => void;
    onPause?: () => void;
    onNext?: () => void;
    onPrevious?: () => void;
    onVolumeChange?: (volume: number) => void;
  }
) {
  const musicPlayerComponent = useMemo(() => currentTrack ? (
    <TopBarMusicPlayer
      currentTrack={currentTrack}
      isPlaying={playerState?.isPlaying}
      volume={playerState?.volume}
      {...handlers}
    />
  ) : null, [currentTrack, playerState?.isPlaying, playerState?.volume, handlers]);

  return useTopBarWithDock(musicPlayerComponent, {
    id: 'music-player',
    position: 'right',
    priority: 3,
  });
}

// Componente de ejemplo que muestra cómo usar todas las herramientas
export function TopBarExample() {
  // Datos de ejemplo
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Documents', path: '/documents' },
    { label: 'Projects', path: '/documents/projects' },
    { label: 'Cubert', path: '/documents/projects/cubert' },
  ];

  const exampleTrack: Track = {
    id: '1',
    title: 'Ambient Space',
    artist: 'Futuristic Sounds',
    duration: 240,
    url: '/audio/ambient-space.mp3',
  };

  // Usar los hooks
  useTopBarBreadcrumb(breadcrumbItems);
  
  useTopBarDateTime({
    showDate: true,
    showTime: true,
    format24h: true,
  });

  useTopBarLogout(() => {
    console.log('User logged out');
  });

  useTopBarMusicPlayer(
    exampleTrack,
    { isPlaying: false, volume: 75 },
    {
      onPlay: () => console.log('Play'),
      onPause: () => console.log('Pause'),
      onNext: () => console.log('Next track'),
      onPrevious: () => console.log('Previous track'),
      onVolumeChange: (volume) => console.log('Volume:', volume),
    }
  );

  return null; // Este componente solo registra las herramientas
}