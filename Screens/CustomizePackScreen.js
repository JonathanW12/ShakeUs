import React from "react";
import Banner from "../Components/Banner";
import { View, Text, StyleSheet, FlatList, useState } from "react-native";
import ActivityService from "../Components/Services/ActivityService";

export default CustomizePackScreen = ({ navigation }) => {
  const [activityPack, setActivityPack] = useState(ActivityService.currentPack);

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
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
