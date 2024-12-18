import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Modal,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useSongContext } from "@/contexts/SongContext";
import { Audio } from "expo-av";
import tw from "twrnc";
import Slider from "@react-native-community/slider";
import Controls from "@/components/musicPlayer/Controls";
import Svg, { Path } from "react-native-svg";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AddToPlaylistModal from "@/components/playlist/AddToPlaylist";

const MusicPlayer: React.FC<{ closeDrawer: () => void }> = ({
  closeDrawer,
}) => {
  const { currentSong } = useSongContext(); // Access the current song from context
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (!currentSong) return;

    const loadSound = async () => {
      if (currentSong.previewUrl) {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: currentSong.previewUrl },
          { shouldPlay: isPlaying }
        );
        setSound(newSound);

        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded) {
            setDuration(status.durationMillis || 0);
            setProgress(status.positionMillis || 0);
          }
        });
      }
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [currentSong, isPlaying]);

  const handlePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    // Handle the next track functionality
    console.log("Next track");
  };

  const handlePrev = () => {
    // Handle the previous track functionality
    console.log("Previous track");
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  const handleSliderChange = async (value: number) => {
    if (sound) {
      await sound.setPositionAsync(value);
      setProgress(value);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!currentSong) {
    return null; // Don't render the MusicPlayer if no song is selected
  }

  return (
    <>
      <Modal
        transparent={true}
        animationType="slide"
        visible={true}
        onRequestClose={closeDrawer}
        style={tw`absolute w-full h-full`}
      >
        <View style={tw`flex-1 justify-end bg-black bg-opacity-50 h-full`}>
          <View
            style={tw`bg-[#0081C9] p-5 py-10 rounded-t-lg h-full flex justify-between items-center w-full`}
          >
            <View style={tw`w-full flex flex-row justify-between items-center`}>
              <Pressable onPress={closeDrawer}>
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
            {/* Image and song details */}
            <View style={tw`items-center`}>
              <Image
                source={{ uri: currentSong.trackImg }}
                style={tw`w-[330px] h-[330px] mb-4 rounded`}
              />
            </View>

            <View style={tw`w-full mb-6`}>
              <View
                style={tw`w-full flex flex-row justify-between items-center`}
              >
                <View>
                  <Text style={tw`text-xl font-semibold text-white`}>
                    {currentSong.title}
                  </Text>
                  <Text style={tw`text-base text-white`}>
                    {currentSong.author}
                  </Text>
                </View>

                <Pressable>
                  <FontAwesome name="heart-o" size={24} color="white" />
                </Pressable>
              </View>
              {/* Progress slider */}
              <View style={tw`mt-4`}>
                <Slider
                  style={tw`w-full`}
                  minimumValue={0}
                  maximumValue={duration}
                  value={progress}
                  onValueChange={handleSliderChange}
                  minimumTrackTintColor="#1DB954"
                  maximumTrackTintColor="rgba(255, 255, 255, 0.5)"
                  thumbTintColor="#fff"
                />
                <View style={tw`flex-row justify-between`}>
                  <Text style={tw`text-sm text-white`}>
                    {formatTime(progress)}
                  </Text>
                  <Text style={tw`text-sm text-white`}>
                    {formatTime(duration)}
                  </Text>
                </View>
              </View>

              {/* Controls component */}
              <Controls
                isPlaying={isPlaying}
                handlePlayPause={handlePlayPause}
                handleNext={handleNext}
                handlePrev={handlePrev}
                isShuffle={isShuffle}
                toggleShuffle={toggleShuffle}
                isRepeat={isRepeat}
                toggleRepeat={toggleRepeat}
                isDarkTheme={false} // Adjust based on theme
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Add to Playlist Modal */}
      <AddToPlaylistModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        trackId={currentSong.trackId}
      />
    </>
  );
};

export default MusicPlayer;
