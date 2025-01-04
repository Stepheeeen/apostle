import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";

interface TabProps {
  isActive: boolean;
  label: string;
  onPress: () => void;
}

const Tab: React.FC<TabProps> = ({ isActive, label, onPress }) => (
  <TouchableOpacity
    style={tw`flex-row items-center py-1 px-4 rounded-md ml-2 ${
      isActive ? "bg-[#0081C9]" : "bg-gray-300"
    }`}
    onPress={onPress}
  >
    <Text style={tw`text-sm ${isActive ? "text-white" : "text-gray-600"}`}>{label}</Text>
  </TouchableOpacity>
);

export default Tab;