import React from "react";
import { Tabs, useRouter, usePathname } from "expo-router";
import { Entypo, AntDesign } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";
import MiniPlayer from "@/components/musicPlayer/Miniplayer"; // Your player
import { SongProvider } from "@/contexts/SongContext";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import tw from "twrnc";

export default function Layout() {
  const router = useRouter();
  const pathname = usePathname();

  const Links = [
    {
      path: "/tabs/Home",
      link: "home",
      icon: (
        <Entypo
          name="home"
          size={27}
          color={pathname === "/tabs/Home" ? "#FFFFFF" : "#CCCCCC"}
        />
      ),
    },
    {
      path: "/tabs/Search",
      link: "search",
      icon: (
        <AntDesign
          name="search1"
          size={27}
          color={pathname === "/tabs/Search" ? "#FFFFFF" : "#CCCCCC"}
        />
      ),
    },
    {
      path: "/tabs/Library",
      link: "library",
      icon: (
        <Svg width="27" height="27" viewBox="0 0 30 30" fill="none">
          <Path
            d="M17.2064 1.23726L29.25 28.2847L27.8526 28.9099L15.8091 1.86243L17.2064 1.23726ZM0.75 28.8915V1.09015H2.29457V28.8915H0.75ZM10.0171 28.8915V1.09015H11.5617V28.8915H10.0171Z"
            fill={pathname === "/tabs/Library" ? "#FFFFFF" : "#CCCCCC"}
          />
        </Svg>
      ),
    },
  ];

  return (
    <SongProvider>
      <SafeAreaView style={tw`flex-1 bg-gray-100`}>
        {/* Tabs Navigation */}
        <Tabs
          screenOptions={{
            headerShown: false, // Hide screen headers
            tabBarStyle: { display: "none" }, // Hide default TabBar
          }}
        >
          <Tabs.Screen name="Home" />
          <Tabs.Screen name="Search" />
          <Tabs.Screen name="Library" />
        </Tabs>

        {/* Custom Bottom Navigation */}
        <MiniPlayer />
        <View
          style={tw`absolute bottom-0 left-0 right-0 bg-[#0081C9] p-3 py-5 shadow-lg flex-row justify-between items-center`}
        >
          {Links.map((link, index) => (
            <TouchableOpacity
              key={index}
              style={tw`flex-row items-center px-5 py-1 ${
                pathname === link.path
                  ? "border border-white rounded-full py-2 gap-2"
                  : ""
              }`}
              onPress={() => router.push(link.path)}
            >
              {pathname === link.path ? (
                <View style={tw`flex flex-row gap-x-2`}>
                  {link.icon}
                  <Text style={tw`font-medium text-lg text-[#FFFFFF]`}>
                    {link.link.charAt(0).toUpperCase() + link.link.slice(1)}
                  </Text>
                </View>
              ) : (
                link.icon
              )}
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </SongProvider>
  );
}