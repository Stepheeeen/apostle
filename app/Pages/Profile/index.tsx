import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Platform,
  StatusBar,
  Pressable,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import tw from "twrnc";
import { router } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress: () => void;
}

const SettingsItem: React.FC<SettingsItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={tw`flex-row items-center px-4 py-4 border-b border-gray-100`}
  >
    <View style={tw`w-8 h-8 justify-center items-center mr-3`}>{icon}</View>
    <View>
      <Text style={tw`text-base font-medium text-gray-900`}>{title}</Text>
      <Text style={tw`text-sm text-gray-500`}>{subtitle}</Text>
    </View>
  </TouchableOpacity>
);

const SettingsScreen: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Fetch user details from AsyncStorage
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const name = await AsyncStorage.getItem("userName");
        const email = await AsyncStorage.getItem("userEmail");
        const id = await AsyncStorage.getItem("userId");

        if (name && email && id) {
          setUserName(name);
          setUserEmail(email);
          setUserId(id);
        } else {
          Alert.alert("No user data found", "Please log in first.");
          router.push("/Auth/Signin");
        }
      } catch (error) {
        Alert.alert("Error", "Failed to retrieve user data.");
      }
    };

    getUserDetails();
  }, []);

  const handleItemPress = (section: string) => {
    console.log(`Navigating to ${section}`);
    // Add navigation logic for each section here
    // router.push(`/Pages/${section}`);
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        "https://apostle.onrender.com/api/auth/logout"
      );
      // console.log("Logout response:", res.data);
      // Optionally, clear AsyncStorage after logging out
      await AsyncStorage.clear();
      router.push("/Auth/Signin"); // Navigate to login screen after logout
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

  return (
    <>
      <Pressable style={tw`flex-row items-center gap-1 px-2`}>
        <Ionicons name="chevron-back" size={25} color="#4B5563" />
        <Text
          style={tw`text-[17px] font-medium text-[#4B5563]`}
          onPress={() => router.push("/Pages/Home")}
        >
          Back
        </Text>
      </Pressable>

      <SafeAreaView
        style={tw`flex-1 bg-white ${
          Platform.OS === "android" ? `pt-[${StatusBar.currentHeight}px]` : ""
        }`}
      >
        {/* Profile Section */}
        <TouchableOpacity
          style={tw`flex-row items-center px-4 py-3 border-b border-gray-100`}
          onPress={() => handleItemPress("profile")}
        >
          <Image
            source={require("../../../assets/images/Apostle-Logo-sm.png")} // Replace with your avatar image path
            style={tw`w-12 h-12 rounded-full mr-3`}
          />
          <View>
            <Text style={tw`text-xl font-semibold text-gray-900`}>
              {userName}
            </Text>
            <Text style={tw`text-sm text-gray-500`}>{userEmail}</Text>
          </View>
        </TouchableOpacity>

        {/* Settings Items */}
        <SettingsItem
          icon={<Ionicons name="settings-outline" size={24} color="#4B5563" />}
          title="Settings & Privacy"
          subtitle="Manage your account"
          onPress={() => handleItemPress("settings")}
        />

        <SettingsItem
          icon={<Ionicons name="document-outline" size={24} color="#4B5563" />}
          title="Manage Content"
          subtitle="Downloads, Uploads, Audio content"
          onPress={() => handleItemPress("content")}
        />

        <SettingsItem
          icon={
            <Ionicons name="color-palette-outline" size={24} color="#4B5563" />
          }
          title="Personalisation"
          subtitle="Customise your listening experience"
          onPress={() => handleItemPress("personalization")}
        />

        <SettingsItem
          icon={
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="#4B5563"
            />
          }
          title="About"
          subtitle="View Contributors and App Version"
          onPress={() => handleItemPress("about")}
        />

        {/* Logout Section */}
        <TouchableOpacity
          onPress={handleLogout} // Invoke the handleLogout function
          style={tw`flex-row items-center px-4 py-4 border-b border-gray-100`}
        >
          <View style={tw`w-8 h-8 justify-center items-center mr-3`}>
            <AntDesign name="logout" size={24} color="#cc0202" />
          </View>
          <View>
            <Text style={tw`text-base font-medium text-[#cc0202]`}>Logout</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

// Optional: Add navigation typing if you're using React Navigation
interface SettingsScreenProps {
  navigation?: any; // Replace 'any' with proper navigation type
}

// Export with navigation props if needed
export default SettingsScreen as React.FC<SettingsScreenProps>;
