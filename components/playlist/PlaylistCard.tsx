import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import axios from "axios";
import { Playlist } from "@/constants/Types";
import { useRouter } from "expo-router";

const PlaylistCard = ({
  item,
  refresh,
}: {
  item: Playlist;
  refresh: () => void;
}) => {
  const router = useRouter();

  const handleDeletePlaylist = async () => {
    try {
      const response = await axios.post(
        "https://apostle.onrender.com/api/playlist/deletePlayList",
        { _id: item._id }
      );
      console.log("Delete response:", response.data);
      refresh(); // Trigger the refresh function after successful deletion
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  return (
    <TouchableOpacity
      style={tw`bg-white rounded-xl mb-3 p-4 shadow-sm`}
      onPress={() => router.push(`/Pages/Playlist/${item._id}`)} // Navigate to the playlist page
    >
      <View style={tw`flex-row justify-between items-center`}>
        <View>
          <Text style={tw`text-base font-semibold mb-1`}>{item.name}</Text>
          <Text style={tw`text-sm text-gray-600`}>
            {item.tracksId?.length || 0}{" "}
            {item.tracksId?.length === 1 ? "song" : "songs"}
          </Text>
        </View>
        <TouchableOpacity style={tw`p-2`} onPress={handleDeletePlaylist}>
          <Ionicons name="trash" size={24} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default PlaylistCard;
