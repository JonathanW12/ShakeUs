import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const Banner = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{props.title}</Text>
    </View>
  );
};
export default Banner;
const styles = StyleSheet.create({
  container: {
    height: 70,
    paddingTop: 25,
    backgroundColor: "yellow",
  },
  titleText: {
    fontSize: 24,
    color: "#AFA7A7",
    textAlign: "center",
  },
});
