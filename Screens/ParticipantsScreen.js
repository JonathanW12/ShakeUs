import React, { useState } from "react";
import Banner from "../Components/Banner";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Colors from "../Constants/Colors";
import PersonBlock from "../Components/PersonBlock";
import GuestService from "../Components/Services/GuestService";
import PartyService from "../Components/Services/PartyService";

export default ParticipantsScreen = ({ navigation }) => {
  //CAHNGE THE DEFAULT TO: ActivityPackService.packTitle
  //"wild wild west" is only for visibility
  const [partyTitle, setPartytitle] = useState("Wild wild west");
  //CAHNGE THE DEFAULT TO: GuestService.isHost
  //True is only for visibility
  const [isHost, setIsHost] = useState(true);
  const [participantsList, setParticipantsList] = useState();
  const [isRemoving, setIsRemoving] = useState(false);

  const renderPerson = ({ item }) => {
    return (
      <PersonBlock title={item.title} host={item.host} showX={item.showX} />
    );
  };

  const getAllGuests = async () => {
    let newGuestList = [];
    //CHANGE TO:
    //GuestService.guestId
    //PartyService.partyId
    let response = await GuestService.getAllGuests(
      "p4iq9d5",
      "10e8d353-e328-44f1-ae31-223902c4a48e"
    );
    response = JSON.parse(JSON.stringify(response));
    for (let host of response.hosts) {
      newGuestList.push({
        id: host._id,
        title: host.name,
        host: true,
        showX: isRemoving,
      });
    }
    for (let guest of response.guests) {
      newGuestList.push({
        id: guest._id,
        title: guest.name,
        showX: isRemoving,
      });
    }
    setParticipantsList(newGuestList);
    newGuestList = [];
  };

  getAllGuests();
  return (
    <View style={styles.container}>
      <View>
        <Banner title="Participants" isBack={true} />
        <Text style={styles.partyTitle}>{partyTitle}</Text>
      </View>
      <View style={styles.innerContainer}>
        <FlatList
          data={participantsList}
          renderItem={renderPerson}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.lowerContainer}>
        <TouchableOpacity
          onPress={() => {
            setIsRemoving(!isRemoving);
          }}
        >
          <Text style={styles.removeGuests}>Remove Guests</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    flex: 1,
    justifyContent: "space-between",
  },
  innerContainer: {
    alignSelf: "center",
    height: "63%",
  },
  partyTitle: {
    fontSize: 24,
    color: "white",
    alignSelf: "center",
    padding: 10,
  },
  lowerContainer: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.tertiary,
    height: "10%",
    width: "80%",
    marginBottom: 5,
    borderRadius: 4,
  },
  removeGuests: {
    fontSize: 24,
    color: "white",
  },
});
