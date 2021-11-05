import React, { useEffect, useState } from "react";
import Banner from "../Components/Banner";
import { View, Text, StyleSheet, FlatList } from "react-native";
import ActivityService from "../Components/Services/ActivityService";

export default CustomizePackScreen = ({ navigation }) => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    let activities = [];
    ActivityService.currentPack.activities.forEach((id) => {
      ActivityService.getActivityById(id);
      console.log("bob");
    });

    //.forEach((activityId) => {
    //console.log(activityId);
    //activities.push(ActivityService.getActivityById(activityId));
    //});
    setActivities(activities);
  }, []);

  const renderItem = (item) => {
    <View>
      <Text>{item}</Text>
    </View>;
  };

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
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
