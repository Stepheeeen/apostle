import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
} from "react-native";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Topbar from "@/components/reusable/Topbar";
import NavigationBar from "@/components/reusable/Navbar";
import Tab from "./Tab";
import PlaylistCard from "./PlaylistCard";
import AddPlaylistModal from "./AddPlaylistModal";
import EmptyPlaylists from "./EmptyPlaylists";
import EmptyDownloads from "./EmptyDownloads";
import { baseUrl } from "@/constants";
import { Playlist } from "@/constants/Types";

const PlaylistManager: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"playlists" | "downloads">(
    "playlists"
  );
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [downloads, setDownloads] = useState<Playlist[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isAddPlaylistModalVisible, setIsAddPlaylistModalVisible] =
    useState(false);

  const [userId, setUserId] = useState<string | null>(null);

  // Fetch userId from AsyncStorage
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (storedUserId) {
          setUserId(storedUserId);
        } else {
          console.warn("User ID not found in AsyncStorage");
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  // Fetch playlists when userId is available
  useEffect(() => {
    const fetchPlaylists = async () => {
      if (!userId) return;

      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://apostle.onrender.com/api/playlist/getUserPlayList/${userId}`, {withCredentials: true}
        );
        setPlaylists(response.data); // Assuming response.data is an array of playlists
      } catch (error) {
        console.error("Error fetching playlists:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaylists();
  }, [userId]);

  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredDownloads = downloads.filter((download) =>
    download.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddPlaylistButton = () => setIsAddPlaylistModalVisible(true);

  return (
    <>
      <Topbar />
      <SafeAreaView style={tw`flex-1`}>
        <View style={tw`flex-row items-center mx-4 my-4`}>
          <TextInput
            style={tw`flex-1 px-4 py-3 bg-gray-100 rounded-xl text-base mr-2`}
            placeholder="Search playlists..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <View style={tw`flex-row px-4 mb-4`}>
          <Tab
            isActive={activeTab === "playlists"}
            label="Playlists"
            onPress={() => setActiveTab("playlists")}
          />
          <Tab
            isActive={activeTab === "downloads"}
            label="Downloads"
            onPress={() => setActiveTab("downloads")}
          />
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" style={tw`mt-10`} />
        ) : (
          <FlatList
            data={
              activeTab === "playlists" ? filteredPlaylists : filteredDownloads
            }
            renderItem={({ item }) => <PlaylistCard item={item} />}
            keyExtractor={(item: any) => item._id} // Ensure `_id` is unique for each playlist
            ListEmptyComponent={
              activeTab === "playlists" ? (
                <EmptyPlaylists onCreatePlaylist={handleAddPlaylistButton} />
              ) : (
                <EmptyDownloads />
              )
            }
          />
        )}
      </SafeAreaView>
      <AddPlaylistModal
        visible={isAddPlaylistModalVisible}
        onClose={() => setIsAddPlaylistModalVisible(false)}
        playlists={playlists}
        setPlaylists={setPlaylists}
      />
      <NavigationBar />
    </>
  );
};

export default PlaylistManager;
