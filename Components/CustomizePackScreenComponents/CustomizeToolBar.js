import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import Colors from './../../Constants/Colors';

export default CustomizeToolBar = (props) => {
    const onAdd = () => {
        console.log('add');
    };

    const onEdit = () => {
        console.log('edit');
    };

    const onDelete = () => {
        props.onDelete();
    };

    return (
        <View style={styles.toolBar}>
            <Pressable
                onPress={onAdd}
                style={[styles.pressable, styles.addIcon]}
            >
                <Image
                    style={styles.icon}
                    source={require('../../assets/addIcon.png')}
                ></Image>
            </Pressable>

            <Pressable
                onPress={onEdit}
                style={[styles.pressable, styles.editIcon]}
            >
                <Image
                    style={styles.icon}
                    source={require('../../assets/settingsIcon.png')}
                ></Image>
            </Pressable>

            <Pressable
                onPress={onDelete}
                style={[styles.pressable, styles.deleteIcon]}
            >
                <Image
                    style={styles.icon}
                    source={require('../../assets/deleteIcon.png')}
                ></Image>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    toolBar: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: Colors.primary,
        maxHeight: 80,
        position: 'absolute',
        bottom: 0,
        borderTopWidth: 5,
        borderTopColor: '#fff',
        marginTop: -5,
    },
    pressable: {
        height: 80,
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    icon: { height: 60 },
    addIcon: {
        backgroundColor: Colors.tertiary,
        borderRightColor: '#fff',
        borderRightWidth: 3,
    },
    editIcon: {
        backgroundColor: Colors.primary,
        borderRightColor: '#fff',
        borderRightWidth: 3,
    },
    deleteIcon: { backgroundColor: Colors.warn },
});
