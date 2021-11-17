import React, { useState, useImperativeHandle } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../../Constants/Colors';
import StandardButton from './StandardButton';

export default TimeSelector = React.forwardRef((props, ref) => {
    const [date, setDate] = useState(new Date(new Date().getTime() + 3600000));
    const [show, setShow] = useState(false);

    useImperativeHandle(ref, () => ({
        getSelectedTime: onGetSelectedTime,
    }));

    const onGetSelectedTime = () => {
        const today = new Date();

        return new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            date.getHours(),
            date.getMinutes()
        ).getTime();
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
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
                        textStyle={{ color: 'black' }}
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
    );
});

const styles = StyleSheet.create({
    timeButton: {
        width: '40%',
        backgroundColor: 'white',
        borderRadius: 5,
        height: 60,
    },
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
