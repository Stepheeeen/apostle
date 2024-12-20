import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useSongContext } from "@/contexts/SongContext"; // Correct import
import tw from "twrnc";
import LikeToggle from "../reusable/LikeToggle";
import MusicPlayer from "./MusicPlayer";

const MiniPlayer = () => {
  const { currentSong } = useSongContext();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Log the playback state whenever it changes
  useEffect(() => {
    console.log("Playback state changed: ", currentSong);
  }, [currentSong]);

  console.log("Playback state changed: ", currentSong);

  // Handle like status change
  const handleLikeChange = (newLikeStatus: boolean) => {
    console.log("Updated like status:", newLikeStatus);
  };

  // Fallback values for song title, author, and image
  const songTitle = currentSong?.title || "No Song Playing";
  const songAuthor = currentSong?.author || "Unknown Author";
  const songImage = currentSong?.trackImg || "https://via.placeholder.com/150x150";

  return (
    <>
      {/* Mini Player */}
      <Pressable
        onPress={() => setIsDrawerOpen(true)}
        style={tw`absolute bottom-[12%] left-[2%] right-0 flex-row items-center justify-between p-3 bg-[#3EB3F2] rounded-lg w-[96%]`}
      >
        <Image
          source={{ uri: songImage }}
          style={tw`w-12 h-12 rounded-md`}
        />
        <View style={tw`flex-1 ml-4`}>
          <Text style={tw`text-white font-bold`}>{songTitle}</Text>
          <Text style={tw`text-white`}>{songAuthor}</Text>
        </View>
        <LikeToggle
          trackId={currentSong?.trackId}
          initialLiked={false}
          onLikeChange={handleLikeChange}
        />
      </Pressable>

      {/* MusicPlayer Drawer */}
      {isDrawerOpen && <MusicPlayer closeDrawer={() => setIsDrawerOpen(false)} />}
    </>
  );
};

export default MiniPlayer;
