import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";

const AddToPlaylistModal = ({
  isVisible,
  onClose,
  trackId,
}: {
  isVisible: boolean;
  onClose: () => void;
  trackId: string;
}) => {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  const [playlistId, setPlaylistId] = useState("");

  // Fetch the user's playlists
  const fetchPlaylists = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://apostle.onrender.com/api/playlist/getUserAllPlayList",
        { withCredentials: true }
      );
      setPlaylists(response.data.data || []);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Call fetchPlaylists when the modal opens
  useEffect(() => {
    if (isVisible) {
      fetchPlaylists();
    }
  }, [isVisible]);

  // Handle adding a track to a playlist
  const handleAddToPlaylist = async () => {
    try {
      const response = await axios.post(
        "https://apostle.onrender.com/api/playlist/addToPlayList",
        { _id: playlistId, trackId }
      );
      console.log("Track added:", response.data);
      alert("Track added to playlist successfully!");
      onClose(); // Close the modal after success
    } catch (error: any) {
      console.error("Error adding track to playlist:", error.response.data);
      alert("Failed to add track. Please try again.");
    }
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={tw`flex-1 justify-center bg-black/50`}>
        <View style={tw`bg-white rounded-lg mx-6 p-4`}>
          {/* Header */}
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={tw`text-xl font-semibold`}>Add to Playlist</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {/* Loading Indicator */}
          {isLoading ? (
            <ActivityIndicator size="large" color="#007AFF" />
          ) : (
            <>
              {/* No Playlists */}
              {playlists.length === 0 ? (
                <Text style={tw`text-gray-500 text-center`}>
                  No playlists available.
                </Text>
              ) : (
                // List of Playlists
                <FlatList
                  data={playlists}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={tw`p-3 border-b border-gray-200`}
                      onPress={() => {
                        setPlaylistId(item._id);
                        console.log(playlistId);
                        handleAddToPlaylist();
                      }}
                    >
                      <Text style={tw`text-lg`}>{item.name}</Text>
                      <Text style={tw`text-sm text-gray-500`}>
                        {item.tracks?.length || 0} songs
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              )}
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default AddToPlaylistModal;
