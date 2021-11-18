import React, { useState, useImperativeHandle } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StyleSheet, View, Text, Platform } from "react-native";
import Colors from "../../Constants/Colors";
import StandardButton from "./StandardButton";

export default TimeSelector = (props) => {
    const [show, setShow] = useState(Platform.OS === "ios");

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || props.date;
        if (props.setDate) {
            props.setDate(new Date(currentDate));
        }
    };

    return (
        <View style={styles.timeWrapper}>
            <View style={styles.timeBox}>
                <Text style={[styles.timeBoxHeader, props.timeBoxHeaderStyles]}>
                    Start Time
                </Text>

                {Platform.OS !== "ios" && (
                    <View style={[styles.timeBoxContent, props.timeBoxStyles]}>
                        <StandardButton
                            title={props.date
                                .getHours()
                                .toString()
                                .padStart(2, "0")}
                            shadow={false}
                            style={styles.timeButton}
                            textStyle={{ color: "black" }}
                            action={() => {
                                setShow(true);
                            }}
                        />

                        <Text style={styles.dotsBetweenTime}>:</Text>

                        <StandardButton
                            title={props.date
                                .getMinutes()
                                .toString()
                                .padStart(2, "0")}
                            shadow={false}
                            style={styles.timeButton}
                            textStyle={{ color: "black" }}
                            action={() => {
                                setShow(true);
                            }}
                        />
                    </View>
                )}
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={props.date}
                        mode={"time"}
                        is24Hour={true}
                        display={Platform.OS !== "ios" ? "default" : "spinner"}
                        onChange={onChange}
                        style={{
                            height: 90,
                            backgroundColor: Colors.primary,
                            marginBottom: 20,
                        }}
                        textColor={"white"}
                    />
                )}
            </View>
        </View>
    );
};

const convertToTimeStamp = (hours, minutes) => {
    const today = new Date();

    return new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        hours,
        minutes
    );
};

const styles = StyleSheet.create({
    timeButton: {
        width: "40%",
        backgroundColor: "white",
        borderRadius: 4,
        height: 60,
        elevation: 0,
    },
    timeWrapper: {
        flexDirection: "row",
        justifyContent: "center",
        width: "90%",
        marginBottom: 15,
    },
    timeBox: {
        width: "45%",
        backgroundColor: Colors.primaryDark,
        borderRadius: 4,
    },
    timeBoxHeader: {
        color: "#fff",
        fontWeight: "700",
        textAlign: "center",
        padding: 5,
    },
    timeBoxContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: Colors.primary,
        padding: 10,
    },
    timeBoxNumberSquare: {
        color: Colors.secondary,
        fontSize: 22,
        backgroundColor: "#fff",
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 2,
        width: "40%",
    },
    dotsBetweenTime: {
        fontWeight: "700",
        color: "#fff",
        fontSize: 22,
    },
});
