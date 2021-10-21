import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import ShadowCSS from "../Constants/ShadowCSS";

export default StandardInput = (props) => {
  const [text, onChangeText] = React.useState(null);

  return (
    <View style={{ ...styles.container, ...ShadowCSS.standardShadow }}>
      <TextInput
        style={styles.inputField}
        onChangeText={onChangeText}
        value={text}
        placeholder={props.placeholder}
        maxLength={props.maxLength}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputField: {
    fontSize: 22,
    textAlign: "center",
  },
  container: {
    height: 65,
    width: "90%",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 4,
  },
});
