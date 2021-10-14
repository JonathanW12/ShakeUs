import React from "react";
import Banner from "../Components/Banner";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import StandardButton from "../Components/StandardButton";
import Colors from "../Constants/Colors";

export default JoinPartyScreen = ({ navigation }) => {
  const [text, onChangeText] = React.useState("Game PIN");
  const handleAction = () => {
    navigation.navigate("GuestScreen");
  };
  return (
    <View style={styles.container}>
      <Banner title="Join Party" />

      <TextInput
        style={styles.inputField}
        onChangeText={onChangeText}
        value={text}
      />
      <StandardButton title="Join Party" action={handleAction} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center" },
  inputField: {
    fontSize: 35,
  },
});
