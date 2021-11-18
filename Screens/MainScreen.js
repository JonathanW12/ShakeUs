import React, { useState, useEffect, useContext } from 'react';
import { Dimensions, View, Text, StyleSheet, Image } from 'react-native';
import StandardButton from '../Components/UI/StandardButton';
import Colors from '../Constants/Colors';
import Constants from 'expo-constants';
import { PartyContext } from './../Context/PartyContext';
import * as Notifications from 'expo-notifications';
import { UserContext } from '../Context/UserContext';

export default MainScreen = ({ navigation }) => {
    const [hostId, sethostId] = useState(null);
    const partyContext = useContext(PartyContext);
    const userContext = useContext(UserContext);

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) =>
            userContext.setNotificationToken(token)
        );
    }, []);

    const handleActionHostParty = () => {
        navigation.navigate('JoinPartyScreenHost');
    };

    const handleActionJoinParty = () => {
        navigation.navigate('JoinPartyScreen');
    };

    const registerForPushNotificationsAsync = async () => {
        let token;

        if (Constants.isDevice) {
            const { status: existingStatus } =
                await Notifications.getPermissionsAsync();

            const finalStatus = existingStatus;

            if (existingStatus !== 'granted') {
                const { status } =
                    await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }

            token = (await Notifications.getExpoPushTokenAsync()).data;
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
    };

    useEffect(() => {
        sethostId(partyContext.getPrimaryHost()._id);
    }, [hostId]);

    if (partyContext.getPrimaryHost().id) {
      return (
        <View style={styles.container}>
          <View style={styles.logoTitleContainer}>
            <Image
              source={require("../assets/ShakeUsLogo.png")}
              style={styles.logo}
            />
            <Text style={styles.title}>ShAKeUs</Text>
          </View>
          <View style={styles.contentContainer}>
            <StandardButton
              textStyle={styles.buttonTextStyle}
              style={{
                ...styles.button,
                backgroundColor: Colors.tertiary,
              }}
              title="Your Party"
              action={() => {
                navigation.navigate("GuestScreen");
              }}
            />
          </View>
        </View>
      );
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.logoTitleContainer}>
                    <Image
                        source={require('../assets/ShakeUsLogo.png')}
                        style={styles.logo}
                    />
                    <Text style={styles.title}>ShAKeUs</Text>
                </View>
                <View style={styles.contentContainer}>
                    <StandardButton
                        textStyle={styles.buttonTextStyle}
                        style={{
                            ...styles.button,
                            backgroundColor: Colors.tertiary,
                        }}
                        title="Join Party"
                        action={handleActionJoinParty}
                    />
                    <StandardButton
                        textStyle={styles.buttonTextStyle}
                        style={{
                            ...styles.button,
                            backgroundColor: Colors.primary,
                        }}
                        title="Host Party"
                        action={handleActionHostParty}
                    />
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.secondary,
        flex: 1,
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
        marginBottom: 25,
    },
    button: { width: '90%', height: 65 },
    buttonTextStyle: {
        fontSize: 20,
    },
    logo: {
        width: '60%',
        //Do not change height.
        height: Dimensions.get('screen').width * 0.6,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: '15%',
    },
    title: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 60,
        //TODO SET NICE FONT
    },
});
