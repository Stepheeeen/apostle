import React, { useEffect, useState } from "react";
import AudioPlayer from "@/components/musicPlayer/AudioPlayer";
import { View, Text, ScrollView, Pressable, Image } from "react-native";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import { SkeletonLoader } from "@/components/reusable/Skeleton";
import CarouselComponent from "@/components/carouselSlide/Carousel";
import NavigationBar from "@/components/reusable/Navbar";
import Topbar from "@/components/reusable/Topbar";
const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <>
          {/* Logo and Avatar Header */}
          <Topbar />

          <ScrollView style={tw`bg-gray-50 h-full w-full`}>
            {/* Main Content */}
            <CarouselComponent />

            {/* Recently Played Section */}
            <View style={tw`px-4 mb-6 mt-4`}>
              <Text style={tw`text-lg font-bold mb-3`}>Recently Played</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                  <View key={item} style={tw`mr-4`}>
                    <View style={tw`w-32 h-32 bg-gray-200 rounded-lg mb-2`} />
                    <Text style={tw`text-sm font-medium`}>Album Title</Text>
                    <Text style={tw`text-xs text-gray-600`}>Artist Name</Text>
                  </View>
                ))}
              </ScrollView>
            </View>

            {/* Quick Picks Section */}
            <View style={tw`px-4 mb-6`}>
              <Text style={tw`text-lg font-bold mb-3`}>Quick picks</Text>
              <View style={tw`gap-y-2`}>
                {[1, 2, 3].map((item) => (
                  <Pressable
                    key={item}
                    style={tw`flex-row items-center p-2 bg-white rounded-lg shadow-sm`}
                  >
                    <View style={tw`w-12 h-12 bg-gray-200 rounded mr-3`} />
                    <View style={tw`flex-1`}>
                      <Text style={tw`font-medium`}>Song Title</Text>
                      <Text style={tw`text-sm text-gray-600`}>Artist Name</Text>
                    </View>
                    <Ionicons name={"play"} size={24} color={"#0081C9"} />
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Podcasts Section */}
            <View style={tw`px-4 mb-6`}>
              <Text style={tw`text-lg font-bold mb-3`}>Podcasts</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                  <View key={item} style={tw`mr-4`}>
                    <View style={tw`w-40 h-40 bg-gray-200 rounded-lg mb-2`} />
                    <Text style={tw`text-sm font-medium`}>Podcast Title</Text>
                    <Text style={tw`text-xs text-gray-600`}>Episode Info</Text>
                  </View>
                ))}
              </ScrollView>
            </View>

            {/* New Releases */}
            <View style={tw`px-4 mb-6`}>
              <Text style={tw`text-lg font-bold mb-3`}>New Releases</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                  <View key={item} style={tw`mr-4`}>
                    <View style={tw`w-32 h-32 bg-gray-200 rounded-lg mb-2`} />
                    <Text style={tw`text-sm font-medium`}>
                      New Release Title
                    </Text>
                    <Text style={tw`text-xs text-gray-600`}>Artist Name</Text>
                  </View>
                ))}
              </ScrollView>
            </View>

            {/* Trending */}
            <View style={tw`px-4 mb-6`}>
              <Text style={tw`text-lg font-bold mb-3`}>Trending</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                  <View key={item} style={tw`mr-4`}>
                    <View style={tw`w-32 h-32 bg-gray-200 rounded-lg mb-2`} />
                    <Text style={tw`text-sm font-medium`}>Trending Title</Text>
                    <Text style={tw`text-xs text-gray-600`}>Artist Name</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          </ScrollView>

          {/* Uncomment the AudioPlayer component when needed */}
          {/* <AudioPlayer /> */}

          <NavigationBar />
        </>
      )}
    </>
  );
};

export default Index;