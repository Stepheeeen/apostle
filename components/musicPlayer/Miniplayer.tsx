import React, { useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import tw from "twrnc";
import LikeToggle from "../reusable/LikeToggle";
import MusicPlayer from "./MusicPlayer";
import { useAudio } from "@/contexts/AudioContext";

const MiniPlayer = () => {
  const { currentSong } = useAudio();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const songTitle = currentSong?.title || "No Song Playing";
  const songAuthor = currentSong?.author || "Unknown Author";
  const songImage =
    currentSong?.trackImg || "https://via.placeholder.com/150x150";

  return (
    <>
      <Pressable
        onPress={() => setIsDrawerOpen(true)}
        style={tw`absolute bottom-[12%] left-[2%] right-0 flex-row items-center justify-between p-3 bg-[#3EB3F2] rounded-lg w-[96%]`}
      >
        <Image source={{ uri: songImage }} style={tw`w-12 h-12 rounded-md`} />
        <View style={tw`flex-1 ml-4`}>
          <Text style={tw`text-white font-bold`}>{songTitle}</Text>
          <Text style={tw`text-white`}>{songAuthor}</Text>
        </View>
        <LikeToggle
          trackId={currentSong?.trackId}
          initialLiked={false}
          onLikeChange={(newLikeStatus: any) =>
            console.log("Updated like status:", newLikeStatus)
          }
        />
      </Pressable>

      {isDrawerOpen && (
        <MusicPlayer closeDrawer={() => setIsDrawerOpen(false)} />
      )}
    </>
  );
};

export default MiniPlayer;
