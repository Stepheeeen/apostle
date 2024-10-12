import React from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import Input from "@/components/reusable/Input";
import ArrowButton from "@/components/reusable/Button";
import { Link, router } from "expo-router";

const ResetPassword = () => {
  return (
    <View style={tw`flex-1 bg-white p-4 pt-[10%]`}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={tw`mb-6`}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Forgot Password Header */}
      <Text style={tw`text-2xl font-bold mb-4`}>Reset Password</Text>
      <Text style={tw` text-base mb-8`}>Please enter your new password.</Text>

      {/* Input Fields */}
      <Input label="Password" secureTextEntry={true} />
      <Input label="Confirm Password" secureTextEntry={true} />

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

      {/* Sign In Link */}
      <View style={tw`w-full flex flex-row items-center justify-between mt-4`}>
        <Link href={"/Auth/Signin"} style={tw`text-blue-500 underline mt-4`}>
          Sign In
        </Link>
      </View>
    </View>
  );
};

export default ResetPassword;
