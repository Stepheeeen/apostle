import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import tw from "twrnc";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Svg, { Path } from "react-native-svg";
import Slider from "@react-native-community/slider";
import LikeToggle from "@/components/reusable/LikeToggle";
import AddToPlaylistModal from "@/components/playlist/AddToPlaylist";
import { useAudio } from "@/contexts/AudioContext";
import { StyleSheet } from "react-native";

interface MusicPlayerProps {
  closeDrawer: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ closeDrawer }) => {
  const {
    currentSong,
    isPlaying,
    progress,
    duration,
    isShuffle,
    isRepeat,
    playPauseSong,
    handleSliderChange,
    handlePrev,
    handleNext,
    toggleShuffle,
    toggleRepeat,
    formatTime,
  } = useAudio();
  const [isModalVisible, setIsModalVisible] = useState(false);

  if (!currentSong) return null;

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={true}
      onRequestClose={closeDrawer}
    >
      <View style={tw`flex-1 justify-end bg-black bg-opacity-50 h-full`}>
        <View
          style={tw`bg-[#0081C9] p-5 py-10 rounded-t-lg h-full flex items-center w-full`}
        >
          <View style={tw`w-full flex flex-row justify-between items-center`}>
            <Pressable onPress={closeDrawer}>
              <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M20.3237 6.98446C20.6399 7.25201 20.6793 7.72525 20.4118 8.04145L12.6462 17.2189C12.5035 17.3876 12.2937 17.4847 12.0728 17.4845C11.8519 17.4842 11.6423 17.3865 11.5 17.2176L3.9831 8.29124C3.71629 7.97441 3.75685 7.50127 4.07368 7.23446C4.39052 6.96765 4.86366 7.0082 5.13047 7.32504L12.0751 15.5717L19.2667 7.07254C19.5342 6.75633 20.0075 6.7169 20.3237 6.98446Z"
                  fill="white"
                />
              </Svg>
            </Pressable>
            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
              <MaterialCommunityIcons
                name="playlist-music-outline"
                size={30}
                color="white"
              />
            </TouchableOpacity>
          </View>

          <View
            style={tw`bg-[#0081C9] pt-[10%] rounded-t-lg h-[90%] flex justify-between items-center w-full`}
          >
            <View style={tw`items-center`}>
              <Image
                source={{
                  uri: currentSong.trackImg || "https://via.placeholder.com/150",
                }}
                style={tw`w-[330px] h-[330px] mb-8 rounded-lg`}
              />
            </View>

            <View
              style={tw`w-full flex flex-row justify-between items-center mt-4`}
            >
              <View>
                <Text style={tw`text-xl font-semibold text-white`}>
                  {currentSong.title}
                </Text>
                <Text style={tw`text-base text-white`}>
                  {currentSong.author}
                </Text>
              </View>
              <LikeToggle />
            </View>

            <View style={tw`flex-row justify-between w-full`}>
              <Text style={tw`text-xs text-white`}>{formatTime(progress)}</Text>
              <Slider
                style={tw`w-[90%]`}
                minimumValue={0}
                maximumValue={duration}
                value={progress}
                onValueChange={handleSliderChange}
                minimumTrackTintColor="#1DB954"
                maximumTrackTintColor="rgba(255, 255, 255, 0.5)"
                thumbTintColor="#fff"
              />
              <Text style={tw`text-xs text-white`}>{formatTime(duration)}</Text>
            </View>

            <View
              style={tw`flex flex-row items-center justify-between w-11/12`}
            >
              <View style={styles.extraControls}>
                <TouchableOpacity onPress={toggleShuffle}>
                  <Ionicons
                    name="shuffle-outline"
                    size={30}
                    color={isShuffle ? "#1DB954" : "#fff"}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.controls}>
                <TouchableOpacity onPress={handlePrev}>
                  <AntDesign name="stepbackward" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => playPauseSong(currentSong)}>
                  <Ionicons
                    name={isPlaying ? "pause" : "play"}
                    size={50}
                    color="#fff"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNext}>
                  <AntDesign name="stepforward" size={30} color="white" />
                </TouchableOpacity>
              </View>
              <View style={styles.extraControls}>
                <TouchableOpacity onPress={toggleRepeat}>
                  <Ionicons
                    name="repeat-outline"
                    size={30}
                    color={isRepeat ? "#1DB954" : "#fff"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>

      <AddToPlaylistModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        trackId={currentSong.trackId}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "60%",
    marginTop: 16,
    marginLeft: 15,
  },
  extraControls: {
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 15,
  },
});

export default MusicPlayer;