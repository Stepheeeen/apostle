import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the Song interface
interface Song {
  title: string;
  author: string;
  trackImg: string;
  trackId: any;
  previewUrl?: string; // Optional property
}

// Define the context type
interface SongContextType {
  currentSong: Song | null; // Current song being played or selected
  setCurrentSong: (song: Song | null) => void; // Function to update the current song
}

// Create the SongContext
const SongContext = createContext<SongContextType | undefined>(undefined);

interface SongProviderProps {
  children: ReactNode; // Accepts React children components
}

// SongProvider component to wrap the app and provide context
export const SongProvider: React.FC<SongProviderProps> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null); // State to store the current song

  return (
    <SongContext.Provider value={{ currentSong, setCurrentSong }}>
      {children}
    </SongContext.Provider>
  );
};

// Custom hook to use the SongContext
export const useSongContext = () => {
  const context = useContext(SongContext); // Access the SongContext
  if (!context) {
    throw new Error("useSongContext must be used within a SongProvider");
  }
  return context; // Return context value (currentSong and setCurrentSong)
};
