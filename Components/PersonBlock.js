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
import { Icon } from "react-native-elements";
import PartyService from "./Services/PartyService";

export default PersonBlock = (props) => {
  return (
    <View
      style={[
        styles.container,
        shadow.standardShadow,
        props.host && styles.hostBorder,
      ]}
    >
      <View style={styles.boxLeft}></View>
      <View style={styles.boxCenter}>
        <TouchableOpacity onPress={props.action}>
          <Text style={{ ...styles.buttonText, ...props.textStyle }}>
            {props.title}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.boxRight}>
        {props.showX === true && (
          <Icon
            name="user-x"
            type="feather"
            color="red"
            onPress={() => {
              PartyService.removeGuestFromParty(
                PartyService.partyId,
                PartyService.hostId,
                props.id
              )
                .then((res) => {
                  if (res.status === 200) {
                    //person removed
                  }
                })
                .catch((err) => console.error(err));
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    height: 65,
    width: Dimensions.get("screen").width * 0.8,
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
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
  boxRight: {
    flex: 1,
    justifyContent: "center",
  },
  boxCenter: {
    flex: 3,
    justifyContent: "center",
  },
  boxLeft: {
    flex: 1,
  },
});
