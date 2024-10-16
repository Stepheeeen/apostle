import ArrowButton from "@/components/reusable/Button";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const SplashScreen = ({ navigation }: { navigation: any }) => {
  const [page, setPage] = useState(0);
  const translateX = useSharedValue(0);
  const router = useRouter();

  const pages = [
    {
      title: "You're one step closer to achieving your music and podcast dreams.",
      image: require("../assets/images/onboarding/microphone.png"), // Replace with your image path
    },
    {
      title: "Discover music and podcasts that resonate with your soul.",
      image: require("../assets/images/onboarding/discover.png"), // Replace with your image path
    },
    {
      title: "Enrich your mind with our curated selection of music, podcasts, and sermons.",
      image: require("../assets/images/onboarding/enrich.png"), // Replace with your image path
    },
  ];

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const goToNextPage = () => {
    if (page < pages.length - 1) {
      setPage(page + 1);
      translateX.value = withSpring(-((page + 1) * width));
    } else {
      // Navigate to SignUp page
      router.push("/Auth/Signup");
    }
  };

  const goToPreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
      translateX.value = withSpring(-((page - 1) * width));
    }
  };

  const goToPage = (index: number) => {
    setPage(index);
    translateX.value = withSpring(-index * width);
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.swipeContainer,
          { width: width * pages.length },
          animatedStyle,
        ]}
      >
        {pages.map((p, index) => (
          <View key={index} style={styles.page}>
            <Image
              source={p.image}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.title}>{p.title}</Text>
          </View>
        ))}
      </Animated.View>
      <View style={styles.buttonContainer}>
        <ArrowButton
          direction="prev"
          onPress={goToPreviousPage}
          disabled={page === 0}
        />

        <View style={styles.tabContainer}>
          {pages.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.tab, page === index && styles.activeTab]}
              onPress={() => goToPage(index)}
            />
          ))}
        </View>

        {/* Remove the disabled prop when on the last page */}
        <ArrowButton
          direction="next"
          onPress={goToNextPage}
          disabled={false}
          // Keep the button enabled even on the last page
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: "#ffffff", // Change background color if needed
  },
  swipeContainer: {
    flexDirection: "row",
    height: "100%",
  },
  page: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: "80%", // Adjust as needed
    height: 200, // Adjust based on your images
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tabContainer: {
    flexDirection: "row",
  },
  tab: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#808080", // Default tab color
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: "#0056b3", // Active tab color
    width: 40,
  },
});

export default SplashScreen;