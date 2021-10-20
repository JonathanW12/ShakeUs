import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default SmallButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.action}
      style={{ ...styles.container, ...props.style }}
    >
      <Text style={{ ...styles.buttonText, ...props.textStyle }}>
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
    margin: 2,
    alignSelf: "center",
    elevation: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  buttonText: {
    fontSize: 15,
    color: "white",
    textAlign: "center",
  },
});
