import React, { useEffect, useState } from "react";
import Banner from "../Components/Banner";
import { View, Text, StyleSheet, FlatList } from "react-native";
import ActivityPackService from "../Components/Services/ActivityPackService";
import ActivityService from "../Components/Services/ActivityService";
import Colors from "../Constants/Colors";
import StandardButton from "../Components/StandardButton";
import ActivityManager from "../Components/ActivityManager";

export default CustomizePackScreen = ({ navigation }) => {
  const [activities, setActivities] = useState([]);

  const DATA = [{ title: "bob", id: 1 }];

  const loadAllActivities = async (ids) => {
    let loadedActivities = [];
    for (let id of ids) {
      let activity = await ActivityService.getActivityById(id);
      console.log("loading");
      loadedActivities.push(activity);
    }
    console.log("returning");
    setActivities(loadedActivities);
  };

  const [showActivityManager, setShowActivityManager] = useState(false);

  useEffect(() => {
    loadAllActivities(ActivityPackService.currentPack.activities);
  }, []);

  return (
    <View style={styles.container}>
      <Banner
        title="Customize Pack"
        iconName="arrow-left"
        onIconPress={() => {
          navigation.navigate("HostPartyScreen");
        }}
      />
      <FlatList
        data={activities}
        renderItem={({ item }) => {
          return (
            <View style={styles.activityContainer}>
              <Text>{item.title}</Text>
              <Text>{new Date(item.startTime).getHours()}</Text>
            </View>
          );
        }}
        keyExtractor={(item) => {
          return item._id.toString();
        }}
      />
      {showActivityManager && (
        <ActivityManager
          handleActivitySet={async (activity) => {
            const res = await ActivityService.createActivity(
              activity.title,
              activity.description,
              activity.startTime
            );
            console.log(res.activityId);

            activity._id = res.activityId;
            setActivities([...activities, activity]);

            await ActivityPackService.addActivityToPack(
              ActivityPackService.currentPack._id,
              res.activityId
            );
          }}
        />
      )}
      <View style={styles.bottomToolbar}>
        <View style={styles.buttonContainer}>
          <SmallButton title={"XX"} style={styles.button} />
          <SmallButton
            title={"NEW"}
            style={styles.button}
            action={() => {
              setShowActivityManager(!showActivityManager);
            }}
          />
          <SmallButton title={"XX"} style={styles.button} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  activityContainer: {
    flex: 1,
    backgroundColor: Colors.secondary,
    height: 40,
    margin: 3,
  },
  bottomToolbar: {
    height: 100,
    backgroundColor: Colors.tertiary,
    paddingBottom: "10%",
  },
  button: {
    backgroundColor: Colors.primary,
    width: 80,
    height: 60,
  },
  buttonContainer: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  modalContainer: {
    height: 200,
    width: 200,
    backgroundColor: Colors.primary,
  },
});
