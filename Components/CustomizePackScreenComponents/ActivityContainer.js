import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import HiddenActivitySection from './HiddenActivitySection';
import Colors from '../../Constants/Colors';
import { useRef } from 'react';

export default ActivityContainer = (props) => {
    const activityRef = useRef(null);

    const toggleActivity = () => {
        if (props.selectedActivityId == props.activity._id) {
            props.selectActivity(null);
            activityRef.current.closeInactive();
        } else {
            props.selectActivity(props.activity);
            activityRef.current.openActive();
        }
    };

    return (
        <TouchableHighlight
            onPress={() => {
                toggleActivity();
            }}
        >
            <View
                style={[
                    styles.activityContainer,
                    {
                        backgroundColor:
                            props.selectedActivityId == props.activity._id
                                ? Colors.primaryDark
                                : Colors.primary,
                    },
                ]}
            >
                <Text style={styles.activityTitle}>
                    {(function () {
                        const time = new Date(props.item.startTime);
                        return `${time
                            .getHours()
                            .toString()
                            .padStart(2, '0')}:${time
                            .getMinutes()
                            .toString()
                            .padStart(2, '0')} | `;
                    })()}
                    {props.item.title}
                </Text>
                <HiddenActivitySection
                    ref={activityRef}
                    item={props.item}
                ></HiddenActivitySection>
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    activityContainer: {
        flex: 1,
        marginTop: 4,
        width: '100%',
        alignContent: 'center',
        paddingTop: 15,
    },
    activityTitle: {
        color: '#fff',
        fontSize: 22,
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 10,
    },
});
