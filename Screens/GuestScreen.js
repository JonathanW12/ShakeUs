import React from "react";
import Banner from "../Components/Banner";
import { View, Text, StyleSheet, Image } from "react-native";
import Colors from "../Constants/Colors";

export default GuestScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Banner
        title="Guest Screen"
        iconName="menu"
        onIconPress={() => {
          navigation.navigate("JoinPartyScreen");
        }}
      />
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
