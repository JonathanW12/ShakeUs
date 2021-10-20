import React from "react";
import Banner from "../Components/Banner";
import { View, Text, StyleSheet, Image } from "react-native";
import Colors from "../Constants/Colors";
import SmallButton from "../Components/SmallButton";

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
      <Text>Current Activity</Text>
      <View style={styles.challengeContainer}>
        <Text>Party Title</Text>
        <Text>ShakeUs dares you to implement the css :))))))</Text>
        <SmallButton
          style={{ ...styles.button, backgroundColor: Colors.secondary }}
          title="Game Rules"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.secondary, flex: 1 },
  guestMesssage: {
    fontSize: 24,
  },
  button: { width: "60%", height: 40 },
  challengeContainer: {
    width: "90%",
    padding: 10,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    borderRadius: 4,
    margin: 2,
    alignSelf: "center",
    elevation: 10,
    shadowColor: "black",
    marginBottom: 20,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});
