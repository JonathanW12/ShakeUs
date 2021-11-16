import { View, StyleSheet, TextInput } from 'react-native';
import React, { useRef } from 'react';
import ShadowCSS from '../Constants/ShadowCSS';

export default StandardInput = (props) => {
    const textInputRef = useRef(null);
    const [text, onChangeText] = React.useState(true ? props.value : null);

    return (
        <View
            style={{
                ...styles.container,
                ...ShadowCSS.standardShadow,
                ...props.style,
            }}
        >
            <TextInput
                style={styles.inputField}
                onChangeText={props.onChangeText}
                value={props.value}
                placeholder={props.placeholder}
                maxLength={props.maxLength}
                ref={textInputRef}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputField: {
        fontSize: 22,
        textAlign: 'center',
    },
    container: {
        height: 65,
        width: '90%',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 4,
    },
});
