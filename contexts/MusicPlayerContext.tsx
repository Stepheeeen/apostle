import React, { createContext, ReactNode, useContext, useState } from "react";

// Define types for the context values
interface MusicPlayerContextType {
  isPlaying: boolean;
  playPauseHandler: () => void;
  changeTrack: (trackUrl: string) => void;
  currentTrack: string | null;
}

// Create the context with a default value of type MusicPlayerContextType
const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(
  undefined
);

// Custom hook to use the context
export const useMusicPlayer = (): MusicPlayerContextType => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error("useMusicPlayer must be used within a MusicPlayerProvider");
  }
  return context;
};

// Provider component to manage the music player state
export const MusicPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [audio] = useState<HTMLAudioElement>(new Audio());

  // Play/Pause handler
  const playPauseHandler = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Change track handler
  const changeTrack = (trackUrl: string) => {
    if (audio.src !== trackUrl) {
      audio.src = trackUrl;
      audio.play();
      setIsPlaying(true);
      setCurrentTrack(trackUrl);
    }
  };

  return (
    <MusicPlayerContext.Provider
      value={{ isPlaying, playPauseHandler, changeTrack, currentTrack }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};
