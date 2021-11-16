import React, { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Banner from '../Components/Banner';
import Colors from './../Constants/Colors';
import StandardInput from '../Components/StandardInput';
import { TextInput } from 'react-native';
import TimeSelector from './../Components/TimeSelector';
import ActivityService from '../Components/Services/ActivityService';
import ActivityPackService from '../Components/Services/ActivityPackService';

export default ActivityFormScreen = ({ route, navigation }) => {
    const [title, setTitle] = useState(
        newActivity ? '' : route.params.activityTitle
    );
    const [description, setDescription] = useState(
        newActivity ? '' : route.params.activityDescription
    );
    const timeSelectorRef = useRef(null);

    const { newActivity, activityId, activityStartTime } = route.params;

    const submit = async () => {
        const activity = {
            _id: activityId ? activityId : null,
            title: title,
            description: description,
            startTime: timeSelectorRef.current.getSelectedTime(),
        };

        if (newActivity) {
            const createRes = await createActivity(activity);

            if (createRes) {
                navigation.goBack();
            }
        } else {
            const updateRes = await updateActivity(activity);

            if (updateRes) {
                navigation.goBack();
            }
        }
    };

    const createActivity = async (activity) => {
        const res = await ActivityService.createActivity(
            activity.title,
            activity.description,
            activity.startTime
        );

        if (res) {
            activity._id = res.activityId;

            const addRes = ActivityPackService.addActivityToPack(
                ActivityPackService.currentPack._id,
                res.activityId
            );

            return addRes;
        } else {
            throw new Error('Failed to create activity');
        }
    };

    const updateActivity = async (activity) => {
        const res = await ActivityService.patchActivity(
            activity._id,
            activity.title,
            activity.description,
            activity.startTime
        );

        if (res) {
            return res;
        } else {
            throw new Error('Failed to update activity');
        }
    };

    return (
        <View style={styles.container}>
            <Banner title={newActivity ? 'New Activity' : 'Edit Activity'} />
            <View style={styles.formContainer}>
                <StandardInput
                    style={styles.titleInput}
                    placeholder="Activity Title"
                    value={title}
                    onChangeText={(text) => {
                        setTitle(text);
                    }}
                ></StandardInput>
                <TextInput
                    style={styles.descriptionInput}
                    placeholder="Activity Description"
                    multiline={true}
                    value={description}
                    onChangeText={(text) => {
                        setDescription(text);
                    }}
                ></TextInput>
                <TimeSelector
                    ref={timeSelectorRef}
                    timeBoxStyles={{ backgroundColor: Colors.secondary }}
                    timeBoxHeaderStyles={{
                        backgroundColor: Colors.secondary,
                        borderBottomColor: '#fff',
                        borderBottomWidth: 2,
                    }}
                    hours={
                        newActivity
                            ? new Date(new Date().getTime() + 60 * 60 * 1000)
                                  .getHours()
                                  .toString()
                                  .padStart(2, '0')
                            : new Date(activityStartTime)
                                  .getHours()
                                  .toString()
                                  .padStart(2, '0')
                    }
                    minutes={
                        newActivity
                            ? new Date(new Date().getTime() + 60 * 60 * 1000)
                                  .getMinutes()
                                  .toString()
                                  .padStart(2, '0')
                            : new Date(activityStartTime)
                                  .getMinutes()
                                  .toString()
                                  .padStart(2, '0')
                    }
                ></TimeSelector>
                <Pressable onPress={submit} style={styles.button}>
                    <Text style={styles.buttonText}>
                        {newActivity ? 'Create Activity' : 'Save Changes'}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: Colors.secondary,
        flex: 1,
        alignItems: 'center',
    },
    formContainer: {
        width: '95%',
        padding: 15,
        backgroundColor: Colors.primary,
        borderRadius: 3,
        marginTop: 25,
    },
    titleInput: {
        width: '99%',
        marginBottom: 10,
    },
    descriptionInput: {
        width: '99%',
        height: 225,
        marginBottom: 10,
        textAlignVertical: 'top',
        backgroundColor: '#fff',
        borderRadius: 3,
        fontSize: 16,
        padding: 10,
    },
    button: {
        width: '100%',
        backgroundColor: Colors.secondary,
        borderRadius: 4,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 22,
        textAlign: 'center',
        padding: 15,
    },
});
