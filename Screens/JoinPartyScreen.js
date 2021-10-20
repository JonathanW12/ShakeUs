import React from "react";
import Banner from "../Components/Banner";
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import StandardButton from "../Components/StandardButton";
import Colors from "../Constants/Colors";

export default JoinPartyScreen = ({ navigation }) => {
  const handleAction = () => {
    navigation.navigate("GuestScreen");
  };
  return (
    <View style={styles.container}>
      <Banner
        title="Join Party"
        iconName="arrow-left"
        onIconPress={() => {
          navigation.navigate("MainScreen");
        }}
      />
      <Image
        source={require("../assets/ShakeUsLogo.png")}
        style={styles.logo}
      />
      <View style={styles.lowerContainer}>
        <TextInput
          placeholder="Enter Name"
          maxLength={20}
          style={styles.inputFields}
        />
        <TextInput
          placeholder="Enter Party Code"
          maxLength={9}
          style={styles.inputFields}
        />

        <StandardButton
          style={styles.button}
          title="Join Party"
          action={handleAction}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    flex: 1,
  },
  inputFields: {
    backgroundColor: "white",
    borderRadius: 4,
    width: "90%",
    height: 65,
    margin: 2,
    alignSelf: "center",
    elevation: 10,
    shadowColor: "black",
    marginBottom: 20,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    textAlign: "center",
    fontSize: 18,
  },
  button: {
    width: "90%",
    backgroundColor: Colors.tertiary,
  },
  logo: {
    width: "60%",
    //Do not change height.
    height: Dimensions.get("screen").width * 0.6,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: "10%",
  },
  lowerContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },
});
