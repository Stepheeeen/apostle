import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import Topbar from "@/components/reusable/Topbar";
import NavigationBar from "@/components/reusable/Navbar";

interface Playlist {
  id: string;
  name: string;
  songCount: number;
}

interface PlaylistCardProps {
  item: Playlist;
}

interface TabProps {
  isActive: boolean;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}

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

const PlaylistCard: React.FC<PlaylistCardProps> = ({ item }) => (
  <TouchableOpacity style={tw`bg-white rounded-xl mb-3 p-4 shadow-sm`}>
    <View style={tw`flex-row justify-between items-center`}>
      <View>
        <Text style={tw`text-base font-semibold mb-1`}>{item.name}</Text>
        <Text style={tw`text-sm text-gray-600`}>{item.songCount} songs</Text>
      </View>
      <TouchableOpacity style={tw`p-2`}>
        <Ionicons name="play" size={20} color="#007AFF" />
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

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

const EmptyDownloads: React.FC = () => (
  <View style={tw`bg-orange-50 p-4 rounded-xl my-6`}>
    <Text style={tw`text-base text-orange-600 text-center`}>
      No downloaded playlists found. Your downloaded music will appear here.
    </Text>
  </View>
);

const PlaylistManager: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"playlists" | "downloads">(
    "playlists"
  );
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [downloads, setDownloads] = useState<Playlist[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setPlaylists([
        { id: "1", name: "Favorites", songCount: 12 },
        { id: "2", name: "Workout Mix", songCount: 8 },
      ]);
      setDownloads([{ id: "1", name: "Summer Hits", songCount: 5 }]);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDownloads = downloads.filter((download) =>
    download.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreatePlaylist = () => {
    const newPlaylist: Playlist = {
      id: String(playlists.length + 1),
      name: `New Playlist ${playlists.length + 1}`,
      songCount: 0,
    };
    setPlaylists([...playlists, newPlaylist]);
  };

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <>
      <Topbar />
      <SafeAreaView>
        <TextInput
          style={tw`mx-4 my-4 px-4 py-3 bg-gray-100 rounded-xl text-base`}
          placeholder="Search playlists..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
        />

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

        <FlatList
          data={
            activeTab === "playlists" ? filteredPlaylists : filteredDownloads
          }
          renderItem={({ item }) => <PlaylistCard item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={tw`p-4 grow`}
          ListEmptyComponent={
            activeTab === "playlists" ? (
              <EmptyPlaylists onCreatePlaylist={handleCreatePlaylist} />
            ) : (
              <EmptyDownloads />
            )
          }
        />
      </SafeAreaView>

      <NavigationBar />
    </>
  );
};

export default PlaylistManager;
