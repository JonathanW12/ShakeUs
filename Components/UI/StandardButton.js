import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import shadow from '../../Constants/ShadowCSS';

export default StandardButton = (props) => {
    return (
        <TouchableOpacity
            onPress={props.action}
            style={{
                ...styles.container,
                ...props.style,
            }}
        >
            <Text style={{ ...styles.buttonText, ...props.textStyle }}>
                {props.title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 65,
        width: '90%',
        justifyContent: 'center',
        alignSelf: 'center',
        shadowColor: '#666',
        shadowOffset: { height: 2, width: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        marginTop: 10,
        borderRadius: 200,
        borderWidth: 0,
        elevation: 2,
    },
    buttonText: {
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
    },
});
