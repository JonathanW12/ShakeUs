import React, { useContext, useRef, useState } from "react";
import Banner from "../Components/PageSections/Banner";
import { View, Text, StyleSheet, Alert } from "react-native";
import StandardButton from "../Components/UI/StandardButton";
import Colors from "../Constants/Colors";
import CustomCarousel from "../Components/PageSections/CustomCarusel";
import ActivityPackService from "../Services/ActivityPackService";
import PartyService from "../Services/PartyService";
import TimeSelector from "../Components/UI/TimeSelector";
import { PartyContext } from "./../Context/PartyContext";
import { UserContext } from "../Context/UserContext";
import { SocketContext } from "../Context/SocketContext";

export default HostPartyScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const partyContext = useContext(PartyContext);
  const userContext = useContext(UserContext);
  const socketContext = useContext(SocketContext);

  const timeSelectorRef = useRef(null);

  async function createTheParty() {
    const res = await PartyService.createParty(
      partyContext.getActivityPack()._id,
      partyContext.getPrimaryHost().name,
      userContext.getNotificationToken(),
      timeSelectorRef.current.getSelectedTime()
    );

    if (res) {
      partyContext.setPartyId(res.partyId);
      partyContext.setPrimaryHost({
        id: res.hostId,
        name: partyContext.getPrimaryHost().name,
      });

      userContext.setUserId(res.hostId);
      userContext.setIsPrimaryHost(true);
      userContext.setIs;
      const party = await PartyService.getParty(
        partyContext.getPartyId(),
        res.hostId
      );

      if (party) {
        const activityPack = await ActivityPackService.getActivityPack(
          party.activityPackId
        );

        if (activityPack) {
          partyContext.setActivityPack(activityPack);
        }

        partyContext.setHosts(party.hosts);
      }

      socketContext.emit("join-room", partyContext.getPartyId());
      navigation.navigate("PartyInformationScreen");
    }
  }

  const handleActionStartParty = () => {
    if (partyContext.getPrimaryHost().name && partyContext.getActivityPack()) {
      createTwoButtonAlert();
    } else {
      throw new Error("Missing hostname and / or activity pack");
    }
  };

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Confirmation",
      `Create party: ${partyContext.getActivityPack().title}`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: () => createTheParty() },
      ]
    );

  return (
    <View style={styles.container}>
      <Banner title="Host Party" isBack={true} />
      <View style={styles.contentWrapper}>
        <Text style={styles.header1}>Select Activity Pack</Text>
        <View style={[styles.activityWrapper]}>
          <CustomCarousel
            navigation={navigation}
            setIndex={setIndex}
          ></CustomCarousel>
        </View>
        <TimeSelector ref={timeSelectorRef}></TimeSelector>
        <View style={{ alignItems: "center", width: "100%" }}>
          <StandardButton
            textStyle={styles.buttonTextStyle}
            style={{
              ...styles.button,
              backgroundColor: Colors.tertiary,
            }}
            title="Start Party"
            action={handleActionStartParty}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  header1: {
    fontSize: 20,
    color: "#fff",
    marginTop: 20,
    marginBottom: 20,
  },
  contentWrapper: {
    flex: 1,
    alignItems: "center",
  },
  activityWrapper: {
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    minHeight: 335,
  },
  activityCarousel: {
    width: "90%",
    height: 260,
    backgroundColor: Colors.primary,
    padding: 15,
    flexWrap: "wrap",
  },

  border: {
    borderColor: "#fff",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  whiteBorderBottom: {
    borderBottomWidth: 1,
    borderColor: "#fff",
  },
  whiteTextColor: {
    color: "#fff",
    textAlign: "center",
  },
  activityHeader: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 24,
    width: "100%",
    textAlign: "center",
  },
  activityCount: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  activityPackDescription: {
    color: "#fff",
    marginTop: 12,
    paddingBottom: 12,
    fontSize: 18,
    textAlign: "center",
  },
  centerText: {
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: Colors.secondary,
    width: 200,
    marginTop: 20,
  },
  buttonStartParty: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: Colors.tertiary,
    width: "90%",
    marginTop: 20,
    height: 70,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
