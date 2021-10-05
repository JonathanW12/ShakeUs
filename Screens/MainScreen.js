//Bad name as this is not the main screen a user will see?
import React from "react";
import { NativeAppEventEmitter } from "react-native";
import Banner from "../Components/Banner";
import { View, Text, StyleSheet, Image } from "react-native";
import StandardButton from "../Components/StandardButton";

export const MainScreen = ({ navigation }) => {
  const handleActionHostParty = () => {
    navigation.navigate("HostPartyScreen");
  };
  const handleActionJoinParty = () => {
    navigation.navigate("JoinPartyScreen");
  };

  return (
    <View style={styles.container}>
      <Banner title="ShakeUs" />
      <View style={styles.conentContainer}>
        <Image source={require("../Constants/ShakeUsLogo.png")} />
        <StandardButton title="Host Party" action={handleActionHostParty} />
        <StandardButton title="Join Party" action={handleActionJoinParty} />
      </View>
    </View>
  );
};
export default MainScreen;

const styles = StyleSheet.create({
  container: {},
  conentContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: { fontSize: 24, marginTop: 10 },
});
