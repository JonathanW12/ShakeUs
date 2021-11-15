import React, { useState } from 'react';
import Banner from '../Components/Banner';
import { View, Text, StyleSheet, Alert } from 'react-native';
import StandardButton from '../Components/StandardButton';
import Colors from '../Constants/Colors';
import CustomCarousel from '../Components/CustomCarusel';
import DateTimePicker from '@react-native-community/datetimepicker';
import GuestService from '../Components/Services/GuestService';
import ActivityPackService from '../Components/Services/ActivityPackService';
import PartyService from '../Components/Services/PartyService';

export default HostPartyScreen = ({ navigation }) => {
    const [index, setIndex] = useState(0);

    async function createTheParty() {
        const res = await PartyService.createParty(
            ActivityPackService.currentPack._id,
            GuestService.hostName,
            GuestService.guestNotificationToken
        );

        if (res) {
            PartyService.partyId = res.partyId;
            PartyService.hostId = res.hostId;
            GuestService.guestId = res.hostId;

            const party = await PartyService.getParty(
                PartyService.partyId,
                res.hostId
            );

            console.log(party);

            if (party) {
                await ActivityPackService.updateCurrentPack(
                    party.activityPackId
                );

                console.log(
                    'Activity Pack: ' + ActivityPackService.currentPack
                );
            }

            navigation.navigate('PartyInformationScreen');
        }
    }

    const handleActionStartParty = () => {
        if (GuestService.hostName && ActivityPackService.currentPack) {
            createTwoButtonAlert();
        } else {
            throw new Error('Missing hostname and / or currentPack');
        }
    };

    const createTwoButtonAlert = () =>
        Alert.alert(
            'Confirmation',
            `Create party: ${ActivityPackService.currentPack.title}`,
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => createTheParty() },
            ]
        );

    const [date, setDate] = useState(new Date(new Date().getTime() + 3600000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [selectedActivityPack, setSelectedActivtyPack] = useState();
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    return (
        <View style={styles.container}>
            <Banner title="Host Party" />
            <View style={styles.contentWrapper}>
                <Text style={styles.header1}>Select Activity Pack</Text>
                <View style={[styles.activityWrapper]}>
                    <CustomCarousel
                        navigation={navigation}
                        setIndex={setIndex}
                    ></CustomCarousel>
                </View>
                <View style={styles.timeWrapper}>
                    <View style={styles.timeBox}>
                        <Text style={styles.timeBoxHeader}>Start Time</Text>

                        <View style={styles.timeBoxContent}>
                            <StandardButton
                                title={date.getHours()}
                                shadow={false}
                                style={styles.timeButton}
                                textStyle={{ color: 'black' }}
                                action={() => {
                                    setShow(true);
                                }}
                            />

                            <Text style={styles.dotsBetweenTime}>:</Text>

                            <StandardButton
                                title={date.getMinutes()}
                                shadow={false}
                                style={styles.timeButton}
                                textStyle={{ color: 'black' }}
                                action={() => {
                                    setShow(true);
                                }}
                            />
                        </View>
                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={'time'}
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                            />
                        )}
                    </View>
                </View>
                <View style={{ alignItems: 'center', width: '100%' }}>
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
    timeButton: {
        width: '40%',
        backgroundColor: 'white',
        borderRadius: 5,
        height: 60,
    },
    header1: {
        fontSize: 20,
        color: '#fff',
        marginTop: 20,
        marginBottom: 20,
    },
    contentWrapper: {
        flex: 1,
        alignItems: 'center',
    },
    activityWrapper: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        minHeight: 335,
    },
    activityCarousel: {
        width: '90%',
        height: 260,
        backgroundColor: Colors.primary,
        padding: 15,
        flexWrap: 'wrap',
    },

    border: {
        borderColor: '#fff',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
    },
    whiteBorderBottom: {
        borderBottomWidth: 1,
        borderColor: '#fff',
    },
    whiteTextColor: {
        color: '#fff',
        textAlign: 'center',
    },
    activityHeader: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 24,
        width: '100%',
        textAlign: 'center',
    },
    activityCount: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10,
    },
    activityPackDescription: {
        color: '#fff',
        marginTop: 12,
        paddingBottom: 12,
        fontSize: 18,
        textAlign: 'center',
    },
    centerText: {
        alignItems: 'center',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: Colors.secondary,
        width: 200,
        marginTop: 20,
    },
    buttonStartParty: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: Colors.tertiary,
        width: '90%',
        marginTop: 20,
        height: 70,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },

    // CLOCK
    timeWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '90%',
    },
    timeBox: {
        width: '45%',
        backgroundColor: Colors.primaryDark,
        borderRadius: 5,
    },

    timeBoxHeader: {
        color: '#fff',
        fontWeight: '700',
        textAlign: 'center',
        padding: 5,
    },
    timeBoxContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        padding: 10,
    },
    timeBoxNumberSquare: {
        color: Colors.secondary,
        fontSize: 22,
        backgroundColor: '#fff',
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 2,
        width: '40%',
    },
    dotsBetweenTime: {
        fontWeight: '700',
        color: '#fff',
        fontSize: 22,
    },
});
