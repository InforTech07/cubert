import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';

// Tipos para el reproductor
export interface MusicTrack {
  id: string;
  title: string;
  url: string;
  artist?: string;
  duration?: string;
}

interface MusicPlayerState {
  currentTrack: MusicTrack | null;
  playlist: MusicTrack[];
  currentIndex: number;
  isPlaying: boolean;
  isLoading: boolean;
  volume: number;
  audioContext: AudioContext | null;
  analyser: AnalyserNode | null;
  dataArray: Uint8Array | null;
  autoplay: boolean;
  currentTime: number;
  duration: number;
}

export interface MusicPlayerContextType extends MusicPlayerState {
  // Acciones del reproductor
  loadTracks: (tracks: MusicTrack[]) => void;
  playTrack: (index?: number) => Promise<void>;
  pauseTrack: () => void;
  togglePlayPause: () => Promise<void>;
  nextTrack: () => Promise<void>;
  previousTrack: () => void;
  selectTrack: (index: number) => Promise<void>;
  setVolume: (volume: number) => void;
  getSpectrumData: () => Uint8Array | null;
  seekTo: (time: number) => void;
  // Referencias internas
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined);

// Hook personalizado para usar el contexto
export const useMusicPlayer = (): MusicPlayerContextType => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return context;
};

// Provider del contexto
export const MusicPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<MusicPlayerState>({
    currentTrack: null,
    playlist: [],
    currentIndex: 0,
    isPlaying: false,
    isLoading: false,
    volume: 0.75,
    audioContext: null,
    analyser: null,
    dataArray: null,
    autoplay: true,
    currentTime: 0,
    duration: 0
  });

  const audioRef = useRef<HTMLAudioElement>(null);

  // Inicializar Web Audio API
  const initializeAudioContext = useCallback(() => {
    if (state.audioContext) return; // Ya inicializado

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      
      const bufferLength = analyser.frequencyBinCount;
      // Crear array de forma más compatible
      const dataArray = new Uint8Array(bufferLength);

      setState(prev => ({
        ...prev,
        audioContext,
        analyser,
        dataArray
      }));

      // Conectar el audio element al analyser cuando esté disponible
      const audio = audioRef.current;
      if (audio && !audio.crossOrigin) {
        try {
          const source = audioContext.createMediaElementSource(audio);
          source.connect(analyser);
          analyser.connect(audioContext.destination);
        } catch (error) {
          console.warn('No se pudo conectar al Web Audio API (probablemente CORS):', error);
        }
      }
    } catch (error) {
      console.error('Error inicializando Web Audio API:', error);
    }
  }, [state.audioContext]);

  // Cargar tracks
  const loadTracks = useCallback((tracks: MusicTrack[]) => {
    setState(prev => {
      const newPlaylist = [...prev.playlist, ...tracks];
      return {
        ...prev,
        playlist: newPlaylist,
        currentTrack: prev.currentTrack || newPlaylist[0] || null,
        currentIndex: prev.currentTrack ? prev.currentIndex : 0
      };
    });
    
    // Inicializar Web Audio API cuando se carga la primera pista
    if (tracks.length > 0) {
      setTimeout(() => initializeAudioContext(), 100);
    }
  }, [initializeAudioContext]);

  // Reproducir track
  const playTrack = useCallback(async (index?: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      // Inicializar Web Audio API en la primera reproducción
      if (!state.audioContext) {
        initializeAudioContext();
      }
      
      if (index !== undefined) {
        // Cambiar el track
        setState(prev => ({
          ...prev,
          currentTrack: prev.playlist[index],
          currentIndex: index
        }));
        
        // Configurar la nueva URL y esperar a que esté lista
        const newTrack = state.playlist[index];
        if (newTrack) {
          audio.src = newTrack.url;
          
          // Esperar a que esté lista para reproducir
          await new Promise((resolve) => {
            const onCanPlay = () => {
              audio.removeEventListener('canplaythrough', onCanPlay);
              resolve(undefined);
            };
            audio.addEventListener('canplaythrough', onCanPlay);
            audio.load();
          });
        }
      }

      await audio.play();
      setState(prev => ({ ...prev, isPlaying: true }));
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Error reproduciendo:', error);
      }
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [state.playlist, state.audioContext, initializeAudioContext]);

  // Pausar track
  const pauseTrack = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      setState(prev => ({ ...prev, isPlaying: false }));
    }
  }, []);

  // Toggle play/pause
  const togglePlayPause = useCallback(async () => {
    if (state.isPlaying) {
      pauseTrack();
    } else {
      await playTrack();
    }
  }, [state.isPlaying, playTrack, pauseTrack]);

  // Siguiente track
  const nextTrack = useCallback(async () => {
    if (state.playlist.length === 0) return;

    const nextIndex = (state.currentIndex + 1) % state.playlist.length;
    await playTrack(nextIndex);
  }, [state.playlist.length, state.currentIndex, playTrack]);

  // Track anterior
  const previousTrack = useCallback(async () => {
    if (state.playlist.length === 0) return;

    const prevIndex = state.currentIndex === 0 ? state.playlist.length - 1 : state.currentIndex - 1;
    await playTrack(prevIndex);
  }, [state.playlist.length, state.currentIndex, playTrack]);

  // Seleccionar track específico
  const selectTrack = useCallback(async (index: number) => {
    if (state.playlist.length === 0 || index < 0 || index >= state.playlist.length) return;

    await playTrack(index);
  }, [state.playlist.length, playTrack]);

  // Obtener datos del espectro
  const getSpectrumData = useCallback((): Uint8Array | null => {
    if (!state.analyser) return null;
    
    try {
      // Crear array temporal para evitar problemas de tipos
      const bufferLength = state.analyser.frequencyBinCount;
      const tempArray = new Uint8Array(bufferLength);
      state.analyser.getByteFrequencyData(tempArray);
      return tempArray;
    } catch (error) {
      console.error('Error obteniendo datos del espectro:', error);
      return null;
    }
  }, [state.analyser]);

  // Buscar a un tiempo específico
  const seekTo = useCallback((time: number) => {
    const audio = audioRef.current;
    if (audio && state.duration > 0) {
      audio.currentTime = Math.max(0, Math.min(time, state.duration));
      setState(prev => ({ ...prev, currentTime: audio.currentTime }));
    }
  }, [state.duration]);

  // Establecer volumen
  const setVolume = useCallback((volume: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      setState(prev => ({ ...prev, volume }));
    }
  }, []);

  // Configurar audio cuando cambie el track actual
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Configurar volumen
    audio.volume = state.volume;

    // Actualizar la URL del audio si es necesario (solo para la carga inicial)
    if (state.currentTrack && !audio.src.endsWith(state.currentTrack.url)) {
      audio.src = state.currentTrack.url;
      audio.load();
    }

    // Event listeners para el progreso
    const handleTimeUpdate = () => {
      setState(prev => ({
        ...prev,
        currentTime: audio.currentTime,
        duration: audio.duration || 0
      }));
    };

    const handleLoadedMetadata = () => {
      setState(prev => ({
        ...prev,
        duration: audio.duration || 0,
        currentTime: audio.currentTime
      }));
    };

    // Manejar el final de la canción
    const handleEnded = () => {
      setState(prev => ({ ...prev, isPlaying: false, currentTime: 0 }));
      if (state.playlist.length > 1) {
        nextTrack();
      }
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [state.currentTrack, state.volume, state.playlist.length, nextTrack]);

  const contextValue: MusicPlayerContextType = {
    ...state,
    loadTracks,
    playTrack,
    pauseTrack,
    togglePlayPause,
    nextTrack,
    previousTrack,
    selectTrack,
    setVolume,
    getSpectrumData,
    seekTo,
    audioRef
  };

  return (
    <MusicPlayerContext.Provider value={contextValue}>
      {children}
      {/* Audio element global */}
      {state.currentTrack && (
        <audio
          ref={audioRef}
          src={state.currentTrack.url}
          preload="metadata"
        />
      )}
    </MusicPlayerContext.Provider>
  );
};

export default MusicPlayerProvider;