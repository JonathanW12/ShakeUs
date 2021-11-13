//Bad name as this is not the main screen a user will see?
import React, { useState, useEffect } from "react";
import { Dimensions, NativeAppEventEmitter } from "react-native";
import Banner from "../Components/Banner";
import { View, Text, StyleSheet, Image } from "react-native";
import StandardButton from "../Components/StandardButton";
import Colors from "../Constants/Colors";
import PartyService from "../Components/Services/PartyService";


export default MainScreen = ({ navigation }) => {
  const [hostId, sethostId] = useState(null)
  const handleActionHostParty = () => {
    navigation.navigate("JoinPartyScreenHost");
  };
  const handleActionJoinParty = () => {
    navigation.navigate("JoinPartyScreen");
  };

  console.log(PartyService.hostId)

  useEffect(() => {
   sethostId(PartyService.hostId);
  }, [hostId])


  if(PartyService.hostId != null){
    return (

      <View style={styles.container}>
        <View style={styles.logoTitleContainer}>
          <Image
            source={require("../assets/ShakeUsLogo.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>ShAKeUs</Text>
        </View>
        <View style={styles.contentContainer}>
          <StandardButton
            textStyle={styles.buttonTextStyle}
            style={{ ...styles.button, backgroundColor: Colors.tertiary }}
            title="Your Party"
            action={() => {navigation.navigate("PartyInformationScreen")}}
          />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.logoTitleContainer}>
          <Image
            source={require("../assets/ShakeUsLogo.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>ShAKeUs</Text>
        </View>
        <View style={styles.contentContainer}>
          <StandardButton
            textStyle={styles.buttonTextStyle}
            style={{ ...styles.button, backgroundColor: Colors.tertiary }}
            title="Join Party"
            action={handleActionJoinParty}
          />
          <StandardButton
            textStyle={styles.buttonTextStyle}
            style={{ ...styles.button, backgroundColor: Colors.primary }}
            title="Host Party"
            action={handleActionHostParty}
          />
        </View>
      </View>
    );
  }

  
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    flex: 1,
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  button: { width: "90%", height: 65 },
  buttonTextStyle: {
    fontSize: 20,
  },
  logo: {
    width: "60%",
    //Do not change height.
    height: Dimensions.get("screen").width * 0.6,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: "15%",
  },
  title: {
    color: "white",
    alignSelf: "center",
    fontSize: 60,
    //TODO SET NICE FONT
  },
});
