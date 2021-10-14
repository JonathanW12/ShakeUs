import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../Constants/Colors";
import { Icon } from "react-native-elements";

export default Banner = (props) => {
  return (
    <View style={styles.container}>
      <View style={{ marginRight: 20 }}>
        <Icon
          name={props.iconName}
          //icons can be found on https://oblador.github.io/react-native-vector-icons/
          type="feather"
          color="white"
          onPress={props.onIconPress}
        />
      </View>

      <Text style={styles.titleText}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
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
