import React, { useEffect, useState } from 'react';
import Banner from '../Components/Banner';
import { View, StyleSheet, FlatList } from 'react-native';
import ActivityPackService from '../Components/Services/ActivityPackService';
import ActivityService from '../Components/Services/ActivityService';
import Colors from '../Constants/Colors';
import ActivityContainer from '../Components/CustomizePackScreenComponents/ActivityContainer';
import CustomizeToolBar from './../Components/CustomizePackScreenComponents/CustomizeToolBar';

export default CustomizePackScreen = ({ navigation }) => {
    const [activities, setActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);

    useEffect(() => {
        loadAllActivities(ActivityPackService.currentPack._id);
    }, []);

    const onSelectActivity = (activity) => {
        setSelectedActivity(activity);
    };

    const loadAllActivities = async (activityPackId) => {
        const res = await ActivityService.getAllActivitiesByActivityPackId(
            activityPackId
        );

        if (res) {
            setActivities(res);
        } else {
            throw new Error('Failed to load activities');
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
            setActivities([...activities, activity]);

            await ActivityPackService.addActivityToPack(
                ActivityPackService.currentPack._id,
                res.activityId
            );
        } else {
            throw new Error('Failed to create activity');
        }
    };

    const updateSelectedActivity = async (activity) => {
        if (selectedActivity) {
            const currentActivities = [...activities];

            const res = await ActivityService.patchActivity(
                activity._id,
                activity.title,
                activity.description,
                activity.startTime
            );

            if (res) {
                const newActivities = currentActivities.filter((a) => {
                    return a._id != activity._id;
                });

                newActivities.push(activity);
                newActivities.sort((a1, a2) => {
                    return a1.startTime - a2.startTime;
                });

                setActivities(newActivities);
            } else {
                throw new Error('Failed to update activity');
            }
        }
    };

    const deleteSelectedActivity = async () => {
        if (selectedActivity) {
            const deleteRes = await ActivityService.deleteActivity(
                selectedActivity._id
            );
            const removeRes = await ActivityPackService.removeActivityFromPack(
                ActivityPackService.currentPack._id,
                selectedActivity._id
            );

            if (deleteRes && removeRes) {
                const currentActivities = [...activities];
                const newActivities = currentActivities.filter((a) => {
                    return a._id != selectedActivity._id;
                });
                setActivities(newActivities);
            } else {
                throw new Error('Failed to delete activity');
            }
        }
    };

    return (
        <View style={styles.container}>
            <Banner title="Customize Pack" />
            <FlatList
                data={activities}
                keyExtractor={(item) => {
                    return item._id.toString();
                }}
                renderItem={({ item, index }) => (
                    <ActivityContainer
                        item={item}
                        activity={activities[index]}
                        selectActivity={onSelectActivity}
                        selectedActivityId={
                            selectedActivity ? selectedActivity._id : null
                        }
                    ></ActivityContainer>
                )}
            />
            <CustomizeToolBar
                onDelete={deleteSelectedActivity}
                onEdit={updateSelectedActivity}
                onAdd={createActivity}
            ></CustomizeToolBar>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: Colors.secondary,
    },
});
