import React, {useEffect, useState, useContext} from "react";
import Banner from "../Components/PageSections/Banner";
import { View, Text, StyleSheet, Image, Dimensions, ActivityIndicator, Alert } from "react-native";
import Colors from "../Constants/Colors";
import ShadowCSS from "../Constants/ShadowCSS";
import ActivityPackService from "../Services/ActivityPackService";
import PartyService from "../Services/PartyService";
import GuestService from "../Services/GuestService";
import ActivityService from "../Services/ActivityService";
import {SocketContext} from "../Context/SocketContext";
import ActivityStartTime from "../Components/UI/ActivityStartTime";

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

  const getPartyInformation = async () => {
    // Fetch party to get activityPackId
    const partyResult = await PartyService.getParty(
      PartyService.partyId,
      GuestService.guestId
    )
    console.log(partyResult)
    // Continue if party exists
    if(partyResult) {

      const activityPackResult = await ActivityPackService.getActivityPack(
        partyResult.activityPackId
      )
  
      const allActivitiesResult = await ActivityService.getAllActivities(
        partyResult.activityPackId
      )
  
      const nextActivityResult = await ActivityService.getNextActivity(
        PartyService.partyId,
        GuestService.guestId
      )

      // Use fetch results
      if(activityPackResult && allActivitiesResult){
        console.log(activityPackResult)
        console.log(allActivitiesResult)


        setactivityPackage(activityPackResult);
        setallActivities(allActivitiesResult);
        setcurrentActivity(allActivitiesResult[0]);
        setready(true);
      } else {
        Alert.alert("Unable to fetch activities");
      }
      if(nextActivityResult){
        setnextActivity(nextActivityResult);
      } else {
        Alert.alert("Unable to fetch next activity");
      }
    
    // Handle error fetching party
    } else {
      Alert.alert("Unable to find party");
    }
  }

  useEffect(() => {
    getPartyInformation();
  },[]);

  useEffect(() => {
    // Socket event when activity starts!
    socket.on("activity-started", (activity) => {
      setcurrentActivity(activity);

      for (let index = 0; index < allActivities.length; index++) {
        if(currentActivity == allActivities[index]){
          if(allActivities[index+1] != null){
            setnextActivity(allActivities[index+1]);
          } else {
            setnextActivity(null);
          }
        }
      }
    })
    return () => {
      //Clean
    }
  }, [socket])

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
            <Text style={styles.partyTitle}>{
              <ActivityStartTime activity = {currentActivity} />
            }</Text>
          </View>
          <Text style={styles.guestMesssage}>
            {currentActivity.description}
          </Text>
          <View>
            
          </View>
        </View>
        <View style={styles.lowerContainer}>
          <Text style={styles.nextActivity}>Next Activity At</Text>
          <Text style={styles.timeStamp}>{  <ActivityStartTime activity = {nextActivity} />
          }</Text>
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
