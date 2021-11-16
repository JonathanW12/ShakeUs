import React from 'react';
import Colors from './../../Constants/Colors';
import { StyleSheet, View, Text } from 'react-native';

export default InfoWindowBottom = (props) => {
    return (
        <View style={styles.InfoWindowContainer}>
            <View style={styles.Title}>
                <Text style={styles.TitleText}>{props.title}</Text>
            </View>
            <View style={styles.Content}>
                <Text style={styles.ContentText}>{props.content}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    InfoWindowContainer: {
        backgroundColor: Colors.primary,
        width: '100%',
        height: 140,
    },
    Title: {
        backgroundColor: Colors.primaryDark,
        width: '100%',
        height: 40,
    },
    Content: {
        backgroundColor: Colors.primary,
        width: '100%',
        height: 100,
    },
    TitleText: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center',
        textShadowColor: '#000000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    ContentText: {
        fontSize: 50,
        color: 'white',
        textAlign: 'center',
        textShadowColor: '#000000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
        marginVertical: 10,
        letterSpacing: 5,
    },
});