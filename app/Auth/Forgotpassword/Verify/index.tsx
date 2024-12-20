import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import axios, { AxiosError } from "axios";
import tw from "twrnc";
import ArrowButton from "@/components/reusable/Button";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Type definitions
interface ApiErrorResponse {
  message?: string;
}

const VerifyEmailScreen: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<number>(120);
  const [canResend, setCanResend] = useState<boolean>(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Countdown timer for OTP resend
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (remainingTime > 0 && !canResend) {
      timer = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      setCanResend(true);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [remainingTime, canResend]);

  const handleChange = (index: number, value: string) => {
    if (/^\d$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }

      if (!value && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleVerifyOtp = async () => {
    const code = otp.join("");

    if (code.length !== 4) {
      Alert.alert("Error", "Please enter a complete 4-digit code.");
      return;
    }

    setIsLoading(true);
    Keyboard.dismiss();

    try {
      const response = await axios.post(
        "https://apostle.onrender.com/api/auth/verifyOtp",
        { otp: code }
      );

      if (response.data?.success) {
        AsyncStorage.setItem("OTP", code);
        Alert.alert(
          "Verification Successful",
          "Your email has been verified.",
          [
            {
              text: "Continue",
              onPress: () => {
                router.push("/Auth/Resetpassword");
              },
            },
          ]
        );
      } else {
        throw new Error(response.data?.message || "Verification failed");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      const errorMessage =
        axiosError.response?.data?.message ||
        "Something went wrong. Please try again.";
      Alert.alert("Verification Failed", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;

    setIsLoading(true);
    Keyboard.dismiss();

    try {
      const response = await axios.post(
        "https://apostle.onrender.com/api/auth/resendOtp"
      );

      if (response.data?.success) {
        Alert.alert("OTP Resent", "A new code has been sent to your email.", [
          { text: "OK" },
        ]);

        setCanResend(false);
        setRemainingTime(120);
        setOtp(["", "", "", ""]);
      } else {
        throw new Error(response.data?.message || "Could not resend OTP");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      const errorMessage =
        axiosError.response?.data?.message ||
        "Something went wrong. Please try again.";
      Alert.alert("Resend Failed", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={tw`flex-1`}
    >
      <View style={tw`flex-1 items-center justify-start bg-white px-4 py-14`}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()} // Navigate back to the previous screen
          style={tw`absolute top-4 left-4 p-2 rounded-full bg-gray-200`}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-2xl font-bold mb-4`}>Verify Email</Text>
        <Text style={tw`text-base mb-8 text-center px-4`}>
          Enter the 4-digit code sent to your email
        </Text>

        <View style={tw`flex-row justify-between mb-6 w-6/7`}>
          {otp.map((value, index) => (
            <TextInput
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              key={index}
              style={tw`border ${
                value ? "border-blue-500 bg-blue-50" : "border-gray-300"
              } rounded-full text-center w-14 h-14 text-xl font-bold`}
              keyboardType="numeric"
              maxLength={1}
              value={value}
              onChangeText={(text) => handleChange(index, text)}
              selectTextOnFocus
              autoCorrect={false}
            />
          ))}
        </View>

        <View style={tw`w-full flex items-end mt-6 px-4`}>
          <ArrowButton
            direction="next"
            disabled={isLoading || otp.some((val) => val === "")}
            onPress={handleVerifyOtp}
          />
        </View>

        <TouchableOpacity
          style={tw`w-3/4 py-2 rounded-md mt-4`}
          onPress={handleResendOtp}
          disabled={isLoading || !canResend}
        >
          <Text style={tw`text-center text-black text-base`}>
            {isLoading
              ? "Processing..."
              : !canResend
              ? `Resend in ${remainingTime}s`
              : "Resend Code"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default VerifyEmailScreen;
