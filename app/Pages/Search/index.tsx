import NavigationBar from "@/components/reusable/Navbar";
import SearchBar from "@/components/reusable/Searchbar";
import { SearchSkeleton } from "@/components/reusable/Skeleton";
import Topbar from "@/components/reusable/Topbar";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import tw from "twrnc";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // 0.5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <SearchSkeleton />
      ) : (
        <>
          {/* Logo and Avatar Header */}
          <KeyboardAvoidingView
            style={{ flex: 1, marginBottom: 80 }}
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
                {/* Trending */}
                <View style={tw`px-4 mb-6`}>
                  <Text style={tw`text-lg font-bold mb-3`}>
                    Recommended Albums & Playlists
                  </Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                      <View key={item} style={tw`mr-4`}>
                        <View
                          style={tw`w-30 h-30 bg-gray-200 rounded-xl mb-2`}
                        />
                      </View>
                    ))}
                  </ScrollView>
                </View>

                {/* Quick Picks Section */}
                <View style={tw`px-4 mb-6`}>
                  <Text style={tw`text-lg font-bold mb-3`}>
                    Recommended Musics & Podcasts
                  </Text>
                  <View style={tw`gap-y-3`}>
                    {[1, 2, 3, 4].map((item) => (
                      <Pressable
                        key={item}
                        style={tw`flex-row items-center p-2 bg-white rounded-lg shadow-sm`}
                      >
                        <View style={tw`w-12 h-12 bg-gray-200 rounded mr-3`} />
                        <View style={tw`flex-1`}>
                          <Text style={tw`font-medium`}>Song Title</Text>
                          <Text style={tw`text-sm text-gray-600`}>
                            Artist Name
                          </Text>
                        </View>
                        <Ionicons name={"play"} size={24} color={"#0081C9"} />
                      </Pressable>
                    ))}
                  </View>
                </View>

                {/* Categories section */}
                <View style={tw`w-[98%] p-4`}>
                  <Text style={tw`text-lg font-bold mb-3`}>
                    Recommended Categories
                  </Text>
                  {[
                    {
                      background1: "gray-200",
                      name1: "Music",
                      background2: "gray-200",
                      name2: "Podcast",
                    },
                    {
                      background1: "gray-200",
                      name1: "Artist",
                      background2: "gray-200",
                      name2: "Pastor",
                    },
                    {
                      background1: "gray-200",
                      name1: "Choir",
                      background2: "gray-200",
                      name2: "Song",
                    },
                    {
                      background1: "gray-200",
                      name1: "Minister",
                      background2: "gray-200",
                      name2: "Churche",
                    },
                    {
                      background1: "gray-200",
                      name1: "Preaching",
                      background2: "gray-200",
                      name2: "Hymn",
                    },
                  ].map((container, item) => (
                    <View
                      key={item}
                      style={tw`w-full flex flex-row items-center justify-between gap-3 mb-3`}
                    >
                      <View
                        style={tw`w-1/2 h-25 flex items-center justify-center rounded-lg bg-${container.background1}`}
                      >
                        <Text style={tw`text-[19px] font-medium`}>
                          {container.name1}s
                        </Text>
                      </View>
                      <View
                        style={tw`w-1/2 h-25 flex items-center justify-center rounded-lg bg-${container.background2}`}
                      >
                        <Text style={tw`text-[19px] font-medium`}>
                          {container.name2}s
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </ScrollView>
            ) : (
              <FlatList
                data={[
                  { key: "Devin" },
                  { key: "Dan" },
                  { key: "Dominic" },
                  { key: "Jackson" },
                  { key: "James" },
                  { key: "Joel" },
                ]}
                renderItem={({ item }: any) => (
                  <View style={tw`border-b border-gray-100 p-3 px-6 mb-2 mt-3`}>
                    <Text>{item.key}</Text>
                  </View>
                )}
                keyExtractor={(item) => item.key} // Added keyExtractor for performance optimization
              />
            )}
          </KeyboardAvoidingView>

          <NavigationBar />
        </>
      )}
    </>
  );
};

export default Index;
