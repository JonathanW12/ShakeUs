import React, { useState, useEffect, useContext } from 'react';
import Banner from '../Components/PageSections/Banner';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import Colors from '../Constants/Colors';
import ShadowCSS from '../Constants/ShadowCSS';
import GuestService from '../Services/GuestService';
import InfoWindowBottom from '../Components/PageSections/InfoWindowBottom';
import SmallButton from './../Components/UI/SmallButton';
import { PartyContext } from './../Context/PartyContext';
import { SocketContext } from '../Context/SocketContext';

export default PartyInformationScreen = ({ navigation }) => {
    const [activityPackage, setactivityPackage] = useState(null);
    const [participantCount, setparticipantCount] = useState(0);
    const [activityCount, setactivityCount] = useState(0);
    const partyContext = useContext(PartyContext);
    const socketContext = useContext(SocketContext);

    useEffect(() => {
        load();
        updateParticipantsList();
    }, []);

    useEffect(() => {
        socketContext.on('guest-removed', updateParticipantsList);
        socketContext.on('user-left-party', updateParticipantsList);
        socketContext.on('user-joined-party', updateParticipantsList);

        return () => {
            socketContext.off('guest-removed', updateParticipantsList);
            socketContext.off('user-left-party', updateParticipantsList);
            socketContext.off('user-joined-party', updateParticipantsList);
        };
    }, [socketContext]);

    const updateParticipantsList = async () => {
        let participantsSize = 0;
        const res = await GuestService.getAllGuests(
            partyContext.getPartyId(),
            partyContext.getPrimaryHost().id
        );
        if (res.hosts) {
            participantsSize = res.hosts.length + res.guests.length;
        }

        setparticipantCount(participantsSize);
    };

    function load() {
        if (partyContext.getActivityPack()) {
            setactivityPackage(partyContext.getActivityPack());
            setactivityCount(partyContext.getActivityPack().activities.length);
        } else {
        }
    }

    if (activityPackage != null) {
      ;
      return (
        <View style={styles.container}>
          <Banner title="Party Information" />
          <View style={styles.innerWrapper}>
            <View
              style={{
                ...ShadowCSS.standardShadow,
                ...styles.challengeContainer,
              }}
            >
              <View>
                <Text style={styles.partyTitle}>Activity Pack</Text>
              </View>

              <View>
                <SmallButton
                  style={{
                    ...styles.button,
                    backgroundColor: Colors.secondary,
                  }}
                  title="Customize"
                  action={() => {
                    navigation.navigate("CustomizePackScreen");
                  }}
                />

                <Text style={styles.partyTitle}>
                  Guests: {participantCount}{" "}
                </Text>
                <SmallButton
                  style={{
                    ...styles.button,
                    backgroundColor: Colors.secondary,
                  }}
                  title="Guest List"
                  action={() => {
                    navigation.navigate("ParticipantsScreen");
                  }}
                />
              </View>
            </View>
          </View>

          <InfoWindowBottom
            title="Party Code"
            content={partyContext.getPartyId()}
          ></InfoWindowBottom>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Banner title="Party Information" />
          <View style={styles.loadingIcon}>
            <ActivityIndicator size={52} color={Colors.primary} />
          </View>
        </View>
      );
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.secondary,
        flex: 1,
        justifyContent: 'center',
    },
    innerWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    currentActivity: {
        color: 'white',
        textAlign: 'center',
        fontSize: 22,
        margin: 15,
    },
    guestMesssage: {
        fontSize: 18,
        color: 'white',
        margin: 15,
        textAlign: 'center',
    },
    button: {
        width: 'auto',
        height: 40,
        marginBottom: 10,
        marginTop: 5,
        paddingLeft: 20,
        paddingRight: 20,
    },
    challengeContainer: {
        width: '94%',
        padding: 5,
        backgroundColor: Colors.primary,
        justifyContent: 'space-between',
        borderRadius: 4,
        alignSelf: 'center',
    },
    partyTitle: {
        fontSize: 26,
        alignSelf: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        color: 'white',
    },
    whiteLine: {
        width: '80%',
        height: 2,
        backgroundColor: 'white',
        alignSelf: 'center',
    },
    lowerContainer: {
        justifyContent: 'flex-end',
        flex: 1,
    },
    nextActivity: {
        backgroundColor: '#CC9300',
        width: '100%',
        height: Dimensions.get('screen').height * 0.05,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
    },
    timeStamp: {
        backgroundColor: Colors.primary,
        width: '100%',
        height: Dimensions.get('screen').height * 0.1,
        textAlign: 'center',
        color: 'white',
        fontSize: 30,
        textAlignVertical: 'center',
    },
    loadingIcon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    partyCode: {
        color: Colors.secondary,
        alignSelf: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        justifyContent: 'flex-start',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        paddingLeft: 7,
        paddingRight: 7,
    },
    partyCodeLabel: {
        fontSize: 20,
        color: Colors.secondary,
        paddingLeft: 20,
    },
    container_horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 25,
        marginBottom: 25,
    },
});
