import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import { Playlist } from "@/constants/Types";

interface PlaylistCardProps {
  item: Playlist;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ item }: any) => (
  <TouchableOpacity style={tw`bg-white rounded-xl mb-3 p-4 shadow-sm`}>
    <View style={tw`flex-row justify-between items-center`}>
      <View>
        <Text style={tw`text-base font-semibold mb-1`}>{item.name}</Text>
        <Text style={tw`text-sm text-gray-600`}>{item.songCount} songs</Text>
      </View>
      <TouchableOpacity style={tw`p-2`}>
        <Ionicons name="trash" size={20} color="#FF3B30" />
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

export default PlaylistCard;
