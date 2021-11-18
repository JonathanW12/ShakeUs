import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import shadow from '../../Constants/ShadowCSS';

export default StandardButton = (props) => {
    const [isPressed, setIsPressed] = React.useState(false);

    const onPressIn = () => {
        setIsPressed(true);
    };

    const onPressOut = () => {
        setIsPressed(false);
    };

    return (
        <Pressable
            onPress={props.action}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={{
                ...(isPressed ? styles.buttonPressed : styles.button),
                ...props.style,
            }}
        >
            <Text style={{ ...styles.buttonText, ...props.textStyle }}>
                {props.title}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
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
    buttonPressed: {
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
        elevation: 5,
    },
    buttonText: {
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
    },
});
