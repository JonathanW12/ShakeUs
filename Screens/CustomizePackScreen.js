import React, { useEffect, useState } from "react";
import Banner from "../Components/Banner";
import { View, Text, StyleSheet, FlatList } from "react-native";
import ActivityPackService from "../Components/Services/ActivityPackService";
import ActivityService from "../Components/Services/ActivityService";
import Colors from "../Constants/Colors";
import StandardButton from "../Components/StandardButton";
import ActivityManager from "../Components/ActivityManager";
import ActivityScheduler from "../Components/ActivityScheduler";
import ActivityEditor from "../Components/ActivityEditor";

export default CustomizePackScreen = ({ navigation }) => {
  const [activities, setActivities] = useState([]);

  const loadAllActivities = async (ids) => {
    let loadedActivities = [];
    for (let id of ids) {
      let activity = await ActivityService.getActivityById(id);
      loadedActivities.push(activity);
    }
    loadedActivities.sort((a1, a2) => {
      return a1.startTime - a2.startTime;
    });
    setActivities(loadedActivities);
  };

  const [showActivityManager, setShowActivityManager] = useState(false);
  const [showActivityScheduler, setShowActivityScheduler] = useState(false);
  const [showActivityEditor, setShowActivityEditor] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  useEffect(() => {
    loadAllActivities(ActivityPackService.currentPack.activities);
  }, []);

  const createActivity = async (activity) => {
    const res = await ActivityService.createActivity(
      activity.title,
      activity.description,
      activity.startTime
    );
    activity._id = res.activityId;
    setActivities([...activities, activity]);
    await ActivityPackService.addActivityToPack(
      ActivityPackService.currentPack._id,
      res.activityId
    );
  };

  const updateActivity = async (activity) => {
    await ActivityService.patchActivity(
      activity._id,
      activity.title,
      activity.description,
      activity.startTime
    );
    const tempActivities = [...activities];
    const newActivities = tempActivities.filter((a) => {
      return a._id != activity._id;
    });
    newActivities.push(activity);
    newActivities.sort((a1, a2) => {
      return a1.startTime - a2.startTime;
    });

    setActivities(newActivities);
  };

  const deleteActivity = async () => {};

  return (
    <View style={styles.container}>
      <Banner title="Customize Pack" />
      <FlatList
        data={activities}
        renderItem={({ item }) => {
          return (
            <View style={styles.activityContainer}>
              <Text>{item.title}</Text>
              <Text>
                {(function () {
                  const time = new Date(item.startTime);
                  return (
                    time.getDate() +
                    "/" +
                    time.getMonth() +
                    1 +
                    "/" +
                    time.getFullYear() +
                    "/" +
                    time.getHours() +
                    ":" +
                    time.getMinutes()
                  );
                })()}
              </Text>
              <Text>{item.description}</Text>
              <StandardButton
                action={() => {
                  setSelectedActivity(item);
                  setShowActivityManager(false);
                  setShowActivityScheduler(false);
                  setShowActivityEditor(true);
                }}
                title={"EDIT"}
              ></StandardButton>
            </View>
          );
        }}
        keyExtractor={(item) => {
          return item._id.toString();
        }}
      />
      {showActivityManager && (
        <ActivityManager
          handleActivitySet={createActivity}
          onSubmit={() => {
            setShowActivityManager(false);
          }}
        />
      )}
      {showActivityEditor && (
        <ActivityEditor
          selectedActivity={selectedActivity}
          handleActivitySet={updateActivity}
          onSubmit={() => {
            setShowActivityEditor(false);
          }}
        />
      )}
      {showActivityScheduler && (
        <ActivityScheduler
          handleActivityScheduler={async (startTime, interval) => {
            const newActivities = [];
            for (let i = 0; i < activities.length; i++) {
              let patchedActivity = activities[i];
              patchedActivity.startTime = startTime + i * interval * 60 * 1000;
              await ActivityService.patchActivity(
                patchedActivity._id,
                patchedActivity.title,
                patchedActivity.description,
                patchedActivity.startTime
              );
              newActivities.push(patchedActivity);
            }
            setActivities(newActivities);
          }}
          onSubmit={() => {
            setShowActivityManager(false);
          }}
        />
      )}
      <View style={styles.bottomToolbar}>
        <View style={styles.buttonContainer}>
          <SmallButton
            title={"New Actvitiy"}
            style={styles.button}
            action={() => {
              setShowActivityScheduler(false);
              setShowActivityManager(!showActivityManager);
            }}
          />
          <SmallButton
            title={"Edit Schedule"}
            style={styles.button}
            action={() => {
              setShowActivityManager(false);
              setShowActivityScheduler(false);
              setShowActivityEditor(true);
            }}
          />
          <SmallButton
            title={"Postpone Activities"}
            style={styles.button}
            action={() => {
              setShowActivityManager(false);
              setShowActivityEditor(false);
              setShowActivityScheduler(!showActivityScheduler);
            }}
          />
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
    height: 100,
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
