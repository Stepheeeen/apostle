import React from "react";
import { View, Text } from "react-native";
import tw from "twrnc";

const EmptyDownloads: React.FC = () => (
  <View style={tw`bg-orange-50 p-4 rounded-xl my-6`}>
    <Text style={tw`text-base text-orange-600 text-center`}>
      No downloaded playlists found. Your downloaded music will appear here.
    </Text>
  </View>
);

export default EmptyDownloads;