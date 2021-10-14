//Bad name as this is not the main screen a user will see?
import React from "react";
import { NativeAppEventEmitter } from "react-native";
import Banner from "../Components/Banner";
import { View, Text, StyleSheet, Image } from "react-native";
import StandardButton from "../Components/StandardButton";
import Colors from "../Constants/Colors";

export default MainScreen = ({ navigation }) => {
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    flex: 1,
  },
  conentContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: { fontSize: 24, marginTop: 10 },
});
