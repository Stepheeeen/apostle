import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Audio } from "expo-av";

interface Song {
  trackId: string;
  previewUrl: string;
  title: string;
  trackImg: string;
  author: string;
}

interface AudioContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  isShuffle: boolean;
  isRepeat: boolean;
  playingTrackId: string | null;
  playPauseSong: (song: Song) => void;
  setCurrentSong: (song: Song) => void;
  handleSliderChange: (value: number) => void;
  handlePrev: () => void;
  handleNext: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  formatTime: (time: number) => string;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};

interface AudioProviderProps {
  children: ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);

  useEffect(() => {
    const setupAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
          shouldDuckAndroid: true,
        });
      } catch (err) {
        console.error("Failed to configure audio:", err);
      }
    };
    setupAudio();
  }, []);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const onPlaybackStatusUpdate = (status: any) => {
    if (!status.isLoaded) return;

    setProgress(status.positionMillis);
    setIsPlaying(status.isPlaying);
    setDuration(status.durationMillis ?? 0);

    if (status.didJustFinish) {
      if (isRepeat) {
        sound?.replayAsync();
      } else {
        handleNext();
      }
    }
  };

  const playPauseSong = async (song: Song) => {
    if (currentSong?.trackId === song.trackId && sound) {
      if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    } else {
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: song.previewUrl },
        { shouldPlay: true },
        onPlaybackStatusUpdate
      );

      setSound(newSound);
      setCurrentSong(song);
      setPlayingTrackId(song.trackId);
      setIsPlaying(true);
    }
  };

  const handleSliderChange = async (value: number) => {
    if (sound) {
      await sound.setPositionAsync(value);
      setProgress(value);
    }
  };

  const handlePrev = async () => {
    if (progress > 3000) {
      await sound?.setPositionAsync(0);
    } else {
      // Implement previous track logic
    }
  };

  const handleNext = async () => {
    // Implement next track logic
  };

  const toggleShuffle = () => setIsShuffle(!isShuffle);
  const toggleRepeat = () => setIsRepeat(!isRepeat);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <AudioContext.Provider
      value={{
        currentSong,
        isPlaying,
        progress,
        duration,
        isShuffle,
        isRepeat,
        playingTrackId,
        setCurrentSong,
        playPauseSong,
        handleSliderChange,
        handlePrev,
        handleNext,
        toggleShuffle,
        toggleRepeat,
        formatTime,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
