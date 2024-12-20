import React from "react";
import { Slot } from "expo-router";
import NavigationBar from "@/components/reusable/Navbar";
import { SafeAreaView, View } from "react-native";
import tw from "twrnc";
import MiniPlayer from "@/components/musicPlayer/Miniplayer";
import { SongProvider } from "@/contexts/SongContext";

const Layout = () => {
  return (
    <SongProvider>
      <SafeAreaView style={tw`flex-1 bg-gray-100`}>
        <View style={tw`flex-1`}>
          {/* Render the current page */}
          <Slot />
        </View>
        {/* Add the navigation bar */}
        <MiniPlayer />
        <NavigationBar />
      </SafeAreaView>
    </SongProvider>
  );
};

export default Layout;