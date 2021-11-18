import React, {
    forwardRef,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { Animated, StyleSheet, Text, Dimensions } from 'react-native';
import Colors from './../../Constants/Colors';

export default HiddenActivitySection = forwardRef((props, ref) => {
    const startingHeight = 0;
    const [fullHeight, setFullHeight] = useState(startingHeight);
    const heightAnim = useRef(new Animated.Value(startingHeight)).current;

    useImperativeHandle(ref, () => ({
        openActive: open,
        closeInactive: close,
    }));

    const onTextLayout = (event) => {
        let { x, y, width, height } = event.nativeEvent.layout;
        height = Math.floor(height);
        if (height > startingHeight) {
            setFullHeight(height);
        }
    };

    const open = () => {
        Animated.timing(heightAnim, {
            toValue: fullHeight,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const close = () => {
        Animated.timing(heightAnim, {
            toValue: startingHeight,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    return (
        <Animated.View
            style={[
                styles.hiddenActivitySection,
                {
                    height: heightAnim,
                },
            ]}
        >
            <Text
                onLayout={(event) => onTextLayout(event)}
                style={styles.activityDescription}
            >
                {props.item.description}
            </Text>
        </Animated.View>
    );
});

const styles = StyleSheet.create({
    hiddenActivitySection: {
        backgroundColor: Colors.primary,
        overflow: 'hidden',
        flex: 1,
        alignItems: 'center',
    },
    activityDescription: {
        color: '#ffffff',
        fontSize: 18,
        borderTopColor: '#fff',
        borderTopWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,
        width: Dimensions.get('window').width - 20,
    },
});
