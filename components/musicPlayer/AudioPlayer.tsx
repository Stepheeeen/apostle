// src/components/AudioPlayer.tsx
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Audio, AVPlaybackStatus } from "expo-av";
import SliderComponent from "./SliderComponent";
import Controls from "./Controls";
import ThemeToggle from "./ThemeToggle";

// Import audio files statically
const track1 = require("../../assets/audio/mockingbird-eminem.mp3");
const track2 = require("../../assets/audio/NF-Let-you-down.mp3");
const track3 = require("../../assets/audio/NF-I-miss-the-days.mp3");

const tracks = [
  { name: "Mockingbird", artist: "Eminem", filePath: track1 },
  { name: "Let You Down", artist: "NF", filePath: track2 },
  { name: "I miss the days", artist: "NF", filePath: track3 },
];

const AudioPlayer: React.FC = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [position, setPosition] = useState<number>(0);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [isRepeat, setIsRepeat] = useState<boolean>(false);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);

  useEffect(() => {
    loadSound(tracks[currentTrack].filePath);
    return () => {
      sound?.unloadAsync();
    };
  }, [currentTrack]);

  const loadSound = async (filePath: any) => {
    if (!filePath) return;

    try {
      // Unload the current sound if it exists
      if (sound) {
        await sound.unloadAsync();
      }

      // Load the new sound
      const { sound: newSound } = await Audio.Sound.createAsync(filePath, {
        shouldPlay: false, // Do not play immediately
      });

      newSound.setOnPlaybackStatusUpdate(updatePlaybackStatus);
      setSound(newSound);
    } catch (error) {
      console.error("Error loading sound:", error);
    }
  };

  const updatePlaybackStatus = (playbackStatus: AVPlaybackStatus) => {
    if (playbackStatus.isLoaded) {
      setDuration(playbackStatus.durationMillis || 0);
      setPosition(playbackStatus.positionMillis || 0);
      setIsPlaying(playbackStatus.isPlaying);

      // Automatically handle the next track when the current track finishes
      if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
        handleNext(); // Automatically go to the next track
      }
    }
  };

  const handlePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync(); // Pause the sound
      } else {
        await sound.playAsync(); // Play the sound
      }
      setIsPlaying(!isPlaying); // Toggle isPlaying state
    }
  };

  const handleNext = async () => {
    // Stop the current sound before loading the next one
    if (sound) {
      await sound.stopAsync(); // Stop the current sound
    }

    // Update to the next track
    const nextTrack = (currentTrack + 1) % tracks.length; // Loop back to the start
    setCurrentTrack(nextTrack); // Update current track

    // Load the next track without playing immediately
    await loadSound(tracks[nextTrack].filePath); // Load the new track

    // Play the next track
    await sound?.playAsync(); // Play the new track
    setIsPlaying(true); // Set isPlaying to true to ensure the UI reflects the change
  };

  const handlePrev = async () => {
    // Stop the current sound before loading the previous one
    if (sound) {
      await sound.stopAsync(); // Stop the current sound
    }

    // Update to the previous track
    const prevTrack = (currentTrack - 1 + tracks.length) % tracks.length; // Loop back to the end if at start
    setCurrentTrack(prevTrack); // Update current track

    // Load the previous track without playing immediately
    await loadSound(tracks[prevTrack].filePath); // Load the previous track

    // Play the previous track
    await sound?.playAsync(); // Play the new track
    setIsPlaying(true); // Set isPlaying to true to ensure the UI reflects the change
  };

  return (
    <View
      style={[
        styles.container,
        isDarkTheme ? styles.lightContainer : styles.darkContainer,
      ]}
    >
      {/* <ThemeToggle isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} /> */}
      <Image
        source={require("../../assets/images/Apostle-Logo.png")}
        style={styles.albumArt}
      />
      <Text style={styles.songTitle}>{tracks[currentTrack].name}</Text>
      <Text style={styles.artistName}>{tracks[currentTrack].artist}</Text>

      <SliderComponent
        position={position}
        duration={duration}
        sound={sound}
        setPosition={setPosition}
      />
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>
          {millisToMinutesAndSeconds(position)}
        </Text>
        <Text style={styles.timeText}>
          {millisToMinutesAndSeconds(duration)}
        </Text>
      </View>

      <Controls
        isPlaying={isPlaying}
        handlePlayPause={handlePlayPause}
        handleNext={handleNext}
        handlePrev={handlePrev}
        isShuffle={isShuffle}
        toggleShuffle={() => setIsShuffle(!isShuffle)}
        isRepeat={isRepeat}
        toggleRepeat={() => setIsRepeat(!isRepeat)}
        isDarkTheme={isDarkTheme}
      />
    </View>
  );
};

function millisToMinutesAndSeconds(millis: number) {
  const minutes = Math.floor(millis / 60000);
  const seconds = Math.floor((millis % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  darkContainer: {
    backgroundColor: "#121212",
  },
  lightContainer: {
    backgroundColor: "#18465F",
  },
  albumArt: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  songTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 8,
  },
  artistName: {
    fontSize: 16,
    color: "#b3b3b3",
    marginBottom: 16,
  },
  timeContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  timeText: {
    color: "#b3b3b3",
    fontSize: 12,
  },
});

export default AudioPlayer;
