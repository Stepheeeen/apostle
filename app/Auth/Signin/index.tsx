import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Button,
  Pressable,
} from "react-native";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import Input from "@/components/reusable/Input";
import ArrowButton from "@/components/reusable/Button";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from "expo-router";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    if (!email || !password) {
      Alert.alert("Validation Error", "Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://apostle.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        await AsyncStorage.setItem("userName", response.data.data.name);
        await AsyncStorage.setItem("userEmail", response.data.data.email);
        await AsyncStorage.setItem("userId", response.data.data._id);
        Alert.alert("Login Successful", "Welcome back!");
        router.push("/tabs/Home");
      }
    } catch (error: any) {
      Alert.alert(
        "Login Failed",
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={tw`flex-1 bg-white p-4 pt-[10%]`}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={tw`mb-6`}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Welcome Back Header */}
      <Text style={tw`text-3xl font-bold mb-6`}>Welcome Back</Text>

      {/* Input Fields */}
      <Input
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        label="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      {/* Login Button */}
      <TouchableOpacity
        style={tw`w-full h-[47px] rounded-md flex items-center bg-[#3EB3F2] justify-center mt-12`}
        onPress={handleLogin}
      >
        <Text style={tw`text-white text-lg`}>Sign In</Text>
      </TouchableOpacity>

      {/* Sign Up & Forgot Password Links */}
      <View style={tw`w-full flex flex-row items-center justify-between mt-4`}>
        <Link href={"/Auth/Signup"} style={tw`text-blue-500 underline mt-4`}>
          Sign Up
        </Link>

        <Link
          href={"/Auth/Forgotpassword"}
          style={tw`text-blue-500 underline mt-4`}
        >
          Forget Password?
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
