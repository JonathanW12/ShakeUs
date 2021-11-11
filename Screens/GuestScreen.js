import React, {useEffect, useState} from "react";
import Banner from "../Components/Banner";
import { View, Text, StyleSheet, Image, Dimensions, ActivityIndicator } from "react-native";
import Colors from "../Constants/Colors";
import SmallButton from "../Components/SmallButton";
import ShadowCSS from "../Constants/ShadowCSS";
import ActivityPackService from "../Components/Services/ActivityPackService";
import PartyService from "../Components/Services/PartyService";

export default GuestScreen = ({ navigation }) => {
  const [activityPackage, setactivityPackage] = useState(null);
  const [currentActivity, setcurrentActivity] = useState(null);
  
  async function load(){
   
  }

  useEffect(() => {
    load();
  });

  if (activityPackage != null) {
    return (
      <View style={styles.container}>
        <Banner title="Guest Screen" />
        <Text style={styles.currentActivity}>Current Activity</Text>
        <View
          style={{ ...ShadowCSS.standardShadow, ...styles.challengeContainer }}
        >
          <View>
            <Text style={styles.partyTitle}>Party Title</Text>
            <View style={styles.whiteLine}></View>
          </View>
          <Text style={styles.guestMesssage}>
            ShakeUs dares you to implement the css :))))))
          </Text>
          <View>
            <View style={styles.whiteLine}></View>
            <SmallButton
              style={{ ...styles.button, backgroundColor: Colors.secondary }}
              title="Game Rules"
            />
          </View>
        </View>
        <View style={styles.lowerContainer}>
          <Text style={styles.nextActivity}>Next Activity At</Text>
          <Text style={styles.timeStamp}>21:30</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Banner title="Party Information" />
        <View style={styles.loadingIcon}>
          <ActivityIndicator size={52} color={Colors.primary}/>
        </View>
      </View>
    );
  }
  
};

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.secondary, flex: 1 },
  currentActivity: {
    color: "white",
    textAlign: "center",
    fontSize: 22,
    margin: 15,
  },
  guestMesssage: {
    fontSize: 18,
    color: "white",
    margin: 15,
    textAlign: "center",
  },
  button: { width: "60%", height: 40, marginBottom: 10, marginTop: 5 },
  challengeContainer: {
    width: "90%",
    height: "40%",
    padding: 5,
    backgroundColor: Colors.primary,
    justifyContent: "space-between",
    borderRadius: 4,
    alignSelf: "center",
    marginBottom: 20,
  },
  partyTitle: {
    fontSize: 22,
    alignSelf: "center",
    paddingTop: 5,
    paddingBottom: 5,
    color: "white",
  },
  whiteLine: {
    width: "80%",
    height: 2,
    backgroundColor: "white",
    alignSelf: "center",
  },
  lowerContainer: {
    justifyContent: "flex-end",
    flex: 1,
  },
  nextActivity: {
    backgroundColor: "#CC9300",
    width: "100%",
    height: Dimensions.get("screen").height * 0.05,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
  },
  timeStamp: {
    backgroundColor: Colors.primary,
    width: "100%",
    height: Dimensions.get("screen").height * 0.1,
    textAlign: "center",
    color: "white",
    fontSize: 30,
    textAlignVertical: "center",
  },
});
