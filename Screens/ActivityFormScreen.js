import React, { useContext, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Banner from '../Components/PageSections/Banner';
import Colors from './../Constants/Colors';
import StandardInput from '../Components/UI/StandardInput';
import { TextInput } from 'react-native';
import TimeSelector from './../Components/UI/TimeSelector';
import ActivityService from '../Services/ActivityService';
import ActivityPackService from '../Services/ActivityPackService';
import { PartyContext } from './../Context/PartyContext';

export default ActivityFormScreen = ({ route, navigation }) => {
    const { newActivity, activityId, activityStartTime } = route.params;
    const partyContext = useContext(PartyContext);

    const [title, setTitle] = useState(
        newActivity ? '' : route.params.activityTitle
    );
    const [description, setDescription] = useState(
        newActivity ? '' : route.params.activityDescription
    );
    const [hours, setHours] = useState(
        newActivity
            ? new Date(new Date().getTime() + 60 * 60 * 1000)
                  .getHours()
                  .toString()
                  .padStart(2, '0')
            : new Date(activityStartTime).getHours().toString().padStart(2, '0')
    );
    const [minutes, setMinutes] = useState(
        newActivity
            ? new Date(new Date().getTime() + 60 * 60 * 1000)
                  .getMinutes()
                  .toString()
                  .padStart(2, '0')
            : new Date(activityStartTime)
                  .getMinutes()
                  .toString()
                  .padStart(2, '0')
    );
    const timeSelectorRef = useRef(null);

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
                partyContext.getActivityPack()._id,
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

    const onTimeChanged = () => {
        setHours(
            new Date(timeSelectorRef.current.getSelectedTime())
                .getHours()
                .toString()
                .padStart(2, '0')
        );
        setMinutes(
            new Date(timeSelectorRef.current.getSelectedTime())
                .getMinutes()
                .toString()
                .padStart(2, '0')
        );
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
                    timeBoxStyles={{ backgroundColor: Colors.tertiary }}
                    timeBoxHeaderStyles={{
                        backgroundColor: Colors.tertiary,
                        borderBottomColor: '#fff',
                        borderBottomWidth: 2,
                    }}
                    hours={hours}
                    minutes={minutes}
                    timeChanged={onTimeChanged}
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
        borderRadius: 4,
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
        borderRadius: 4,
        fontSize: 16,
        padding: 10,
    },
    button: {
        width: '100%',
        backgroundColor: Colors.tertiary,
        borderRadius: 4,
        marginTop: 10,
        shadowColor: '#666',
        shadowOffset: { height: 2, width: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        borderRadius: 200,
        borderWidth: 0,
        elevation: 0,
    },
    buttonText: {
        color: '#fff',
        fontSize: 22,
        textAlign: 'center',
        padding: 15,
    },
});
