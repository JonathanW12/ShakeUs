import React from "react";
import Banner from "../Components/Banner";
import { View, Text, StyleSheet, Image } from "react-native";

export default GuestScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Banner title="Guest Screen" />
      <Text>ShakeUs dares you to implement the css :))))))</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  guestMesssage: {
    fontSize: 24,
  },
});
