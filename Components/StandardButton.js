import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default StandardButton = (props) => {
  return (
    <View style={{ ...styles.container, ...props.style }}>
      <TouchableOpacity onPress={props.action}>
        <Text style={{ ...styles.buttonText, ...props.textStyle }}>
          {props.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

//all styles are default and can be overridden with props
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
