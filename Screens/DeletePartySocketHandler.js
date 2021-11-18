import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Alert } from "react-native";
import { SocketContext } from "../Context/SocketContext";
import { PartyContext } from "../Context/PartyContext";
import { UserContext } from "../Context/UserContext";
import { useNavigation } from "@react-navigation/core";

const userInfo = {
  isHost: false,
  userId: "",
  notificationToken: "",
  isPrimaryHost: false,
};
const partyInfo = {
  _id: "",
  activityPack: {
    _id: "",
    title: "",
    description: "",
    activities: [],
  },
  primaryHost: {
    id: "",
    name: "",
  },
  hosts: [],
  guests: [],
  allActivities: [],
};

export default DeletePartySocketHandler = () => {
  console.log("im woooorking");
  const navigation = useNavigation();
  const socketContext = useContext(SocketContext);
  const userContext = useContext(UserContext);
  const partyContext = useContext(PartyContext);

  useEffect(() => {
    socketContext.on("party-deleted", partyIsDeleted);
    socketContext.on("guest-removed", removedFromParty);

    return () => {
      socketContext.off("party-deleted", partyIsDeleted);
      socketContext.off("guest-removed", removedFromParty);
    };
  }, [socketContext]);

  const partyIsDeleted = () => {
    Alert.alert("Party is no longer available");
    navigation.navigate("MainScreen");
    //set all states back to default
    userContext.setUserId(userInfo.userId);
    userContext.setNotificationToken(userInfo.notificationToken);
    userContext.setIsPrimaryHost(userInfo.isPrimaryHost);
    userContext.setIsHost(userInfo.isHost);

    partyContext.setPartyId(partyInfo._id);
    partyContext.setActivityPack(partyInfo.activityPack);
    partyContext.setPrimaryHost(partyInfo.primaryHost);
    partyContext.setHosts(partyInfo.hosts);
    partyContext.setGuests(partyInfo.guests);
    partyContext.getAllActivities(partyInfo.getAllActivities);
  };
  const removedFromParty = (data) => {
    if (data.rempovedGuestId == userContext.getUserId()) partyIsDeleted();
  };
};

const styles = StyleSheet.create({});
