import React from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import Input from "@/components/reusable/Input";
import ArrowButton from "@/components/reusable/Button";
import { router } from "expo-router";

const SignUp = () => {
  return (
    <View style={tw`flex-1 bg-white p-4 pt-[20%]`}>

      {/* Create Account Header */}
      <Text style={tw`text-3xl font-bold mb-6`}>Create Account</Text>

      {/* Input Fields */}
      <Input label="Name" />
      <Input label="Email" />
      <Input label="Password" secureTextEntry={true} />

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
      <Pressable onPress={() => router.push("/Auth/Signin")}>
        <Text style={tw`text-blue-500 underline mt-4`}>Sign In</Text>
      </Pressable>
    </View>
  );
};

export default SignUp;