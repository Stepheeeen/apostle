import { Playlist } from "@/constants/Types";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import tw from "twrnc";
import axios from "axios"; // Make sure to install axios: npm install axios

interface AddPlaylistModalProps {
  visible: boolean;
  onClose: () => void;
  playlists: Playlist[];
  setPlaylists: React.Dispatch<React.SetStateAction<Playlist[]>>;
}

const AddPlaylistModal: React.FC<AddPlaylistModalProps> = ({
  visible,
  onClose,
  playlists,
  setPlaylists,
}) => {
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreatePlaylist = async () => {
    // Validate playlist name
    if (!newPlaylistName.trim()) {
      Alert.alert("Error", "Playlist name cannot be empty");
      return;
    }

    setIsLoading(true);

    try {
      // API call to create playlist
      const response = await axios.post(
        "https://apostle.onrender.com/api/playlist/newPlayList",
        {
          name: newPlaylistName,
        }
      );

      console.log(response.data);

      // Add the new playlist to the local state
      // const newPlaylist = response.data; // Assuming the API returns the created playlist object
      // setPlaylists([...playlists, newPlaylist]);

      // Reset and close modal
      setNewPlaylistName("");
      onClose();
    } catch (error) {
      console.error("Failed to create playlist", error);
      Alert.alert("Error", "Failed to create playlist. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`flex-1 justify-center items-center bg-black/50`}
      >
        <View style={tw`bg-white w-5/6 p-6 rounded-xl shadow-lg`}>
          <Text style={tw`text-xl font-bold mb-4 text-center`}>
            Create New Playlist
          </Text>
          <TextInput
            placeholder="Enter playlist name"
            value={newPlaylistName}
            onChangeText={setNewPlaylistName}
            style={tw`border border-gray-300 rounded p-3 mb-4 text-base`}
            placeholderTextColor={tw.color("gray-400")}
            autoCorrect={false}
            autoCapitalize="none"
          />
          <View style={tw`flex-row justify-between`}>
            <TouchableOpacity
              onPress={onClose}
              style={tw`flex-1 bg-gray-200 py-3 rounded-lg mr-2`}
              disabled={isLoading}
            >
              <Text style={tw`text-center text-gray-600 font-medium`}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCreatePlaylist}
              style={tw`flex-1 bg-blue-600 py-3 rounded-lg ${
                isLoading ? "opacity-50" : ""
              }`}
              disabled={isLoading}
            >
              <Text style={tw`text-center text-white font-medium`}>
                {isLoading ? "Creating..." : "Create"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddPlaylistModal;
