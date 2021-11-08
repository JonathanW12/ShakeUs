import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import shadow from "../Constants/ShadowCSS";
import Colors from "../Constants/Colors";

export default PersonBlock = (props) => {
  return (
    <TouchableOpacity
      onPress={props.action}
      style={[
        styles.container,
        shadow.standardShadow,
        props.host && styles.hostBorder,
      ]}
    >
      <Text style={{ ...styles.buttonText, ...props.textStyle }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    height: 65,
    width: Dimensions.get("screen").width * 0.8,
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
  },
  hostBorder: {
    borderColor: "black",
    borderWidth: 3,
  },
});
