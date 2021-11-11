import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import StandardInput from "../Components/StandardInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import Colors from "../Constants/Colors";

export default ActivityScheduler = (props) => {
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };
  const [interval, setInterval] = useState(1);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date(new Date().getTime() + 3600000));
  const [show, setShow] = useState(false);

  const handleIntervalChange = (intervalChange) => {
    let newInterval = interval + intervalChange;
    if (newInterval < 1) {
      setInterval(1);
    } else {
      setInterval(newInterval);
    }
  };
  const setSchedule = () => {
    props.handleActivityScheduler(date.getTime(), interval);
  };

  return (
    <View
      style={{
        height: 300,
        backgroundColor: Colors.secondary,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.timeWrapper}>
        <View style={styles.timeBox}>
          <Text style={styles.timeBoxHeader}>Start Time</Text>

          <View style={styles.timeBoxContent}>
            <StandardButton
              title={date.getHours()}
              shadow={false}
              style={styles.timeButton}
              textStyle={{ color: "black" }}
              action={() => {
                setShow(true);
              }}
            />

            <Text style={styles.dotsBetweenTime}>:</Text>

            <StandardButton
              title={date.getMinutes()}
              shadow={false}
              style={styles.timeButton}
              textStyle={{ color: "black" }}
              action={() => {
                setShow(true);
              }}
            />
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={"time"}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
      </View>
      <View style={{ flexDirection: "column", alignItems: "center" }}>
        <Text
          style={{
            fontSize: 22,
            backgroundColor: Colors.primary,
            height: 40,
            fontWeight: "bold",
          }}
        >
          Activity Interval
        </Text>
        <View
          style={{ flexDirection: "row", width: "auto", alignItems: "center" }}
        >
          <SmallButton
            title={"+5 min"}
            style={styles.button}
            action={() => {
              handleIntervalChange(5);
            }}
          />
          <Text
            style={{
              fontSize: 20,
              backgroundColor: Colors.primary,
              height: 40,
            }}
          >
            {interval + " min"}
          </Text>
          <SmallButton
            title={"-5 min"}
            style={styles.button}
            action={() => {
              handleIntervalChange(-5);
            }}
          />
        </View>
      </View>
      <SmallButton
        title={"Set Schedule"}
        style={{ ...styles.button, width: 150 }}
        action={() => {
          setSchedule();
          props.onSubmit();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
  },
  // CLOCK
  timeWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    width: "90%",
    marginBottom: 20,
  },
  timeBox: {
    width: "45%",
    backgroundColor: Colors.primaryDark,
    borderRadius: 5,
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
  timeButton: {
    width: "40%",
    backgroundColor: "white",
    borderRadius: 5,
    height: 60,
  },
  button: { width: 55 },
});
