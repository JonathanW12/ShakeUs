import React from "react";
import Banner from "../Components/Banner";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import StandardButton from "../Components/StandardButton";
import Input from "../Components/Input";
import Colors from "../Constants/Colors";

export default JoinPartyScreen = ({ navigation }) => {
  const handleAction = () => {
    navigation.navigate("GuestScreen");
  };
  return (
    <View style={styles.container}>
      <Banner title="Join Party" />
      <Input placeholder="Enter Party Code" maxLength={9} />

      <StandardButton
        style={styles.button}
        title="Join Party"
        action={handleAction}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: Colors.secondary,
    flex: 1,
  },
  button: {
    width: "90%",
    backgroundColor: Colors.tertiary,
  },
});
