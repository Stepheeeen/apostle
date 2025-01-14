import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import axios from "axios";
import tw from "twrnc";
import { useRouter } from "expo-router";

const SplashScreenComponent: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.post(
          "https://apostle.onrender.com/api/auth/verifyToken",
          {},
          { withCredentials: true }
        );

        console.log("Token verified:", response.data);

        // Navigate to the home screen upon successful verification
        router.push("/tabs/Home");
      } catch (error: any) {
        console.error("Error verifying token:", error.response?.data);

        // Navigate to login if token verification fails
        router.push("/Auth");
      }
    };

    verifyToken();
  }, [router]);

  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
      <ActivityIndicator size="large" color="#4B5563" />
      <Text style={tw`text-lg text-black mt-4`}>Checking your session...</Text>
    </View>
  );
};

export default SplashScreenComponent;
