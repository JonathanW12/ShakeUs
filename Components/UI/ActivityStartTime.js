import React from 'react'
import { View, Text } from 'react-native'
import InfoWindowBottom from '../PageSections/InfoWindowBottom';

export default function ActivityStartTime({activity, style}) {
    const unixToHours = (unix) => {
        let unix_timestamp = unix;
        let date = new Date(unix_timestamp);
        let hours = date.getHours().toString().padStart(2,"0");
        var minutes = date.getMinutes().toString().padStart(2,"0");
        //var seconds = "0" + date.getSeconds();
        return hours + ':' + minutes;
    };

    if(activity){
        return (
            <View>
                <Text>
                    <Text style={style}>
                          {unixToHours(activity.startTime)}
                    </Text>
                </Text>
            </View>
        )
    } else {
        return (
            <View>
                <Text>There is no current Activity</Text>
            </View>
        )
    }
}
