import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import shadow from "../Constants/ShadowCSS";

export default SmallButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.action}
      style={{ ...styles.container, ...props.style, ...shadow.standardShadow }}
    >
      <Text
        style={{
          ...styles.buttonText,
          ...props.textStyle,
        }}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue",
    height: 35,
    width: "50%",
    justifyContent: "center",
    borderRadius: 4,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
});
