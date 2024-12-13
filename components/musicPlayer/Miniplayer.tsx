import React, { useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useSongContext } from "@/contexts/SongContext"; // Correct import
import tw from "twrnc";
import { FontAwesome } from "@expo/vector-icons";
import MusicPlayer from "@/app/Pages/Sample";

const MiniPlayer = () => {
  const { currentSong, setCurrentSong } = useSongContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Display loading state or fallback if currentSong is not available
  if (!currentSong) {
    return (
      <Pressable
        onPress={() => {}}
        style={tw`absolute bottom-[12%] left-[2%] right-0 flex-row items-center justify-between p-3 bg-[#3EB3F2] rounded-lg w-[96%]`}
      >
        <View style={tw`h-12 w-12 rounded-full bg-gray-300`} />
        <View style={tw`flex-1 ml-4`}>
          <Text style={tw`text-white font-semibold`}>Song Title</Text>
          <Text style={tw`text-white text-sm`}>Author</Text>
        </View>
        <Pressable style={tw`mr-4`}>
          <FontAwesome name="heart-o" size={20} color="white" disabled={true} />
        </Pressable>
      </Pressable>
    );
  }

  const onLike = () => {
    // Handle like functionality here (e.g., save to a favorites list)
    console.log(`Liked song: ${currentSong.title}`);
    console.log(currentSong.trackImg);
  };

  const onPlayPause = () => {
    // Toggle play/pause
    setIsPlaying((prevState) => !prevState);
    if (isPlaying) {
      // Pause the music (e.g., if using expo-av, you can pause the sound)
      console.log("Pause");
    } else {
      // Play the music (e.g., play the sound)
      console.log("Play");
    }
  };

  return (
    <>
      <Pressable
        onPress={() => setIsDrawerOpen(true)}
        style={tw`absolute bottom-[12%] left-[2%] right-0 flex-row items-center justify-between p-3 bg-[#3EB3F2] rounded-lg w-[96%]`}
      >
        <Image
          source={{ uri: currentSong?.trackImg || "" }}
          style={tw`w-12 h-12 rounded-full`}
        />
        <View style={tw`flex-1 ml-4`}>
          <Text style={tw`text-white font-bold`}>
            {currentSong?.title || "No Song Playing"}
          </Text>
          <Text style={tw`text-white`}>{currentSong?.author || ""}</Text>
        </View>

        <Pressable onPress={onLike} style={tw`mr-4`}>
          <FontAwesome name="heart-o" size={20} color="white" />
        </Pressable>
      </Pressable>
      {isDrawerOpen && (
        <MusicPlayer closeDrawer={() => setIsDrawerOpen(false)} />
      )}
    </>
  );
};

export default MiniPlayer;
