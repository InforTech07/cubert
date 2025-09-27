'use client';

import React, { useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Upload,
  Music,
  Loader2,
  Volume2,
  Headphones
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useMusicPlayer, type MusicTrack } from '../../../../../shared/contexts/MusicPlayerContext';

const MusicPlayerDashboard: React.FC = () => {
  const {
    currentTrack,
    playlist,
    isPlaying,
    isLoading,
    currentTime,
    duration,
    togglePlayPause,
    nextTrack,
    previousTrack,
    loadTracks,
    getSpectrumData,
    seekTo
  } = useMusicPlayer();
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const animationRef = useRef<number>(0);

  // Formatear tiempo en mm:ss
  const formatTime = (seconds: number): string => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Manejar click en la barra de progreso
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!duration) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    
    seekTo(newTime);
  };

  // Espectro visual animado con datos reales del audio
  const SpectrumVisualizer = () => {
    const [spectrumData, setSpectrumData] = React.useState<number[]>([]);
    const bars = 24;
    
    React.useEffect(() => {
      const updateSpectrum = () => {
        const data = getSpectrumData();
        if (data && isPlaying) {
          // Tomar muestras específicas del espectro para mejor visualización
          const samples = [];
          const step = Math.floor(data.length / bars);
          
          for (let i = 0; i < bars; i++) {
            const index = Math.min(i * step, data.length - 1);
            // Aplicar transformación logarítmica para mejor respuesta visual
            const value = data[index];
            const normalizedValue = Math.min(100, Math.max(15, (value / 255) * 120));
            samples.push(normalizedValue);
          }
          
          setSpectrumData(samples);
        } else {
          // Datos estáticos cuando no está reproduciendo
          setSpectrumData(new Array(bars).fill(20));
        }
        
        if (isPlaying) {
          animationRef.current = requestAnimationFrame(updateSpectrum);
        }
      };

      if (isPlaying) {
        updateSpectrum();
      } else {
        setSpectrumData(new Array(bars).fill(20));
      }

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }, [isPlaying, getSpectrumData]);
    
    return (
      <div className="flex items-end justify-center space-x-1 h-20">
        {spectrumData.map((value, i) => (
          <motion.div
            key={i}
            className="bg-gradient-to-t from-cyan-500 via-blue-400 to-purple-500 rounded-full"
            style={{ 
              width: '4px',
              height: `${value}%`
            }}
            animate={{
              opacity: isPlaying ? 0.8 : 0.3
            }}
            transition={{
              duration: isPlaying ? 0.05 : 0.3,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    );
  };

  // Cargar archivos
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const newTracks: MusicTrack[] = [];
    
    Array.from(files).forEach((file, index) => {
      if (file.type.startsWith('audio/')) {
        const url = URL.createObjectURL(file);
        const track: MusicTrack = {
          id: `track_${Date.now()}_${index}`,
          title: file.name.replace(/\.[^/.]+$/, ''),
          url: url,
        };
        newTracks.push(track);
      }
    });

    if (newTracks.length > 0) {
      loadTracks(newTracks);
    }

    if (event.target) {
      event.target.value = '';
    }
  }, [loadTracks]);

  return (
    <div className="bg-transparent border border-white/10 rounded-2xl p-6 h-full relative overflow-hidden">
      {/* Input file oculto */}
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        multiple
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-10 h-10 futuristic-glass rounded-xl flex items-center justify-center futuristic-highlight mr-3">
            <Headphones className="w-5 h-5 futuristic-text" />
          </div>
          <div>
            <h3 className="text-lg font-light futuristic-text">Reproductor</h3>
            <p className="text-xs futuristic-text-muted">
              {currentTrack ? (isPlaying ? 'Reproduciendo' : 'Pausado') : 'Sin música'}
            </p>
          </div>
        </div>
        
        {/* Botón cargar música si no hay */}
        {!currentTrack && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-3 py-2 rounded-lg futuristic-glass futuristic-highlight hover:bg-white/10 transition-colors"
          >
            <Upload className="w-4 h-4 futuristic-text-secondary" />
            <span className="text-xs futuristic-text-secondary">Cargar</span>
          </motion.button>
        )}

        {/* Control de volumen si hay música */}
        {currentTrack && (
          <div className="flex items-center">
            <Volume2 className="w-4 h-4 futuristic-text-muted mr-2" />
            <div className="w-16 h-1 bg-black/20 rounded-full overflow-hidden">
              <div className="w-3/4 h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
            </div>
          </div>
        )}
      </div>

      {/* Información de la pista */}
      {currentTrack && (
        <div className="text-center mb-6">
          <h4 className="text-base futuristic-text font-medium mb-1 truncate">
            {currentTrack.title}
          </h4>
          <p className="text-sm futuristic-text-muted mb-2">
            {playlist.length > 1 ? `${playlist.length} canciones` : '1 canción'}
          </p>
          {duration > 0 && (
            <p className="text-xs futuristic-text-muted">
              {formatTime(currentTime)} / {formatTime(duration)}
            </p>
          )}
        </div>
      )}

      {/* Estado sin música */}
      {!currentTrack && (
        <div className="text-center py-12">
          <Music className="w-12 h-12 futuristic-text-muted mx-auto mb-4 opacity-50" />
          <h4 className="text-base futuristic-text-muted mb-2">No hay música cargada</h4>
          <p className="text-sm futuristic-text-muted mb-4">
            Carga música para comenzar
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 rounded-lg futuristic-glass futuristic-highlight hover:bg-white/10 transition-colors"
          >
            <span className="text-sm futuristic-text">Cargar Música</span>
          </motion.button>
        </div>
      )}

      {/* Espectro Visual */}
      {currentTrack && (
        <>
          <div className="mb-6">
            <SpectrumVisualizer />
          </div>

          {/* Controles */}
          <div className="flex items-center justify-center space-x-4 mb-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={previousTrack}
              disabled={playlist.length <= 1}
              className="p-2 rounded-lg futuristic-glass futuristic-highlight hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              <SkipBack className="w-4 h-4 futuristic-text" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlayPause}
              disabled={isLoading}
              className="p-3 rounded-xl futuristic-glass futuristic-highlight hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Loader2 className="w-5 h-5 futuristic-text animate-spin" />
                  </motion.div>
                ) : isPlaying ? (
                  <motion.div
                    key="pause"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Pause className="w-5 h-5 futuristic-text" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="play"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Play className="w-5 h-5 futuristic-text ml-0.5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => nextTrack()}
              disabled={playlist.length <= 1}
              className="p-2 rounded-lg futuristic-glass futuristic-highlight hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              <SkipForward className="w-4 h-4 futuristic-text" />
            </motion.button>
          </div>

          {/* Barra de Progreso */}
          <div className="mb-4">
            <div className="flex justify-between text-xs futuristic-text-muted mb-2">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <div 
              className="w-full bg-black/20 rounded-full h-1.5 overflow-hidden cursor-pointer hover:bg-black/30 transition-colors"
              onClick={handleProgressClick}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                animate={{
                  width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%'
                }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>

          {/* Opción para cargar más música */}
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => fileInputRef.current?.click()}
              className="text-xs futuristic-text-muted hover:futuristic-text transition-colors underline decoration-dotted"
            >
              + Cargar más música
            </motion.button>
          </div>
        </>
      )}

      {/* Estado visual adicional */}
      {currentTrack && (
        <div className="absolute top-4 right-4 opacity-60">
          <motion.div
            animate={{
              scale: isPlaying ? [1, 1.2, 1] : 1,
              opacity: isPlaying ? [0.6, 1, 0.6] : 0.6
            }}
            transition={{
              duration: 2,
              repeat: isPlaying ? Infinity : 0,
              ease: "easeInOut"
            }}
          >
            <Music className="w-4 h-4 futuristic-text" />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MusicPlayerDashboard;