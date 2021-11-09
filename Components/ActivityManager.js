import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import StandardInput from "../Components/StandardInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import Colors from "../Constants/Colors";
import { useLinkProps } from "@react-navigation/native";

export default ActivityManager = (props) => {
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date(new Date().getTime() + 3600000));
  const [show, setShow] = useState(false);

  const handleTitleChange = (input) => {
    setTitle(input);
  };
  const handleDescriptionChange = (input) => {
    setDescription(input);
  };
  const handleAddActivity = () => {
    props.handleActivitySet({ title, description, startTime: date.getTime() });
  };

  return (
    <View style={{ height: 300, backgroundColor: Colors.secondary }}>
      <Text>Title</Text>
      <StandardInput
        style={styles.input}
        value={title}
        onChangeText={handleTitleChange}
        placeholder={"title"}
      />
      <Text>Description</Text>
      <StandardInput
        style={styles.input}
        value={description}
        placeholder={"description"}
        onChangeText={handleDescriptionChange}
      />
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
        <SmallButton
          title={"XX"}
          style={styles.button}
          action={handleAddActivity}
        />
      </View>
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
});
