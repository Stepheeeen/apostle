import { router } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import tw from "twrnc";

const Topbar = () => {
  return (
    <View style={tw`p-4 flex-row justify-between items-center`}>
      <View style={tw`flex-row items-center`}>
        <Image
          source={require("../../assets/images/Apostle-Logo-sm.png")}
          style={tw`h-8 w-8`}
        />
        <Text style={tw`ml-1 text-[#0081C9] font-semibold`}>APOSTLE</Text>
      </View>
      <Pressable onPress={()=>{router.push("/tabs/Profile")}}>
        <View style={tw`h-9 w-9 rounded-full bg-gray-300`} />
      </Pressable>
    </View>
  );
};

export default Topbar;
