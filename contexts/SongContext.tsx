// contexts/SongContext.tsx
import React, { createContext, useContext, useState } from "react";

interface Song {
  trackId: string;
  title: string;
  author: string;
  previewUrl: string;
  trackImg: string;
}

interface SongContextProps {
  currentSong: Song | null;
  setCurrentSong: (song: Song | null) => void;
}

const SongContext = createContext<SongContextProps>({
  currentSong: null,
  setCurrentSong: () => {},
});

export const SongProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  return (
    <SongContext.Provider value={{ currentSong, setCurrentSong }}>
      {children}
    </SongContext.Provider>
  );
};

export const useSongContext = () => useContext(SongContext);