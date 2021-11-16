// exe819m
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Platform, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from './Screens/MainScreen';
import HostPartyScreen from './Screens/HostPartyScreen';
import JoinPartyScreen from './Screens/JoinPartyScreen';
import GuestScreen from './Screens/GuestScreen';
import PartyInformationScreen from './Screens/PartyInformationScreen';
import CustomizePackScreen from './Screens/CustomizePackScreen';
import JoinPartyScreenHost from './Screens/JoinPartyScreenHost';
import ParticipantsScreen from './Screens/ParticipantsScreen';

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

import io from 'socket.io-client';
import { SocketProvider } from './Components/SocketContext';
import GuestService from './Components/Services/GuestService';
import ActivityFormScreen from './Screens/ActivityFormScreen';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});
const SocketContext = React.createContext(null);
const Stack = createNativeStackNavigator();

export default function App() {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const [socket, setsocket] = useState(null);

    const connectSocket = () => {
        try {
            console.log('connecting to socket');
            setsocket({
                socket: io.connect('https://shakeus.herokuapp.com/', {
                    transports: ['websocket'],
                    reconnectionAttempts: 15,
                }),
            });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        connectSocket();

        registerForPushNotificationsAsync().then((token) =>
            setExpoPushToken(token)
        );

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                setNotification(notification);
            });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current =
            Notifications.addNotificationResponseReceivedListener(
                (response) => {
                    console.log(response);
                }
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
        </SocketProvider>
    );
}

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'Original Title',
        body: 'And here is the body!',
        data: { someData: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        GuestService.guestNotificationToken = token;
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
