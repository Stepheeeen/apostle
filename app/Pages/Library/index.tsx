import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import Topbar from "@/components/reusable/Topbar";
import NavigationBar from "@/components/reusable/Navbar";
import { baseUrl } from "@/constants";

// Interface definitions for type safety
interface Playlist {
  id: string;
  name: string;
  songCount: number;
}

interface PlaylistCardProps {
  item: Playlist;
  onRemoveTrack: (playlistId: string, trackId: string) => void;
}

interface TabProps {
  isActive: boolean;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}

// Reusable Tab component for switching between Playlists and Downloads
const Tab: React.FC<TabProps> = ({ isActive, icon, label, onPress }) => (
  <TouchableOpacity
    style={tw`flex-row items-center py-2 px-4 rounded-full mr-2 ${
      isActive ? "bg-blue-50" : "bg-gray-100"
    }`}
    onPress={onPress}
  >
    <Ionicons name={icon} size={20} color={isActive ? "#007AFF" : "#666666"} />
    <Text
      style={tw`ml-2 text-base ${
        isActive ? "text-[#007AFF]" : "text-gray-600"
      }`}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

// PlaylistCard component to display individual playlist details
const PlaylistCard: React.FC<PlaylistCardProps> = ({ item, onRemoveTrack }) => (
  <TouchableOpacity style={tw`bg-white rounded-xl mb-3 p-4 shadow-sm`}>
    <View style={tw`flex-row justify-between items-center`}>
      <View>
        <Text style={tw`text-base font-semibold mb-1`}>{item.name}</Text>
        <Text style={tw`text-sm text-gray-600`}>{item.songCount} songs</Text>
      </View>
      <TouchableOpacity
        style={tw`p-2`}
        onPress={() => onRemoveTrack(item.id, "track-id-placeholder")}
      >
        <Ionicons name="trash" size={20} color="#FF3B30" />
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

// Empty state component for when no playlists exist
const EmptyPlaylists: React.FC<{ onCreatePlaylist: () => void }> = ({
  onCreatePlaylist,
}) => (
  <View style={tw`flex-1 justify-center items-center py-12`}>
    <Ionicons name="musical-notes" size={48} color="#999999" style={tw`mb-4`} />
    <Text style={tw`text-lg font-semibold mb-2`}>
      Create your first playlist
    </Text>
    <Text style={tw`text-base text-gray-600 mb-6`}>
      It's easy, we'll help you
    </Text>
    <TouchableOpacity
      style={tw`flex-row items-center bg-[#007AFF] py-3 px-6 rounded-full`}
      onPress={onCreatePlaylist}
    >
      <Ionicons
        name="add-circle-outline"
        size={20}
        color="#FFFFFF"
        style={tw`mr-2`}
      />
      <Text style={tw`text-white text-base font-semibold`}>
        Create Playlist
      </Text>
    </TouchableOpacity>
  </View>
);

// Empty state component for downloads tab
const EmptyDownloads: React.FC = () => (
  <View style={tw`bg-orange-50 p-4 rounded-xl my-6`}>
    <Text style={tw`text-base text-orange-600 text-center`}>
      No downloaded playlists found. Your downloaded music will appear here.
    </Text>
  </View>
);

// Create a base axios instance with common configuration
const api = axios.create({
  baseURL: "https://apostle.onrender.com/api/playlist",
  headers: {
    "Content-Type": "application/json",
  },
});

const PlaylistManager: React.FC = () => {
  // State management for component
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"playlists" | "downloads">(
    "playlists"
  );
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [downloads, setDownloads] = useState<Playlist[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // State for Add Playlist Modal
  const [isAddPlaylistModalVisible, setIsAddPlaylistModalVisible] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");

  // Initial data loading effect (simulated with setTimeout)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Mock initial data
      setPlaylists([
        { id: "1", name: "Favorites", songCount: 12 },
        { id: "2", name: "Workout Mix", songCount: 8 },
      ]);
      setDownloads([{ id: "1", name: "Summer Hits", songCount: 5 }]);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter playlists and downloads based on search query
  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDownloads = downloads.filter((download) =>
    download.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Create a new playlist via API
  const handleCreatePlaylist = async () => {
    if (!newPlaylistName.trim()) return;

    try {
      const response = await api.post(`/newPlayList`, {
        name: newPlaylistName,
      });

      const data = response.data;
      setPlaylists((prevPlaylists) => [
        ...prevPlaylists,
        { id: data.id, name: data.name, songCount: 0 },
      ]);

      // Reset modal state
      setNewPlaylistName("");
      setIsAddPlaylistModalVisible(false);
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  const AddPlaylistModal = () => {
    // Track input validation state
    const [inputError, setInputError] = useState<string | null>(null);

    const validatePlaylistName = (name: string) => {
      // Trim the name to remove leading/trailing whitespaces
      const trimmedName = name.trim();

      // Check if name is empty
      if (!trimmedName) {
        setInputError("Playlist name cannot be empty");
        return false;
      }

      // Check name length (3-30 characters)
      if (trimmedName.length < 3) {
        setInputError("Playlist name must be at least 3 characters long");
        return false;
      }

      if (trimmedName.length > 30) {
        setInputError("Playlist name cannot exceed 30 characters");
        return false;
      }

      // Optional: Check for unique playlist names
      const isDuplicate = playlists.some(
        (playlist) => playlist.name.toLowerCase() === trimmedName.toLowerCase()
      );

      if (isDuplicate) {
        setInputError("A playlist with this name already exists");
        return false;
      }

      // Clear any previous errors
      setInputError(null);
      return true;
    };

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isAddPlaylistModalVisible}
        onRequestClose={() => setIsAddPlaylistModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={tw`flex-1 justify-center items-center bg-black/50`}
        >
          <View style={tw`bg-white p-6 rounded-xl w-[85%]`}>
            <Text style={tw`text-lg font-semibold mb-4 text-center`}>
              Create New Playlist
            </Text>

            <TextInput
              style={tw`border ${
                inputError ? "border-red-500 bg-red-50" : "border-gray-300"
              } rounded-xl p-3 mb-2 text-base`}
              placeholder="Enter playlist name"
              value={newPlaylistName}
              onChangeText={setNewPlaylistName}
              maxLength={30}
              placeholderTextColor="#999"
            />

            {/* Error message display */}
            {inputError && (
              <Text style={tw`text-red-500 text-sm mb-4 text-center`}>
                {inputError}
              </Text>
            )}

            <View style={tw`flex-row justify-between`}>
              <TouchableOpacity
                style={tw`bg-gray-100 py-3 px-6 rounded-full flex-1 mr-2`}
                onPress={() => {
                  setIsAddPlaylistModalVisible(false);
                  // Reset states
                  setNewPlaylistName("");
                  setInputError(null);
                }}
              >
                <Text style={tw`text-center text-gray-700`}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={tw`bg-[#007AFF] py-3 px-6 rounded-full flex-1 ${
                  !newPlaylistName.trim() || inputError ? "opacity-50" : ""
                }`}
                onPress={handleCreatePlaylist}
                disabled={!newPlaylistName.trim() || !!inputError}
              >
                <Text style={tw`text-center text-white`}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  };

  // Handler to show add playlist modal
  const handleAddPlaylistButton = () => {
    setIsAddPlaylistModalVisible(true);
  };

  // Add track to playlist via API
  const handleAddToPlaylist = async (playlistId: string, trackId: string) => {
    try {
      const response = await api.post("/addToPlayList", {
        _id: playlistId,
        trackId,
      });
      console.log("Track added:", response.data);
    } catch (error) {
      console.error("Error adding track:", error);
    }
  };

  // Delete a playlist via API
  const handleDeletePlaylist = async (playlistId: string) => {
    try {
      const response = await api.post("/deletePlayList", {
        _id: playlistId,
      });

      const data = response.data;
      setPlaylists(playlists.filter((playlist) => playlist.id !== data._id));
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  // Remove a track from a playlist via API
  const handleRemoveTrack = async (playlistId: string, trackId: string) => {
    try {
      const response = await api.post("/removeTrackFromPlayList", {
        _id: playlistId,
        trackId,
      });

      console.log("Track removed:", response.data);
    } catch (error) {
      console.error("Error removing track:", error);
    }
  };

  // Loading state while fetching initial data
  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  // Main render method
  return (
    <>
      {/* Top navigation bar */}
      <Topbar />
      <SafeAreaView>
        {/* Search and Add Playlist Section */}
        <View style={tw`flex-row items-center mx-4 my-4`}>
          <TextInput
            style={tw`flex-1 px-4 py-3 bg-gray-100 rounded-xl text-base mr-2`}
            placeholder="Search playlists..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />
          <TouchableOpacity
            style={tw`bg-[#007AFF] p-3 rounded-xl`}
            onPress={handleAddPlaylistButton}
          >
            <Ionicons name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Tabs for Playlists and Downloads */}
        <View style={tw`flex-row px-4 mb-4`}>
          <Tab
            isActive={activeTab === "playlists"}
            icon="musical-notes"
            label="Playlists"
            onPress={() => setActiveTab("playlists")}
          />
          <Tab
            isActive={activeTab === "downloads"}
            icon="download"
            label="Downloads"
            onPress={() => setActiveTab("downloads")}
          />
        </View>

        {/* Playlist/Downloads List */}
        <FlatList
          data={
            activeTab === "playlists" ? filteredPlaylists : filteredDownloads
          }
          renderItem={({ item }) => (
            <PlaylistCard item={item} onRemoveTrack={handleRemoveTrack} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={tw`p-4 grow`}
          ListEmptyComponent={
            activeTab === "playlists" ? (
              <EmptyPlaylists onCreatePlaylist={handleAddPlaylistButton} />
            ) : (
              <EmptyDownloads />
            )
          }
        />
      </SafeAreaView>

      {/* Add Playlist Modal */}
      <AddPlaylistModal />

      {/* Bottom navigation bar */}
      <NavigationBar />
    </>
  );
};

export default PlaylistManager;
