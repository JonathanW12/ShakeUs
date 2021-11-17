import React, { useState, useEffect, useContext } from "react";
import Banner from "../Components/PageSections/Banner";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Colors from "../Constants/Colors";
import ParticipantBox from "../Components/UI/ParticipantBox";
import GuestService from "../Services/GuestService";
import PartyService from "../Services/PartyService";
import { SocketContext } from "../Context/SocketContext";
import { PartyContext } from "../Context/PartyContext";

export default ParticipantsScreen = ({ navigation }) => {
  const partyContext = useContext(PartyContext);
  const socket = useContext(SocketContext);
  //CAHNGE THE DEFAULT TO: ActivityPackService.packTitle
  //"wild wild west" is only for visibility
  const [partyTitle, setPartytitle] = useState("Wild wild west");
  //CAHNGE THE DEFAULT TO: GuestService.isHost
  //True is only for visibility
  const [currentUserIsHost, setIsHost] = useState(true);
  const [participantsList, setParticipantsList] = useState([]);
  const [_showingDeleteSymbol, setShowingDeleteSymbol] = useState(false);
  useEffect(() => {
    participantsList.forEach(
      (participant) => {
        participant.showingDeleteSymbol = _showingDeleteSymbol;
      },
      [_showingDeleteSymbol, setShowingDeleteSymbol]
    );
  });
  useEffect(() => {
    updateGuests();
  }, []);

  useEffect(() => {
    socket.on("guest-removed", () => {
      updateGuests();
    });
    socket.on("user-left-party", () => {
      updateGuests();
    });
    socket.on("user-joined-party", (guest) => {
      updateGuests();
    });
  }, [socket]);

  const renderPerson = ({ item }) => {
    if (item.host == true) {
      return (
        <ParticipantBox title={item.title} host={item.host} id={item.id} />
      );
    }
    return (
      <ParticipantBox
        title={item.title}
        host={item.host}
        showingDeleteSymbol={_showingDeleteSymbol}
        id={item.id}
      />
    );
  };
  const updateGuests = async () => {
    let newGuestList = [];
    const res = await GuestService.getAllGuests(
      partyContext.getPartyId(),
      partyContext.getPrimaryHost().id
    );
    for (let host of res.hosts) {
      newGuestList.push({
        id: host._id,
        title: host.name,
        host: true,
      });
    }
    for (let guest of res.guests) {
      newGuestList.push({
        id: guest._id,
        title: guest.name,
        showingDeleteSymbol: _showingDeleteSymbol,
      });
    }
    setParticipantsList(newGuestList);
  };

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
            setShowingDeleteSymbol(
              (_showingDeleteSymbol) => !_showingDeleteSymbol
            );
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
  temporary: {
    fontSize: 12,
    color: "red",
  },
});
