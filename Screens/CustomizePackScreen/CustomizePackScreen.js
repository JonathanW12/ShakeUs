import React, { useCallback, useContext, useEffect, useState } from "react";
import Banner from "../../Components/PageSections/Banner";
import { View, StyleSheet, FlatList, BackHandler } from "react-native";
import ActivityPackService from "../../Services/ActivityPackService";
import ActivityService from "../../Services/ActivityService";
import Colors from "../../Constants/Colors";
import ActivityContainer from "./ActivityContainer";
import CustomizeToolBar from "./CustomizeToolBar";
import { PartyContext } from "../../Context/PartyContext";
import { SocketContext } from "../../Context/SocketContext";
import { useFocusEffect } from "@react-navigation/core";

export default CustomizePackScreen = ({ navigation }) => {
    const [activities, setActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const partyContext = useContext(PartyContext);
    const socket = useContext(SocketContext);

    useFocusEffect(
        useCallback(() => {
            if (selectedActivity) {
                const activity = activities.find(
                    (a) => a._id == selectedActivity._id
                );
                setSelectedActivity(activity);
            }
            BackHandler.addEventListener("hardwareBackPress", () => navigation.goBack())

            return;
        })
    );

    useEffect(() => {
        loadAllActivities();
    }, []);

    useEffect(() => {

        socket.on("activity-title-updated", loadAllActivities);
        socket.on("activity-description-updated", loadAllActivities);
        socket.on("activity-start-time-updated", loadAllActivities);
        socket.on("activity-added", loadAllActivities);

        return () => {
            socket.off("activity-title-updated", loadAllActivities);
            socket.off("activity-description-updated", loadAllActivities);
            socket.off("activity-start-time-updated", loadAllActivities);
            socket.off("activity-added", loadAllActivities);
        };
    }, [socket]);

    const onSelectActivity = (activity) => {
        setSelectedActivity(activity);
    };

    const loadAllActivities = async () => {
        const res = await ActivityService.getAllActivitiesByActivityPackId(
            partyContext.getActivityPack()._id
        );

        if (res) {
            setActivities(res);
        } else {
            throw new Error("Failed to load activities");
        }
    };

    const createActivity = async () => {
        navigation.navigate("ActivityFormScreen", {
            newActivity: true,
            activityId: "",
            activityTitle: "",
            activityDescription: "",
            activityStartTime: "",
        });
    };

    const updateSelectedActivity = async () => {
        if (selectedActivity) {
            navigation.navigate("ActivityFormScreen", {
                newActivity: false,
                activityId: selectedActivity._id,
                activityTitle: selectedActivity.title,
                activityDescription: selectedActivity.description,
                activityStartTime: selectedActivity.startTime,
            });
        }
    };

    const deleteSelectedActivity = async () => {
        if (selectedActivity) {
            const deleteRes = await ActivityService.deleteActivity(
                selectedActivity._id
            );
            const removeRes = await ActivityPackService.removeActivityFromPack(
                partyContext.getActivityPack()._id,
                //ActivityPackService.currentPack._id,
                selectedActivity._id
            );

            if (deleteRes && removeRes) {
                const currentActivities = [...activities];
                const newActivities = currentActivities.filter((a) => {
                    return a._id != selectedActivity._id;
                });
                setActivities(newActivities);
            } else {
                throw new Error("Failed to delete activity");
            }
        }
    };

    return (
        <View style={styles.container}>
            <Banner title="Customize Pack" />
            <FlatList
                data={activities}
                keyExtractor={(item) => {
                    return item._id.toString();
                }}
                renderItem={({ item, index }) => (
                    <ActivityContainer
                        item={item}
                        activity={activities[index]}
                        selectActivity={onSelectActivity}
                        selectedActivityId={
                            selectedActivity ? selectedActivity._id : null
                        }
                    ></ActivityContainer>
                )}
            />
            <CustomizeToolBar
                onDelete={deleteSelectedActivity}
                onEdit={updateSelectedActivity}
                onAdd={createActivity}
            ></CustomizeToolBar>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: Colors.secondary,
        paddingBottom: 80,
    },
});
