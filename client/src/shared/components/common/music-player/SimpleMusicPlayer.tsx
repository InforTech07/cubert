'use client';

import React, { useState, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Upload,
  Loader2,
} from 'lucide-react';
import { motion } from 'motion/react';

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
  const [volume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [playlist, setPlaylist] = useState<SimpleTrack[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  
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

  // Alternar mute
  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    audio.volume = newMuted ? 0 : volume / 100;
  }, [isMuted, volume]);

  // Configurar volumen cuando cambie
  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.volume = isMuted ? 0 : volume / 100;
  }, [isMuted, volume]);

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
        <div className="flex items-center gap-2">
          {/* Controles básicos */}
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

          {/* Info de la canción */}
          <div className="flex flex-col min-w-0 max-w-32">
            <span className="text-xs futuristic-text truncate">
              {currentTrack.title}
            </span>
            <div className="flex items-center gap-1 text-xs futuristic-text-muted">
              <span>{currentIndex + 1} / {playlist.length}</span>
              {autoplay && playlist.length > 1 && (
                <span className="text-green-400" title="Autoplay activo">●</span>
              )}
            </div>
          </div>
          
          {/* Control de volumen */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMute}
            className="p-1 rounded hover:bg-white/10 transition-colors"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-3 h-3 futuristic-text-secondary" />
            ) : (
              <Volume2 className="w-3 h-3 futuristic-text-secondary" />
            )}
          </motion.button>

          {/* Botón para cargar más música */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => fileInputRef.current?.click()}
            className="p-1 rounded hover:bg-white/10 transition-colors ml-1"
            title="Cargar más música"
          >
            <Upload className="w-3 h-3 futuristic-text-muted" />
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default SimpleMusicPlayer;