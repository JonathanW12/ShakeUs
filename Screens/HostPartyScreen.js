import React, { useContext, useEffect, useRef, useState } from "react";
import Banner from "../Components/PageSections/Banner";
import { View, Text, StyleSheet, Alert } from "react-native";
import StandardButton from "../Components/UI/StandardButton";
import Colors from "../Constants/Colors";
import CustomCarousel from "../Components/PageSections/CustomCarusel";
import ActivityPackService from "../Services/ActivityPackService";
import PartyService from "../Services/PartyService";
import TimeSelector from "../Components/UI/TimeSelector";
import { PartyContext } from "./../Context/PartyContext";
import { UserContext } from "../Context/UserContext";
import { SocketContext } from "../Context/SocketContext";

export default HostPartyScreen = ({ navigation }) => {
    const [index, setIndex] = useState(0);
    const partyContext = useContext(PartyContext);
    const userContext = useContext(UserContext);
    const socketContext = useContext(SocketContext);
    const [date, setDate] = useState(new Date(new Date().getTime() + 3600000));

    async function createTheParty() {
        const res = await PartyService.createParty(
            partyContext.getActivityPack()._id,
            partyContext.getPrimaryHost().name,
            userContext.getNotificationToken(),
            date.getTime()
        );

        if (res) {
            partyContext.setPartyId(res.partyId);
            partyContext.setPrimaryHost({
              _id: res.hostId,
              name: partyContext.getPrimaryHost().name,
            });

            userContext.setUserId(res.hostId);
            userContext.setIsPrimaryHost(true);
            userContext.setIsHost(true);
            const party = await PartyService.getParty(
                partyContext.getPartyId(),
                res.hostId
            );

            if (party) {
                const activityPack = await ActivityPackService.getActivityPack(
                    party.activityPackId
                );

                if (activityPack) {
                    partyContext.setActivityPack(activityPack);
                }

                partyContext.setHosts(party.hosts);
            }

            socketContext.emit("join-room", partyContext.getPartyId());
            navigation.navigate("GuestScreen");
        }
    }

    const handleActionStartParty = () => {
        if (
            partyContext.getPrimaryHost().name &&
            partyContext.getActivityPack()
        ) {
            createTwoButtonAlert();
        } else {
            throw new Error("Missing hostname and / or activity pack");
        }
    };

    const createTwoButtonAlert = () => {
        Alert.alert(
            "Confirmation",
            `Create party: ${partyContext.getActivityPack().title}`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                { text: "OK", onPress: () => createTheParty() },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Banner title="Host Party" isBack={true} />
            <View style={styles.contentWrapper}>
                <Text style={styles.header1}>Select Activity Pack</Text>
                <View style={[styles.activityWrapper]}>
                    <CustomCarousel
                        navigation={navigation}
                        setIndex={setIndex}
                    ></CustomCarousel>
                </View>
                <TimeSelector setDate={setDate} date={date}></TimeSelector>
                <View style={{ alignItems: "center", width: "100%" }}>
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
    header1: {
        fontSize: 24,
        color: "#fff",
        marginTop: 20,
        marginBottom: 20,
    },
    contentWrapper: {
        //flex: 1,
        alignItems: "center",
    },
    activityWrapper: {
        width: "100%",
        minHeight: 300,
    },
    border: {
        borderColor: "#fff",
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
    },
    whiteBorderBottom: {
        borderBottomWidth: 1,
        borderColor: "#fff",
    },
    whiteTextColor: {
        color: "#fff",
        textAlign: "center",
    },
    activityHeader: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 24,
        width: "100%",
        textAlign: "center",
    },
    activityCount: {
        fontSize: 20,
        color: "#fff",
        textAlign: "center",
        marginBottom: 10,
    },
    activityPackDescription: {
        color: "#fff",
        marginTop: 12,
        paddingBottom: 12,
        fontSize: 18,
        textAlign: "center",
    },
    centerText: {
        alignItems: "center",
    },
    button: {
        width: 200,
        backgroundColor: Colors.tertiary,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
    },
});
