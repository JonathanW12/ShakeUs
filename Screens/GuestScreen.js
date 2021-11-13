import React, {useEffect, useState, useContext} from "react";
import Banner from "../Components/Banner";
import { View, Text, StyleSheet, Image, Dimensions, ActivityIndicator, Alert } from "react-native";
import Colors from "../Constants/Colors";
import SmallButton from "../Components/SmallButton";
import ShadowCSS from "../Constants/ShadowCSS";
import ActivityPackService from "../Components/Services/ActivityPackService";
import PartyService from "../Components/Services/PartyService";
import GuestService from "../Components/Services/GuestService";
import ActivityService from "../Components/Services/ActivityService";
import {SocketContext} from "../Components/SocketContext";

export default GuestScreen = ({ navigation }) => {
  const [activityPackage, setactivityPackage] = useState(null);
  const [allActivities, setallActivities] = useState(null);
  const [currentActivity, setcurrentActivity] = useState(null);
  const [nextActivity, setnextActivity] = useState(null);
  const [ready, setready] = useState(false);
  const socket = useContext(SocketContext);

  const unixToHours = (unix) => {
    let unix_timestamp = unix
    let date = new Date(unix_timestamp * 1000);
    let hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    //var seconds = "0" + date.getSeconds();
    return hours + ':' + minutes.substr(-2);
  }

  const onSucces = (res) => {
    
    ActivityPackService.getActivityPack(res.activityPackId)
    .then((res1) => {
      setactivityPackage(res1)
    })
    .catch(() => Alert.alert("Could not get the activitypackage"));

    ActivityService.getAllActivities(res.activityPackId)
    .then((res2) => {
      setallActivities(res2)
      setcurrentActivity(res2[0])
      setnextActivity(res2[1])
      setready(true);
    })
    .catch(() => Alert.alert("Could not get all activities"));
    
    ActivityService.getNextActivityNico(PartyService.partyId,GuestService.guestId)
    .then((res3) => setnextActivity(res3))
    .catch(() => Alert.alert("Could not get next activity"));
    
  }

  async function getPartyInformation(){
    const response = await PartyService.getParty(
      PartyService.partyId,
      GuestService.guestId,
    )
    const result = await response.json()
    .then(res => onSucces(res))
    .catch(err => console.error(err));
    
  }

  useEffect(() => {
    console.log("THIS IS FROM THE GUESTSCREEN");
    //console.log(socket);
   // const { socket } = props;
            if(socket.connected) {
                console.log("Connected");
            }

    getPartyInformation();

  },[]);

  if (ready) {
    return (
      <View style={styles.container}>
        <Banner title="Guest Screen" />
        <Text style={styles.currentActivity}>Current Activity</Text>
        <View
          style={{ ...ShadowCSS.standardShadow, ...styles.challengeContainer }}
        >
          <View>
            <Text style={styles.partyTitle}>{currentActivity.title}</Text>
            <View style={styles.whiteLine}></View>
            <Text style={styles.partyTitle}>Started at:<Text style={styles.blueText}>{unixToHours(currentActivity.startTime)}</Text></Text>
          </View>
          <Text style={styles.guestMesssage}>
            {currentActivity.description}
          </Text>
          <View>
            
          </View>
        </View>
        <View style={styles.lowerContainer}>
          <Text style={styles.nextActivity}>Next Activity At</Text>
          <Text style={styles.timeStamp}>{unixToHours(nextActivity.startTime)}</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Banner title="Guest Screen" />
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
    color: Colors.secondary,
    fontSize: 35,
    textAlignVertical: "center",
  },
  loadingIcon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  blueText: {
    color: Colors.secondary,
    fontSize: 35,
  }
});
