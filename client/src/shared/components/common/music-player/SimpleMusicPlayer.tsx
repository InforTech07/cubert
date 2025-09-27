'use client';

import React, { useState, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Upload,
  Loader2,
  List,
  Music,
  ChevronDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TextEffect } from '../../ui/motion-primitives/text-effect';
import { TextShimmer } from '../../ui/motion-primitives/text-shimmer-basic';


interface SimpleTrack {
  id: string;
  title: string;
  url: string;
}

interface SimpleMusicPlayerProps {
  className?: string;
}

const SimpleMusicPlayer: React.FC<SimpleMusicPlayerProps> = ({ className = '' }) => {
  const [currentTrack, setCurrentTrack] = useState<SimpleTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState<SimpleTrack[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [autoplay] = useState(true);
  const [showPlaylist, setShowPlaylist] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cargar archivos
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const newTracks: SimpleTrack[] = [];
    
    Array.from(files).forEach((file, index) => {
      if (file.type.startsWith('audio/')) {
        const url = URL.createObjectURL(file);
        const track: SimpleTrack = {
          id: `track_${Date.now()}_${index}`,
          title: file.name.replace(/\.[^/.]+$/, ''),
          url: url,
        };
        newTracks.push(track);
      }
    });

    if (newTracks.length > 0) {
      setPlaylist(prev => {
        const updated = [...prev, ...newTracks];
        if (!currentTrack && updated.length > 0) {
          setCurrentTrack(updated[0]);
          setCurrentIndex(0);
          
          // Autoplay si está habilitado
          if (autoplay) {
            setTimeout(async () => {
              const audio = audioRef.current;
              if (audio) {
                try {
                  setIsLoading(true);
                  await audio.play();
                  setIsPlaying(true);
                } catch (error) {
                  if (error instanceof Error && error.name !== 'AbortError') {
                    console.error('Error en autoplay inicial:', error);
                  }
                } finally {
                  setIsLoading(false);
                }
              }
            }, 100);
          }
        }
        return updated;
      });
    }

    // Limpiar input
    if (event.target) {
      event.target.value = '';
    }
  }, [currentTrack]);

  // Play/Pause simplificado
  const togglePlayPause = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Error reproduciendo:', error);
      }
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  }, [isPlaying, currentTrack]);

  // Siguiente canción con autoplay
  const nextTrack = useCallback(async (shouldAutoplay = false) => {
    if (playlist.length === 0) return;
    
    const nextIndex = (currentIndex + 1) % playlist.length;
    setCurrentTrack(playlist[nextIndex]);
    setCurrentIndex(nextIndex);
    setIsPlaying(false);

    // Si es autoplay o está habilitado el autoplay, reproducir automáticamente
    if (shouldAutoplay || autoplay) {
      // Esperar un poco para que el audio se configure
      setTimeout(async () => {
        const audio = audioRef.current;
        if (audio && playlist[nextIndex]) {
          try {
            setIsLoading(true);
            await audio.play();
            setIsPlaying(true);
          } catch (error) {
            if (error instanceof Error && error.name !== 'AbortError') {
              console.error('Error en autoplay:', error);
            }
          } finally {
            setIsLoading(false);
          }
        }
      }, 100);
    }
  }, [playlist, currentIndex, autoplay]);

  // Canción anterior
  const previousTrack = useCallback(() => {
    if (playlist.length === 0) return;
    
    const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
    setCurrentTrack(playlist[prevIndex]);
    setCurrentIndex(prevIndex);
    setIsPlaying(false);
  }, [playlist, currentIndex]);

  // Seleccionar canción específica de la playlist
  const selectTrack = useCallback(async (index: number) => {
    if (playlist.length === 0 || index < 0 || index >= playlist.length) return;
    
    setCurrentTrack(playlist[index]);
    setCurrentIndex(index);
    setIsPlaying(false);
    setShowPlaylist(false);

    // Autoplay si está habilitado
    if (autoplay) {
      setTimeout(async () => {
        const audio = audioRef.current;
        if (audio) {
          try {
            setIsLoading(true);
            await audio.play();
            setIsPlaying(true);
          } catch (error) {
            if (error instanceof Error && error.name !== 'AbortError') {
              console.error('Error en autoplay:', error);
            }
          } finally {
            setIsLoading(false);
          }
        }
      }, 100);
    }
  }, [playlist, autoplay]);

  // Configurar volumen cuando cambie
  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    // Mantener volumen fijo al 75%
    audio.volume = 0.75;
  }, []);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Audio element oculto */}
      {currentTrack && (
        <audio 
          ref={audioRef} 
          src={currentTrack.url}
          onEnded={() => {
            setIsPlaying(false);
            // Pasar automáticamente a la siguiente canción si hay más en la playlist
            if (playlist.length > 1) {
              nextTrack(true); // true indica que es autoplay
            }
          }}
        />
      )}
      
      {/* Input file oculto */}
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        multiple
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* Botón cargar si no hay música */}
      {!currentTrack ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-3 py-2 rounded-lg futuristic-glass futuristic-highlight hover:bg-white/10 transition-colors"
        >
          <Upload className="w-4 h-4 futuristic-text-secondary" />
          <span className="text-xs futuristic-text-secondary">Cargar</span>
        </motion.button>
      ) : (
        <div className="flex items-center gap-3">
          {/* Nombre de la canción - IZQUIERDA */}
          <div className="flex flex-col min-w-0 max-w-32">
            <div className="text-xs futuristic-text truncate" title={currentTrack.title}>
                <TextShimmer className='font-mono text-sm' duration={5}>
                    {currentTrack.title}
                </TextShimmer>
            </div>
          </div>

          {/* Controles - CENTRO */}
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={previousTrack}
              className="p-1 rounded hover:bg-white/10 transition-colors"
              disabled={playlist.length <= 1}
            >
              <SkipBack className="w-3 h-3 futuristic-text" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlayPause}
              disabled={isLoading}
              className="p-2 rounded-lg futuristic-glass futuristic-highlight hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 futuristic-text animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-4 h-4 futuristic-text" />
              ) : (
                <Play className="w-4 h-4 futuristic-text" />
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => nextTrack(false)}
              className="p-1 rounded hover:bg-white/10 transition-colors"
              disabled={playlist.length <= 1}
            >
              <SkipForward className="w-3 h-3 futuristic-text" />
            </motion.button>
          </div>

          {/* Menú de Playlist - DERECHA */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowPlaylist(!showPlaylist)}
              className="flex items-center gap-1 p-2 rounded-lg futuristic-glass futuristic-highlight hover:bg-white/10 transition-colors"
            >
              <List className="w-4 h-4 futuristic-text" />
              <ChevronDown className={`w-3 h-3 futuristic-text transition-transform ${showPlaylist ? 'rotate-180' : ''}`} />
            </motion.button>

            <AnimatePresence>
              {showPlaylist && (
                <>
                  {/* Backdrop */}
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowPlaylist(false)} 
                  />
                  
                  {/* Menu */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-12 z-20 w-64 max-h-80 overflow-y-auto futuristic-surface rounded-xl border border-white/20 shadow-2xl backdrop-blur-sm"
                  >
                    {/* Opción de cargar pistas */}
                    <motion.button
                      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                      onClick={() => {
                        fileInputRef.current?.click();
                        setShowPlaylist(false);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 text-sm futuristic-text hover:futuristic-text-secondary transition-colors border-b border-white/10"
                    >
                      <Upload className="w-4 h-4" />
                      Cargar Música
                    </motion.button>

                    {/* Lista de canciones */}
                    {playlist.length > 0 ? (
                      playlist.map((track, index) => (
                        <motion.button
                          key={track.id}
                          whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                          onClick={() => selectTrack(index)}
                          className={`flex items-center gap-3 w-full px-4 py-2 text-sm transition-colors ${
                            index === currentIndex 
                              ? 'futuristic-text bg-white/5 border-l-2 border-primary' 
                              : 'futuristic-text-secondary hover:futuristic-text'
                          }`}
                        >
                          {index === currentIndex && isPlaying ? (
                            <Play className="w-4 h-4 flex-shrink-0 text-primary" />
                          ) : (
                            <Music className="w-4 h-4 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="truncate max-w-[180px]" title={track.title}>
                              {track.title}
                            </div>
                          </div>
                        </motion.button>
                      ))
                    ) : (
                      <div className="px-4 py-6 text-center">
                        <Music className="w-8 h-8 futuristic-text-muted mx-auto mb-2" />
                        <p className="text-sm futuristic-text-muted">No hay música cargada</p>
                      </div>
                    )}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleMusicPlayer;