import React, { useState } from "react";
import Banner from "../Components/Banner";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  Button,
} from "react-native";
import Colors from "../Constants/Colors";
import PersonBlock from "../Components/PersonBlock";
import GuestService from "../Components/Services/GuestService";
import PartyService from "../Components/Services/PartyService";

export default ParticipantsScreen = ({ navigation }) => {
  const [partyTitle, setPartytitle] = useState("Wild wild west");
  const DUMMYDATA = [
    { id: 1, title: "mr.anders", host: true },
    { id: 2, title: "neo", host: null },
    { id: 3, title: "jack black" },
  ];
  const [participantsList, setParticipantsList] = useState(DUMMYDATA);

  const renderPerson = ({ item }) => {
    return <PersonBlock title={item.title} host={item.host} />;
  };
  const joinParty = () => {
    let response = PartyService.joinParty("p4iq9d5", "luke skywalker");
    let response2 = JSON.stringify(response);
    return response;
  };

  const getAllGuests = async () => {
    let newGuestList = [];
    //let userId = get...
    //let partyId = getpart...
    let response = await GuestService.getAllGuests(
      "p4iq9d5",
      "10e8d353-e328-44f1-ae31-223902c4a48e"
    );
    //THIS cant be the right way.. wtf ??
    let res2 = JSON.parse(JSON.stringify(response));
    for (let host of res2.hosts) {
      newGuestList.push({ id: host._id, title: host.name, host: true });
    }
    for (let guest of res2.guests) {
      newGuestList.push({ id: guest._id, title: guest.name });
    }
    setParticipantsList(newGuestList);
    newGuestList = [];
  };

  const getPartyTheme = async () => {
    //let userId = get...
    //let partyId = get...
    //let activityId = PartyService.getPartyPackId(userId,partyId)
    //ActivityPackService.getActivity(activityId)
  };

  getAllGuests();
  return (
    <View style={styles.container}>
      <Banner title="Participants" isBack={true} />
      <Button title="join test123" onPress={joinParty} />
      <Button title="get guests" onPress={getAllGuests} />
      <View style={styles.innerContainer}>
        <Text style={styles.partyTitle}>{partyTitle}</Text>

        <FlatList
          data={participantsList}
          renderItem={renderPerson}
          keyExtractor={(item) => item.id}
        />
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
