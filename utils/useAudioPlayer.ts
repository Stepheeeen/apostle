// utils/useAudioPlayer.ts
import { useState, useEffect } from "react";
import { Audio } from "expo-av";
import { useSongContext } from "@/contexts/SongContext";

interface Song {
  trackId: string;
  previewUrl: string;
  trackImg: string;
}

export const useAudioPlayer = () => {
  const { currentSong, setCurrentSong } = useSongContext();
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    if (currentSong) {
      playPauseSong(currentSong);
    }
  }, [currentSong]);

  const onPlaybackStatusUpdate = (status: any) => {
    if (!status.isLoaded) return;

    setProgress(status.positionMillis);
    setIsPlaying(status.isPlaying);
    setDuration(status.durationMillis ?? 0);

    if (status.didJustFinish) {
      if (isRepeat) {
        sound?.replayAsync();
      } else {
        handleTrackEnd();
      }
    }
  };

  const handleTrackEnd = () => {
    setPlayingTrackId(null);
    setIsPlaying(false);
    setProgress(0);
    setSound(null);
    handleNext();
  };

  const playPauseSong = async (song: Song) => {
    try {
      if (playingTrackId === song.trackId && sound) {
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
          setPlayingTrackId(null);
        }

        if (!song.previewUrl) {
          throw new Error("No preview URL available for this song.");
        }

        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: song.previewUrl },
          { shouldPlay: true },
          onPlaybackStatusUpdate
        );

        setSound(newSound);
        setPlayingTrackId(song.trackId);
        setIsPlaying(true);

        const status = await newSound.getStatusAsync();
        if (status.isLoaded) {
          setDuration(status.durationMillis ?? 0);
        }
      }
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      console.error("Playback Error", "Failed to play audio. Please try again.");
    }
  };

  const handleSliderChange = async (value: number) => {
    try {
      if (sound && !isNaN(value)) {
        await sound.setPositionAsync(value);
        setProgress(value);
      }
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      console.error("Error", "Failed to seek audio position");
    }
  };

  const handlePrev = async () => {
    try {
      if (progress > 3000) {
        await sound?.setPositionAsync(0);
      } else {
        if (sound) {
          await sound.unloadAsync();
          setSound(null);
        }
        setPlayingTrackId(null);
        setIsPlaying(false);
        // TODO: Add previous track logic
      }
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      console.error("Error", "Failed to play previous track");
    }
  };

  const handleNext = async () => {
    try {
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }
      setPlayingTrackId(null);
      setIsPlaying(false);
      // TODO: Add next track logic with shuffle consideration
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      console.error("Error", "Failed to play next track");
    }
  };

  const toggleShuffle = () => setIsShuffle(!isShuffle);
  const toggleRepeat = () => setIsRepeat(!isRepeat);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return {
    currentSong,
    isPlaying,
    progress,
    duration,
    isShuffle,
    isRepeat,
    error,
    playPauseSong,
    handleSliderChange,
    handlePrev,
    handleNext,
    toggleShuffle,
    toggleRepeat,
    formatTime,
  };
};