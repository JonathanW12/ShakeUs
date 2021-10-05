import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export const StandardButton = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.action}>
        <Text style={styles.buttonText}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default StandardButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue",
    height: 50,
    justifyContent: "center",
    padding: 20,
    borderRadius: 10,
    margin: 2,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
  },
});
