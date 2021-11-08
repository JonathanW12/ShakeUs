import React, { useEffect, useState } from "react";
import Banner from "../Components/Banner";
import { View, Text, StyleSheet, FlatList } from "react-native";
import ActivityPackService from "../Components/Services/ActivityPackService";
import ActivityService from "../Components/Services/ActivityService";
import Colors from "../Constants/Colors";

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  activityContainer: {
    flex: 1,
    backgroundColor: Colors.secondary,
    height: 40,
    margin: 3,
  },
});
