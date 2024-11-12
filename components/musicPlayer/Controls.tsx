// src/components/Controls.tsx
import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tailwind from "twrnc";

interface ControlsProps {
  isPlaying: boolean;
  handlePlayPause: () => void;
  handleNext: () => void;
  handlePrev: () => void;
  isShuffle: boolean;
  toggleShuffle: () => void;
  isRepeat: boolean;
  toggleRepeat: () => void;
  isDarkTheme: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  isPlaying,
  handlePlayPause,
  handleNext,
  handlePrev,
  toggleShuffle,
  isShuffle,
  toggleRepeat,
  isRepeat,
  isDarkTheme,
}) => {
  return (
    <View style={tailwind`flex flex-row items-center justify-between w-11/12`}>
      <View style={styles.extraControls}>
        <TouchableOpacity onPress={toggleShuffle}>
          <Ionicons
            name="shuffle-outline"
            size={30}
            color={isShuffle ? "#1DB954" : isDarkTheme ? "#fff" : "#fff"}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity onPress={handlePrev}>
          <Ionicons
            name="play-skip-back-outline"
            size={30}
            color={isDarkTheme ? "#fff" : "#fff"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePlayPause}>
          <Ionicons
            name={isPlaying ? "pause-circle-outline" : "play-circle-outline"}
            size={50}
            color={isDarkTheme ? "#fff" : "#fff"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext}>
          <Ionicons
            name="play-skip-forward-outline"
            size={30}
            color={isDarkTheme ? "#fff" : "#fff"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.extraControls}>
        <TouchableOpacity onPress={toggleRepeat}>
          <Ionicons
            name="repeat-outline"
            size={30}
            color={isRepeat ? "#1DB954" : "#fff" }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "60%",
    marginTop: 16,
  },
  extraControls: {
    flexDirection: "row",
    marginTop: 20,
  },
});

export default Controls;
