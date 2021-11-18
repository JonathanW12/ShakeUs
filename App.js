// exe819m
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainScreen from "./Screens/MainScreen";
import HostPartyScreen from "./Screens/HostPartyScreen";
import JoinPartyScreen from "./Screens/JoinPartyScreen";
import GuestScreen from "./Screens/GuestScreen";
import PartyInformationScreen from "./Screens/PartyInformationScreen";
import CustomizePackScreen from "./Screens/CustomizePackScreen/CustomizePackScreen";
import JoinPartyScreenHost from "./Screens/JoinPartyScreenHost";
import ParticipantsScreen from "./Screens/ParticipantsScreen";

import * as Notifications from "expo-notifications";

import { SocketProvider, socket } from "./Context/SocketContext";
import ActivityFormScreen from "./Screens/ActivityFormScreen";
import PartyProvider from "./Context/PartyContext";
import { UserProvider } from "./Context/UserContext";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});
const Stack = createNativeStackNavigator();

export default function App() {
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                setNotification(notification);
            });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current =
            Notifications.addNotificationResponseReceivedListener(
                (response) => {}
            );

        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current
            );
            Notifications.removeNotificationSubscription(
                responseListener.current
            );
        };
    }, []);

    return (
        <SocketProvider socket={socket}>
            <PartyProvider>
                <UserProvider>
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
                            <Stack.Screen
                                name="ActivityFormScreen"
                                component={ActivityFormScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="JoinPartyScreenHost"
                                component={JoinPartyScreenHost}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="ParticipantsScreen"
                                component={ParticipantsScreen}
                                options={{ headerShown: false }}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                </UserProvider>
            </PartyProvider>
        </SocketProvider>
    );
}
