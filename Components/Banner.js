import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../Constants/Colors";

export default Banner = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    paddingTop: 25,
    backgroundColor: Colors.primary,
  },
  titleText: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
  },
});
