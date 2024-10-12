import React from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import Input from "@/components/reusable/Input";
import ArrowButton from "@/components/reusable/Button";
import { Link, router } from "expo-router";

const ForgotPassword = () => {
  return (
    <View style={tw`flex-1 bg-white p-4 pt-[10%]`}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={tw`mb-6`}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Forgot Password Header */}
      <Text style={tw`text-2xl font-bold mb-4`}>Forgot Password</Text>
      <Text style={tw` text-base mb-8`}>Please enter your registered email address to receive a verification code.</Text>

      {/* Input Fields */}
      <Input label="Email" />

      {/* Sign Up Button */}
      <View style={tw`w-full flex items-end mt-6`}>
        <ArrowButton
          direction="next"
          disabled={false}
          onPress={() => {
            // Sign up functionality here
          }}
        />
      </View>
    </View>
  );
};

export default ForgotPassword;
