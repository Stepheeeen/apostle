import axios from "axios";
import {
  GetCategories,
  GetQuickPicks,
  GetTrending,
} from "@/components/getPlaylists/getPlaylists";
import NavigationBar from "@/components/reusable/Navbar";
import { SearchSkeleton } from "@/components/reusable/Skeleton";
import Topbar from "@/components/reusable/Topbar";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import tw from "twrnc";
import { SongProvider } from "@/contexts/SongContext";
import MiniPlayer from "@/components/musicPlayer/Miniplayer";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]); // State to store search results
  const [isSearching, setIsSearching] = useState(false); // To handle loading state for search results

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // 0.5 seconds

    return () => clearTimeout(timer);
  }, []);

  // Fetch data based on search query using axios
  useEffect(() => {
    if (search === "") {
      setResults([]); // Clear results if search is empty
      return;
    }

    setIsSearching(true);
    axios
      .get(`https://apostle.onrender.com/api/song/getSongWithQuery/${search}`)
      .then((response) => {
        setResults(response.data.data); // Set fetched data
        setIsSearching(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsSearching(false);
      });
  }, [search]);

  return (
    <>
      {isLoading ? (
        <SearchSkeleton />
      ) : (
        <SongProvider>
          {/* Logo and Avatar Header */}
          <KeyboardAvoidingView
            style={{ flex: 1, marginBottom: 160 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <Topbar />
            <View
              style={tw`flex-row items-center w-auto bg-white rounded-lg p-3 py-2 shadow-md mx-4 mb-2`}
            >
              <MaterialIcons
                name="search"
                size={24}
                color="black"
                style={tw`mr-2`}
              />
              <TextInput
                placeholder="Albums, Songs, Podcasts, Artists ..."
                placeholderTextColor="gray"
                style={tw`text-base flex-1`}
                value={search}
                onChangeText={setSearch} // Corrected: updates state with text
              />
            </View>

            {search === "" ? (
              <ScrollView style={tw`bg-gray-50 h-full w-full`}>

                {/* Categories section */}
                <View style={tw`w-[98%]`}>
                  <Text style={tw`text-lg font-bold mb-3 px-4`}>
                    Browse all
                  </Text>
                  <GetCategories />
                </View>
              </ScrollView>
            ) : (
              <FlatList
                data={results}
                renderItem={({ item }: any) => (
                  <View
                    style={tw`flex flex-row border-b border-gray-100 p-3 px-6 mb-2 mt-3`}
                  >
                    {/* Track Image */}
                    <Image
                      source={{ uri: item.trackImg }}
                      style={tw`w-14 h-14 rounded-lg mb-3`}
                    />
                    <View style={tw`ml-2`}>
                      <Text style={tw`font-bold text-lg`}>{item.title}</Text>
                      <Text style={tw`text-sm text-gray-600`}>
                        {item.author}
                      </Text>
                    </View>
                  </View>
                )}
                keyExtractor={(item: any) => item.trackId} // Using trackId as unique key
                ListHeaderComponent={
                  isSearching ? <Text>Loading...</Text> : null
                }
              />
            )}
          </KeyboardAvoidingView>
          {/* MiniPlayer */}

          {/* <NavigationBar /> */}
        </SongProvider>
      )}
    </>
  );
};

export default Index;
