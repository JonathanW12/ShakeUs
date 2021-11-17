import React from 'react'
import { View, Text } from 'react-native'

export default function CurrentActivityStartTime({activity, props}) {
    if(activity){
        return (
            <View>
                <Text style={props.style} >Started at {activity.startTime} </Text>
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
