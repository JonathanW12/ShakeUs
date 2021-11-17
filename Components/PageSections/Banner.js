import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import Colors from "../../Constants/Colors";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/core";
import { UserContext } from "../../Context/UserContext";
import PartyService from "../../Services/PartyService";
import { SocketContext } from "../../Context/SocketContext";
import { PartyContext } from "../../Context/PartyContext";

export default Banner = (props) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const userContext = useContext(UserContext);
  const socketContext = useContext(SocketContext);
  const partyContext = useContext(PartyContext);

  const isHost = userContext.isHost();

  const leavePartyButtonHandle = async () => {
    const res = await PartyService.leaveParty(
      partyContext.getPartyId(),
      userContext.getUserId()
    );

    if (!res) {
      Alert.alert("You cannot delete the party");
      return;
    }

    await socketContext.leaveParty(partyContext.getPartyId());
    setModalVisible(!modalVisible);
    navigation.navigate("Main Screen");
  };

  const deletePartyButtonHandleAsPrimaryHost = async () => {
    const res = await PartyService.deleteParty(
      partyContext.getPartyId(),
      //userId should be primary host if he is allowed to delete party
      userContext.getUserId()
    );
    if (!res) {
      Alert.alert("You cannot delete the party");
      return;
    }
    socketContext.emit("leave-room", partyContext.getPartyId());
    setModalVisible(!modalVisible);
    navigation.navigate("Main Screen");
  };

  const showLeaveButtonText = () => {
    if (userContext.getIsPrimaryHost()) {
      return "Delete Party";
    } else {
      return "Leave Party";
    }
  };
  const leaveText = showLeaveButtonText();

  const backSymbol = () => {
    return (
      <View style={styles.container}>
        <View style={{ marginRight: 20 }}>
          <Icon
            name={"arrow-left"}
            type="feather"
            color="white"
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>

        <Text style={styles.titleText}>{props.title}</Text>
      </View>
    );
  };
  const partyCode = () => {
    if (partyContext.getPartyId() != "") {
      return (
        <View style={styles.menuItem}>
          <Text style={styles.participantsText}>
            Party code: {partyContext.getPartyId()}
          </Text>
        </View>
      );
    }
  };

  const menuSymbol = () => {
    return (
      <View style={styles.container}>
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            style={styles.invisibleButton}
          ></TouchableOpacity>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                style={{
                  ...styles.menuItem,
                  ...styles.topBorder,
                }}
              >
                <Text style={styles.participantsText}>Close</Text>
              </TouchableOpacity>
              {partyCode()}
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                  navigation.navigate("ParticipantsScreen");
                }}
                style={styles.menuItem}
              >
                <Text style={styles.participantsText}>Participants</Text>
              </TouchableOpacity>
              {isHost == true && (
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    navigation.navigate("CustomizePackScreen");
                  }}
                  style={styles.menuItem}
                >
                  <Text style={styles.participantsText}>Manage Activities</Text>
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              onPress={() => {
                if (userContext.getIsPrimaryHost()) {
                  {
                    deletePartyButtonHandleAsPrimaryHost();
                  }
                } else {
                  {
                    leavePartyButtonHandle();
                  }
                }
              }}
              style={styles.footer}
            >
              <Text style={styles.leavePartyText}>{leaveText}</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <View style={{ marginRight: 20 }}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
            style={styles.bannerContainer}
          >
            <Icon name={"menu"} type="feather" color="white" />

            <Text style={styles.titleText}>{props.title}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  if (props.isBack == true) {
    return backSymbol();
  }
  return menuSymbol();
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 90,
    paddingTop: 25,
    paddingLeft: 20,
    backgroundColor: Colors.primary,
    elevation: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  titleText: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    marginLeft: 15,
  },
  modalContent: {
    margin: 0,
    flex: 1,
    backgroundColor: Colors.primary,
    width: "80%",
    justifyContent: "space-between",
  },
  footer: {
    backgroundColor: "#B3341B",
    height: Dimensions.get("screen").height * 0.075,
    justifyContent: "center",
    paddingLeft: 25,
  },
  header: {},
  leavePartyText: {
    color: "white",
    fontSize: 18,
  },
  participantsText: {
    color: "white",
    fontSize: 18,
  },
  menuItem: {
    backgroundColor: Colors.primary,
    height: Dimensions.get("screen").height * 0.075,

    borderBottomColor: "white",
    borderBottomWidth: 2,
    justifyContent: "center",
    paddingLeft: 25,
  },
  topBorder: {
    borderTopColor: "white",
    borderTopWidth: 2,
  },
  invisibleButton: {
    height: Dimensions.get("window").height * 0.095,
    backgroundColor: "transparent",
    flex: 0,
  },
  bannerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
