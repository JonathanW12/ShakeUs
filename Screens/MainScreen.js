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
      <View style={styles.contentContainer}>
        <Image source={require("../Constants/ShakeUsLogo.png")} />
        <StandardButton
          textStyle={styles.buttonTextStyle}
          style={{ ...styles.button, backgroundColor: Colors.primary }}
          title="Host Party"
          action={handleActionHostParty}
        />
        <StandardButton
          textStyle={styles.buttonTextStyle}
          style={{ ...styles.button, backgroundColor: Colors.tertiary }}
          title="Join Party"
          action={handleActionJoinParty}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    flex: 1,
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: { width: "90%", height: 65 },
  buttonTextStyle: {
    fontSize: 20,
  },
});
