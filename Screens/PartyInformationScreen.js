import React, { useState, useEffect } from "react";
import Banner from "../Components/Banner";
import { View, Text, StyleSheet, Image, Dimensions, ActivityIndicator } from "react-native";
import Colors from "../Constants/Colors";
import ShadowCSS from "../Constants/ShadowCSS";
import ActivityPackService from "../Components/Services/ActivityPackService";
import PartyService from "../Components/Services/PartyService";
import GuestService from "../Components/Services/GuestService";

export default PartyInformationScreen = ({ navigation }) => {
  const [activityPackage, setactivityPackage] = useState(null);
  const [participantCount, setparticipantCount] = useState(0);
  const [activityCount, setactivityCount] = useState(0);
  
  async function getPartyInformation(){
    const response = await PartyService.getParty(
      PartyService.partyId,
      GuestService.guestId,
    )
    await response.json()
    .then(res => setparticipantCount(res.guests.length))
    .catch(err => console.error(err));
    
  }

  function load(){
    if(ActivityPackService.currentPack != null){
      setactivityPackage(ActivityPackService.currentPack);
      setactivityCount(
        ActivityPackService.currentPack.activities.length
      )
    } else {
      console.log("No activityPack");
    }

    getPartyInformation();

  }

  useEffect(() => {

    load();

  },[]);

  if(activityPackage != null){
    return (
      <View style={styles.container}>
       
      <Banner title="Party Information" />
      <View style={styles.innerWrapper}>
      <View
        style={{ ...ShadowCSS.standardShadow, ...styles.challengeContainer,}}>
        <View>
          <Text style={styles.partyTitle}>Package: {activityPackage.title}</Text>
          <View style={styles.whiteLine}></View>

          <View style={styles.container_horizontal}>
            <Text style={styles.partyCodeLabel}>Code:</Text>
            <Text style={styles.partyCode}>{PartyService.partyId}</Text>
          </View>

          <View style={{...styles.whiteLine, marginBottom: 20}}></View>

        </View>
        
        <View>
          <SmallButton
            style={{ ...styles.button, backgroundColor: Colors.secondary, }}
            title="Customize Party"
            action={() => {navigation.navigate("CustomizePackScreen")}}
          />

          <Text style={styles.partyTitle}>Activities: {activityCount} </Text>
          <SmallButton
            style={{ ...styles.button, backgroundColor: Colors.secondary }}
            title="Activities"
            action={() => {navigation.navigate("GuestScreen")}}
          />
          <Text style={styles.partyTitle}>participants: {participantCount} </Text>
          <SmallButton
            style={{ ...styles.button, backgroundColor: Colors.secondary }}
            title="Participants"
            action={() => {navigation.navigate("ParticipantsScreen")}}
          />
        </View>
        </View>
      </View>
    </View>
    );
  }else {
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
  container: {
    backgroundColor: Colors.secondary,
    flex: 1,
    justifyContent: "center",
  },
  innerWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
    padding: 5,
    backgroundColor: Colors.primary,
    justifyContent: "space-between",
    borderRadius: 4,
    alignSelf: "center",
    marginBottom: 20,
  },
  partyTitle: {
    fontSize: 26,
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
  loadingIcon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  partyCode: {
    color: Colors.secondary,
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "bold",
    justifyContent: "flex-start",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    paddingLeft: 7,
    paddingRight: 7
  },
  partyCodeLabel: {
    fontSize: 20,
    color: Colors.secondary,
    paddingLeft: 20,

  },
  container_horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 25,
    marginBottom: 25,
    
  }
});
