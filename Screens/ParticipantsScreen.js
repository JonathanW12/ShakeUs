import React, { useState } from "react";
import Banner from "../Components/Banner";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import Colors from "../Constants/Colors";
import PersonBlock from "../Components/PersonBlock";

export default ParticipantsScreen = ({ navigation }) => {
  const [partyTitle, setPartytitle] = useState("Wild wild west");
  const DUMMYDATA = [
    { id: 1, title: "mr.anders", host: true },
    { id: 2, title: "neo", host: null },
    { id: 3, title: "jack black" },
    { id: 4, title: "mr.anders" },
    { id: 21, title: "neo" },
    { id: 312, title: "jack black" },
    { id: 13, title: "mr.anders" },
    { id: 232, title: "neo" },
    { id: 34, title: "jack black" },
    { id: 16, title: "mr.anders" },
    { id: 27, title: "neo" },
    { id: 38, title: "jack black" },
  ];
  const [participantsList, setParticipantsList] = useState(DUMMYDATA);

  const renderPerson = ({ item }) => {
    return <PersonBlock title={item.title} host={item.host} />;
  };

  return (
    <View style={styles.container}>
      <Banner title="Participants" isBack={true} />
      <View style={styles.innerContainer}>
        <Text style={styles.partyTitle}>{partyTitle}</Text>

        <FlatList
          data={participantsList}
          renderItem={renderPerson}
          keyExtractor={(item) => item.id}
        />

        <PersonBlock title={"mr. anders"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.secondary, flex: 1 },
  innerContainer: {
    alignSelf: "center",
  },
  partyTitle: {
    fontSize: 24,
    color: "white",
    alignSelf: "center",
    padding: 10,
  },
});
