import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import shadow from "../Constants/ShadowCSS";

export default StandardButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.action}
      style={{
        ...shadow.standardShadow,
        ...props.style,
        ...styles.container,
      }}
    >
      <Text style={{ ...styles.buttonText, ...props.textStyle }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 65,
    width: "90%",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
  },
});
