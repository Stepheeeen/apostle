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
    style={tw`flex-row items-center py-2 px-4 rounded-full ${
      isActive ? "bg-blue-50" : "bg-gray-100"
    }`}
    onPress={onPress}
  >
    <Text style={tw`ml-2 text-base ${isActive ? "text-[#007AFF]" : "text-gray-600"}`}>{label}</Text>
  </TouchableOpacity>
);

export default Tab;