import React, { useEffect, useState } from "react";
import { View, Keyboard, TouchableOpacity, Text } from "react-native";
import { router, usePathname } from 'expo-router';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import tw from "twrnc";

const NavigationBar = () => {
  const pathname = usePathname();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  if (isKeyboardVisible) return null; // Hide tab bar when keyboard is visible

  const Links = [
    {
      link: "home",
      icon: (
        <Entypo
          name="home"
          size={27}
          color={pathname === "/Pages/Home" ? "#0081C9" : "black"}
        />
      ),
      path: "/Pages/Home"
    },
    {
      link: "search",
      icon: (
        <AntDesign
          name="search1"
          size={27}
          color={pathname === "/Pages/Search" ? "#0081C9" : "black"}
        />
      ),
      path: "/Pages/Search"
    },
    {
      link: "library",
      icon: (
        <MaterialIcons
          name="library-music"
          size={30}
          color={pathname === "/Pages/Library" ? "#0081C9" : "black"}
        />
      ),
      path: "/Pages/Library"
    },
  ];

  return (
    <View
      style={tw`absolute bottom-0 left-0 right-0 bg-white p-3 py-5 shadow-md flex-row justify-between items-center`}
    >
      {Links.map((link, index) => (
        <TouchableOpacity
          key={index}
          style={tw`flex-row items-center px-5 py-1 ${
            pathname === link.path
              ? "bg-[#0081C9]/20 border border-[#0081C9] rounded-full py-2"
              : ""
          }`}
          onPress={() => router.push(link.path)}
        >
          {pathname === link.path ? (
            <View style={tw`flex flex-row gap-x-2`}>
              {link.icon}
              <Text style={tw`font-medium text-lg text-[#0081C9]`}>
                {link.link.charAt(0).toUpperCase() + link.link.slice(1)}
              </Text>
            </View>
          ) : (
            link.icon
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default NavigationBar;