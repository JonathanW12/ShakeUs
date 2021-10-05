import React from "react";
import Banner from "../Components/Banner";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import StandardButton from "../Components/StandardButton";

export const JoinPartyScreen = ({ navigation }) => {
  const [text, onChangeText] = React.useState("Game PIN");
  const handleAction = () => {
    navigation.navigate("GuestScreen");
  };
  return (
    <View style={styles.container}>
      <Banner title="Join a Party" />

      <TextInput
        style={styles.inputField}
        onChangeText={onChangeText}
        value={text}
      />
      <StandardButton title="Join Party" action={handleAction} />
    </View>
  );
};
export default JoinPartyScreen;

const styles = StyleSheet.create({
  container: { alignItems: "center" },
  inputField: {
    fontSize: 35,
  },
});
