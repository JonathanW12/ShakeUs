import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

export default function pagination({index}) {
    console.log('from pagination page'+index)

    return (
        <View style={styles.activityCarouselDots}>
            <Image source={require('../assets/orangeDot.png')}/>
            <Image source={require('../assets/orangeDot.png')}/>
            <Image source={require('../assets/orangeDot.png')}/>
            <Image source={require('../assets/orangeDot.png')}/>
            <Image source={require('../assets/orangeDot.png')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    activityCarouselDots:{
        flexDirection: "row",
        justifyContent: "space-around",
        width: '50%',
    },
})
