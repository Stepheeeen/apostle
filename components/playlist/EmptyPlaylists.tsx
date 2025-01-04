import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";

interface EmptyPlaylistsProps {
  onCreatePlaylist: () => void;
}

const EmptyPlaylists: React.FC<EmptyPlaylistsProps> = ({
  onCreatePlaylist,
}) => (
  <View style={tw`flex-1 justify-center items-center py-12`}>
    {/* <Ionicons name="musical-notes" size={48} color="#999999" style={tw`mb-4`} /> */}
    <Text style={tw`text-lg font-semibold mb-2`}>
      Create your first playlist
    </Text>
    <Text style={tw`text-sm text-gray-600 mb-6`}>
      It's easy, we'll help you
    </Text>
    <TouchableOpacity
      style={tw`flex-row items-center bg-black py-2 px-6 rounded-full`}
      onPress={onCreatePlaylist}
    >
      <Text style={tw`text-white text-base font-semibold`}>
        CREATE
      </Text>
    </TouchableOpacity>
  </View>
);

export default EmptyPlaylists;
