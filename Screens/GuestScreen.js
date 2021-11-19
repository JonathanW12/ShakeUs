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

    const findNextActivity = () => {
        getPartyInformation();
        let listOfActivities = partyContext.getAllActivities();

        for (let index = 0; index < listOfActivities.length; index++) {
            if (currentActivity._id == listOfActivities[index]._id) {
                if (listOfActivities[index + 1] != null) {
                    console.log(listOfActivities[index + 1]);
                    setnextActivity(listOfActivities[index + 1]);
                } else {
                    setnextActivity(null);
                }
            }
        }
        console.log(data.activity);
        setcurrentActivity(data.activity);
    };

    const getPartyInformation = async () => {
        console.log("BUH1");
        //setactivityPackage(null);
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
        const subscription = AppState.addEventListener(
            "change",
            (nextAppState) => {
                if (
                    appState.current.match(/inactive|background/) &&
                    nextAppState === "active"
                ) {
                    getPartyInformation();
                    //console.log("App has come to the foreground!");
                }
                appState.current = nextAppState;
                setAppStateVisible(appState.current);
                //console.log("AppState", appState.current);
            }
        );

        BackHandler.addEventListener("hardwareBackPress", () => true);

        if (isFocused) {
            getPartyInformation();
        }

        return () => {};
    }, [isFocused, socket]);

    useEffect(() => {
        socket.on("activity-added", onUpdate);
        socket.on("activity-startTime-updated", onUpdate);
        socket.on("activity-title-updated", onUpdate);
        socket.on("activity-description-updated", onUpdate);
        socket.on("activity-deleted", onUpdate);
        return () => {
            socket.off("activity-added", onUpdate);
            socket.off("activity-startTime-updated", onUpdate);
            socket.off("activity-title-updated", onUpdate);
            socket.off("activity-description-updated", onUpdate);
            socket.off("activity-deleted", onUpdate);
        };
    }, [socket]);

    const onUpdate = (data) => {
        getPartyInformation();
    };

    const onActivity = (data) => {
        console.log(data);
    };

    const onActivityUpdated = (data) => {
        partyContext.updateActivity(data.updatedActivity);
        onSocketEvent();
        console.log(data);
    };

    const onActivityRemoved = (data) => {
        partyContext.removeActivity(data);
        onSocketEvent();
        console.log(data);
    };

    const onUserJoinParty = (data) => {
        partyContext.addGuest(data.guestId);
    };

    const onUserLeaveParty = (data) => {
        partyContext.removeGuest(data.guestId);
    };

    const onUserPromoted = (data) => {
        partyContext.removeGuest(data.newHostId);
        partyContext.addHost(data.newHostId);
    };

    const onUserDemoted = (data) => {
        partyContext.removeHost(data.removedHostId);
        partyContext.addGuest(data.removedHostId);
    };

    const handleCurrentActivity = () => {
        if (currentActivity != null) {
            return (
                <View
                    style={{
                        ...ShadowCSS.standardShadow,
                        ...styles.challengeContainer,
                    }}
                >
                    <View>
                        <Text style={styles.partyTitle}>
                            {currentActivity.title}
                        </Text>
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
            );
        }
        return (
            <View
                style={{
                    ...ShadowCSS.standardShadow,
                    ...styles.challengeContainer,
                }}
            >
                <View>
                    <Text style={styles.partyTitle}>
                        Waiting For Next Activity
                    </Text>
                    <View style={styles.whiteLine}></View>
                </View>
                <Text style={styles.guestMesssage}>
                    Waiting for the first activity to start. You can see who
                    else has joined by looking at participants from the menu.
                </Text>
                <View></View>
            </View>
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
