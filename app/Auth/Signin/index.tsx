import React from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import Input from "@/components/reusable/Input";
import ArrowButton from "@/components/reusable/Button";
import { Link, router } from "expo-router";

const SignIn = () => {
  return (
    <View style={tw`flex-1 bg-white p-4 pt-[10%]`}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={tw`mb-6`}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Create Account Header */}
      <Text style={tw`text-3xl font-bold mb-6`}>Welcome Back</Text>

      {/* Input Fields */}
      <Input label="Name" />
      <Input label="Password" secureTextEntry={true} />

      {/* Sign Up Button */}
      <View style={tw`w-full flex items-end mt-6`}>
        <ArrowButton
          direction="next"
          disabled={false}
          onPress={() => {
            router.push("/Pages/Home")
          }}
        />
      </View>

      {/* Sign In Link */}
      <View style={tw`w-full flex flex-row items-center justify-between mt-4`}>
        <Link href={"/Auth/Signup"} style={tw`text-blue-500 underline mt-4`}>
          Sign Up
        </Link>

        <Link href={"/Auth/Forgotpassword"} style={tw`text-blue-500 underline mt-4`}>
          Forget Password?
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
