import React, { useState, useEffect, useContext,useCallback } from 'react';
import Banner from '../Components/PageSections/Banner';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Alert,
    BackHandler,
} from 'react-native';
import Colors from '../Constants/Colors';
import ParticipantBox from '../Components/UI/ParticipantBox';
import GuestService from '../Services/GuestService';
import { SocketContext } from '../Context/SocketContext';
import { PartyContext } from '../Context/PartyContext';
import { UserContext } from '../Context/UserContext';
import { useFocusEffect } from '@react-navigation/core';

export default ParticipantsScreen = ({ navigation }) => {
    const partyContext = useContext(PartyContext);
    const userContext = useContext(UserContext);
    const socket = useContext(SocketContext);
    const [partyTitle, setPartytitle] = useState(
        partyContext.getActivityPack.title
    );
    //CAHNGE THE DEFAULT TO: GuestService.isHost
    //True is only for visibility
    const [currentUserIsHost, setIsHost] = useState(userContext.getIsHost());
    const [participantsList, setParticipantsList] = useState([]);
    const [_showingDeleteSymbol, setShowingDeleteSymbol] = useState(false);

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", () => navigation.goBack())
            return;
        })
    );

    useEffect(() => {
        participantsList.forEach((participant) => {
            participant.showingDeleteSymbol = _showingDeleteSymbol;
        });
    }, [_showingDeleteSymbol, setShowingDeleteSymbol]);
    useEffect(() => {
        updateGuests();
    }, []);

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", () => navigation.goBack())

        socket.on('guest-removed', updateGuests);
        socket.on('user-left-party', updateGuests);
        socket.on('user-joined-party', updateGuests);

        return () => {
            socket.off('guest-removed', updateGuests);
            socket.off('user-left-party', updateGuests);
            socket.off('user-joined-party', updateGuests);
        };
    }, [socket]);

    const renderPerson = ({ item }) => {
        if (item.host == true) {
            return (
                <ParticipantBox
                    title={item.title}
                    host={item.host}
                    id={item.id}
                />
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
        if (!res) {
            Alert.alert('Unable to get guests');
            return;
        }
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

    const isCurrentUserHostRender = () => {
        if (currentUserIsHost == true) {
            return (
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
            );
        }
        return <View style={{ height: '10%' }}></View>;
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
            {isCurrentUserHostRender()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.secondary,
        flex: 1,
        justifyContent: 'space-between',
    },
    innerContainer: {
        alignSelf: 'center',
        height: '63%',
    },
    partyTitle: {
        fontSize: 24,
        color: 'white',
        alignSelf: 'center',
        padding: 10,
    },
    lowerContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.tertiary,
        height: '10%',
        width: '80%',
        marginBottom: 5,
        borderRadius: 4,
    },
    removeGuests: {
        fontSize: 24,
        color: 'white',
    },
    temporary: {
        fontSize: 12,
        color: 'red',
    },
});
