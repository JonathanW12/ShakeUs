import React, { useState, useImperativeHandle } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../../Constants/Colors';
import StandardButton from './StandardButton';

export default TimeSelector = React.forwardRef((props, ref) => {
    const [date, setDate] = useState(
        props.hours && props.minutes
            ? convertToTimeStamp(props.hours, props.minutes)
            : new Date(new Date().getTime() + 3600000)
    );
    const [show, setShow] = useState(false);

    useImperativeHandle(ref, () => ({
        getSelectedTime: onGetSelectedTime,
    }));

    const onGetSelectedTime = () => {
        return date.getTime();
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        const selectedHours = new Date(currentDate).getHours();
        const selectedMinutes = new Date(currentDate).getMinutes();
        setShow(Platform.OS === 'ios');
        setDate(convertToTimeStamp(selectedHours, selectedMinutes));

        props.timeChanged();
    };

    return (
        <View style={styles.timeWrapper}>
            <View style={styles.timeBox}>
                <Text style={[styles.timeBoxHeader, props.timeBoxHeaderStyles]}>
                    Start Time
                </Text>

                <View style={[styles.timeBoxContent, props.timeBoxStyles]}>
                    <StandardButton
                        title={props.hours ? props.hours : date.getHours()}
                        shadow={false}
                        style={styles.timeButton}
                        textStyle={{ color: 'black', ...styles.timeButtonText }}
                        action={() => {
                            setShow(true);
                        }}
                    />

                    <Text style={styles.dotsBetweenTime}>:</Text>

                    <StandardButton
                        title={
                            props.minutes ? props.minutes : date.getMinutes()
                        }
                        shadow={false}
                        style={styles.timeButton}
                        textStyle={{ color: 'black', ...styles.timeButtonText }}
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
    );
});

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
        width: '40%',
        backgroundColor: 'white',
        borderRadius: 4,
        height: 60,
        elevation: 0,
    },
    timeWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '90%',
    },
    timeBox: {
        width: '45%',
        backgroundColor: Colors.primaryDark,
        borderRadius: 4,
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
