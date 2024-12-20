import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import Input from "@/components/reusable/Input";
import ArrowButton from "@/components/reusable/Button";
import { router } from "expo-router";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("Validation Error", "Please enter your email address.");
      return;
    }

    try {
      const response = await axios.post(
        "https://apostle.onrender.com/api/auth/forgotPassword",
        { email }
      );

      if (response.status === 200) {
        Alert.alert(
          "Email Sent",
          "A verification code has been sent to your email."
        );
        router.push("/Auth/Forgotpassword/Verify");
      }
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <View style={tw`flex-1 bg-white p-4 pt-[10%]`}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={tw`mb-6`}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Forgot Password Header */}
      <Text style={tw`text-2xl font-bold mb-4`}>Forgot Password</Text>
      <Text style={tw` text-base mb-8`}>
        Please enter your registered email address to receive a verification
        code.
      </Text>

      {/* Input Fields */}
      <Input onChangeText={setEmail} value={email} label="Email" />

      {/* Submit Button */}
      <View style={tw`w-full flex items-end mt-6`}>
        <ArrowButton
          direction="next"
          disabled={!email} // Disable the button if no email is entered
          onPress={handleForgotPassword} // Call the API when button is pressed
        />
      </View>
    </View>
  );
};

export default ForgotPassword;
