import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainScreen from "./Screens/MainScreen";
import HostPartyScreen from "./Screens/HostPartyScreen";
import JoinPartyScreen from "./Screens/JoinPartyScreen";
import GuestScreen from "./Screens/GuestScreen";
import PartyInformationScreen from "./Screens/PartyInformationScreen";
import CustomizePackScreen from "./Screens/CustomizePackScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator>
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HostPartyScreen"
          component={HostPartyScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="JoinPartyScreen"
          component={JoinPartyScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GuestScreen"
          component={GuestScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PartyInformationScreen"
          component={PartyInformationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CustomizePackScreen"
          component={CustomizePackScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
