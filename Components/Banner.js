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
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    height: 90,
    paddingTop: 25,
    paddingLeft: 20,
    backgroundColor: Colors.primary,
    elevation: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  titleText: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
  },
});
