import { useState } from "react";
import { useSongContext } from "@/contexts/SongContext";
import { Audio } from "expo-av";

export const useMusicPlayer = () => {
  const { currentSong, setCurrentSong } = useSongContext(); // Access context
  const [currentSound, setCurrentSound] = useState<Audio.Sound | null>(null); // Local state
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null); // Local state

  const playOrPauseSong = async (song: any) => {
    if (playingTrackId === song.trackId) {
      // Pause if already playing
      if (currentSound) {
        await currentSound.pauseAsync();
        setPlayingTrackId(null);
      }
    } else {
      // Stop the current sound if playing
      if (currentSound) {
        await currentSound.unloadAsync();
        setCurrentSound(null);
      }
      try {
        const { sound } = await Audio.Sound.createAsync(
          { uri: song.previewUrl },
          { shouldPlay: true }
        );
        setCurrentSound(sound);
        setPlayingTrackId(song.trackId);
        setCurrentSong(song);

        sound.setOnPlaybackStatusUpdate((status: any) => {
          if (status.didJustFinish) {
            setPlayingTrackId(null);
            setCurrentSound(null);
            setCurrentSong(null);
          }
        });
      } catch (error) {
        console.error("Error playing sound:", error);
      }
    }
  };

  return { playOrPauseSong, currentSong, playingTrackId };
};
