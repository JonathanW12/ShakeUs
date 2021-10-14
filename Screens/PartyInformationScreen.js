import React from "react";
import Banner from "../Components/Banner";
import { View, Text, StyleSheet, Image } from "react-native";

export default PartyInformationScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Banner title="Party Information" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
