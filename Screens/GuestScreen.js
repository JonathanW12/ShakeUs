import React, { useEffect, useState, useContext, useRef } from "react";
import Banner from "../Components/PageSections/Banner";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  Alert,
  BackHandler,
  AppState,
} from "react-native";
import Colors from "../Constants/Colors";
import ShadowCSS from "../Constants/ShadowCSS";
import ActivityPackService from "../Services/ActivityPackService";
import PartyService from "../Services/PartyService";
import ActivityService from "../Services/ActivityService";
import ActivityStartTime from "../Components/UI/ActivityStartTime";
import { SocketContext } from "../Context/SocketContext";
import { PartyContext } from "./../Context/PartyContext";
import { UserContext } from "../Context/UserContext";
import InfoWindowBottom from "../Components/PageSections/InfoWindowBottom";
import { useFocusEffect, useIsFocused } from "@react-navigation/core";
import { CommonActions } from "@react-navigation/routers";
import DeletePartySocketHandle from "./DeletePartySocketHandler";

export default GuestScreen = ({ navigation }) => {
  const [activityPackage, setactivityPackage] = useState(null);
  const [allActivities, setallActivities] = useState(null);
  const [currentActivity, setcurrentActivity] = useState(null);
  const [nextActivity, setnextActivity] = useState(null);
  const [ready, setready] = useState(false);
  const socket = useContext(SocketContext);
  const partyContext = useContext(PartyContext);
  const userContext = useContext(UserContext);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const isFocused = useIsFocused();

  const unixToHours = (unix) => {
    let unix_timestamp = unix;
    let date = new Date(unix_timestamp);
    let hours = date.getHours().toString().padStart(2, "0");
    var minutes = date.getMinutes().toString().padStart(2, "0");
    return hours + ":" + minutes;
  };

  const onSocketEvent = (data) => {
    let listOfActivities = partyContext.getAllActivities();

    if(currentActivity == null){
      setcurrentActivity(data.activity)
    }

      for (let index = 0; index < listOfActivities.length; index++) {
        if (data.activity._id == listOfActivities[index]._id) {
          if (listOfActivities[index + 1] != null) {
            setnextActivity(listOfActivities[index + 1]);
          } else {
            setnextActivity(null);
          }
        }
      }
  };

  const nextAppState = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      getPartyInformation();
    }
    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  };

  const getPartyInformation = async () => {
    let currentTime = +new Date();

    //Handle Party Result
    const partyResult = await PartyService.getParty(
      partyContext.getPartyId(),
      userContext.getUserId()
    );
    if (!partyResult) {
      Alert.alert("Unable to find party");
      return;
    }
    // Set the party ID for use under customizePack

    //Handle Activity Pack Result
    const activityPackResult = await ActivityPackService.getActivityPack(
      partyResult.activityPackId
    );
    if (!activityPackResult) {
      Alert.alert("Unable to fetch activity pack");
      return;
    }

    //Handle All activities Result
    const allActivitiesResult = await ActivityService.getAllActivities(
      partyResult.activityPackId
    );
    if (!allActivitiesResult) {
      Alert.alert("Unable to fetch all activities");
      return;
    }

    //Handle Next activity result

    const nextActivityResult = await ActivityService.getNextActivity(
      partyContext.getPartyId(),
      userContext.getUserId()
    );

    if (!nextActivityResult) {
      Alert.alert("Unable to fetch next activity");
      return;
    }

    // Set activityPack in partyContext for use in customizePack
    partyContext.setActivityPack(activityPackResult);
    partyContext.setAllActivities(allActivitiesResult);
    setactivityPackage(activityPackResult);
    setallActivities(allActivitiesResult);

    let arr = [];

    allActivitiesResult.forEach((element) => {
      if (element.startTime < currentTime) {
        arr.push(element);
      }
    });

    if (arr.length > 0) {
      setcurrentActivity(arr.slice(-1)[0]);
    } else {
      setcurrentActivity(null);
    }

    setready(true);

    if (nextActivityResult) {
      setnextActivity(nextActivityResult);
    } else {
      setnextActivity(null);
      //Alert.alert("Unable to fetch next activity");
    }
  };

  useEffect(() => {

    AppState.addEventListener("change", nextAppState);

    BackHandler.addEventListener("hardwareBackPress", () => true);

    if (isFocused) {
      getPartyInformation();
    }

    return () => {
        AppState.removeEventListener("change", nextAppState);
        
    };
  }, [isFocused]);

  useEffect(() => {
    socket.on("activity-started", onSocketEvent);
    socket.on("activity-added", getPartyInformation);
    socket.on("activity-title-updated", getPartyInformation);
    socket.on("activity-deleted ", getPartyInformation);



    return () => {
      socket.off("activity-started", onSocketEvent);
      socket.off("activity-added", getPartyInformation);
      socket.off("activity-title-updated", getPartyInformation);
      socket.off("activity-deleted ", getPartyInformation);
    };
  }, [socket]);

  const handleCurrentActivity = () => {
    if (currentActivity != null) {
      return (
        <>
          <DeletePartySocketHandler />
          <View
            style={{
              ...ShadowCSS.standardShadow,
              ...styles.challengeContainer,
            }}
          >
            <View>
              <Text style={styles.partyTitle}>{currentActivity.title}</Text>
              <View style={styles.whiteLine}></View>
              <Text style={styles.partyTitle}>
                <ActivityStartTime
                  activity={currentActivity}
                  style={{
                    ...styles.blueText,
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              </Text>
            </View>
            <Text style={styles.guestMesssage}>
              {currentActivity.description}
            </Text>
            <View></View>
          </View>
        </>
      );
    }
    return (
      <>
        <DeletePartySocketHandler />
        <View
          style={{
            ...ShadowCSS.standardShadow,
            ...styles.challengeContainer,
          }}
        >
          <View>
            <Text style={styles.partyTitle}>Waiting For Next Activity</Text>
            <View style={styles.whiteLine}></View>
          </View>
          <Text style={styles.guestMesssage}>
            Waiting for the first activity to start. You can see who else has
            joined by looking at participants from the menu.
          </Text>
          <View></View>
        </View>
      </>
    );
  };

  //Actual render below:
  if (ready) {
    return (
      <View style={styles.container}>
        <Banner title="Guest Screen" />
        <Text style={styles.currentActivity}>Current Activity</Text>

        {handleCurrentActivity()}
        {nextActivity ? (
          <InfoWindowBottom
            title={"Next activity starting at:"}
            content={unixToHours(nextActivity.startTime)}
          />
        ) : (
          <InfoWindowBottom
            title={"Next activity starting at:"}
            content={"No more activities"}
          />
        )}
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Banner title="Guest Screen" />
        <View style={styles.loadingIcon}>
          <ActivityIndicator size={52} color={Colors.primary} />
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
    fontSize: 24,
    margin: 15,
  },
  guestMesssage: {
    fontSize: 20,
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
  },
});
