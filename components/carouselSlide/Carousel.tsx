import { Entypo } from "@expo/vector-icons";
import React from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  Pressable,
  ImageBackground,
} from "react-native";
import Carousel from "react-native-reanimated-carousel"; // Import react-native-reanimated-carousel
import tw from "twrnc";

const { width: screenWidth } = Dimensions.get("window");

// Define your data for the carousel
const carouselData = [
  {
    image: require("../../assets/images/papa.png"), // Corrected the image reference
    title: "Papa 1",
    description:
      "He is a great man of God, blah blah blah. He is a great man of God, blah blah blah. He is a great man of God, blah blah blah.",
  },
  {
    image: require("../../assets/images/papa.png"), // Corrected the image reference
    title: "Papa 2",
    description:
      "He is a wonderful man of faith, sharing wisdom across the community. Truly inspiring, blah blah blah.",
  },
  {
    image: require("../../assets/images/papa.png"), // Corrected the image reference
    title: "Papa 3",
    description:
      "Known for his strength and kindness, blah blah blah. His teachings reach many across the world.",
  },
];

// Define the renderItem function for the carousel
const renderItem = ({ item }: { item: any }) => (
  <View style={tw`px-4 pb-4 mt-3 max-w-md mx-auto h-full w-full rounded-xl mb-4 relative`}>
    <ImageBackground
      source={item.image} // No need to use uri for local images
      style={tw`inset-0 w-full h-full rounded-xl`}
      imageStyle={{ borderRadius: 10 }} // Adjust the image border radius if needed
    >
      {/* Profile Info */}
      <View style={tw`gap-y-1 p-4 absolute bottom-0 bg-white/20 w-full`}>
        <View style={tw`flex-row items-center justify-between`}>
          <Text style={tw`text-xl font-semibold`}>{item.title}</Text>
        </View>
        <Text style={tw`text-gray-600 text-base`}>
          {item.description}
        </Text>
        <View style={tw`w-full flex flex-row items-center justify-end mt-[-5px]`}>
          <Pressable style={tw`bg-[#0081C9] p-2 rounded-full `}>
            <Entypo name="controller-play" size={24} color="#fff" />
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  </View>
);

const CarouselComponent = () => {
  return (
    <Carousel
      data={carouselData}
      renderItem={renderItem}
      width={screenWidth}
      height={390} // Height of the carousel
      loop // Enable looping
      autoPlay={true} // Enable autoplay
      autoPlayInterval={10000} // Set interval for autoplay (in ms)
      scrollAnimationDuration={800} // Set animation duration for scrolling
    />
  );
};

export default CarouselComponent;
