import { StyleSheet, Text, View } from "react-native";
import tailwind from 'twrnc'

export default function Page() {
  return (
    <View style={tailwind`h-full w-full`}>
      <Text>
        October 8
      </Text>
    </View>
  );
}
