import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Colors from "../../Constants/Colors";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/core";

export default Banner = (props) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  //CAHNGE THE DEFAULT TO: GuestService.isHost
  //True is only for visibility
  const [isHost, setIsHost] = useState(true);

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

  const menuSymbol = () => {
    return (
      <View style={styles.container}>
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                style={{ ...styles.menuItem, ...styles.topBorder }}
              >
                <Text style={styles.participantsText}>Close</Text>
              </TouchableOpacity>
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
                setModalVisible(!modalVisible);
                navigation.navigate("MainScreen");
              }}
              style={styles.footer}
            >
              <Text style={styles.leavePartyText}>Leave Party</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <View style={{ marginRight: 20 }}>
          <Icon
            name={"menu"}
            type="feather"
            color="white"
            onPress={() => {
              setModalVisible(true);
            }}
          />
        </View>

        <Text style={styles.titleText}>{props.title}</Text>
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
  },
  modalContent: {
    margin: 0,
    flex: 1,
    backgroundColor: Colors.primary,
    width: "80%",
    marginTop: "18%",
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
});
