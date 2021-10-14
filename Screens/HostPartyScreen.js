import React from "react";
import Banner from "../Components/Banner";
import { View, Text, StyleSheet, Image } from "react-native";
import StandardButton from "../Components/StandardButton";
import Colors from "../Constants/Colors";

export default HostPartyScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Banner
        title="Host Party"
        iconName="arrow-left"
        onIconPress={() => {
          navigation.navigate("MainScreen");
        }}
      />
      <View>
        <StandardButton
          title="Settings 1"
          action={() => {
            console.log("test");
          }}
        />
        <StandardButton
          title="Settings 2"
          action={() => {
            console.log("test");
          }}
        />
        <StandardButton
          title="Settings 3"
          action={() => {
            console.log("test");
          }}
        />
        <StandardButton
          title="Settings 4"
          action={() => {
            console.log("test");
          }}
        />
        <StandardButton
          title="Party Information"
          action={() => {
            navigation.navigate("PartyInformationScreen");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
