import React, { useContext, useEffect, useState } from 'react';
import Banner from '../Components/PageSections/Banner';
import { View, StyleSheet, FlatList } from 'react-native';
import ActivityPackService from '../Services/ActivityPackService';
import ActivityService from '../Services/ActivityService';
import Colors from '../Constants/Colors';
import ActivityContainer from '../Components/CustomizePackScreenComponents/ActivityContainer';
import CustomizeToolBar from './../Components/CustomizePackScreenComponents/CustomizeToolBar';
import { PartyContext } from './../Context/PartyContext';
import { SocketContext } from '../Context/SocketContext';

export default CustomizePackScreen = ({ navigation }) => {
    const [activities, setActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const partyContext = useContext(PartyContext);
    const socketContext = useContext(SocketContext);

    useEffect(() => {
        socketContext.on('activity-title-updated', (data) => {
            console.log(data);
        });
    }, [socketContext]);

    useEffect(() => {
        loadAllActivities(partyContext.getActivityPack()._id);
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

    const createActivity = async () => {
        navigation.navigate('ActivityFormScreen', {
            newActivity: true,
            activityId: '',
            activityTitle: '',
            activityDescription: '',
            activityStartTime: '',
        });
    };

    const updateSelectedActivity = async (activity) => {
        if (selectedActivity) {
            navigation.navigate('ActivityFormScreen', {
                newActivity: false,
                activityId: selectedActivity._id,
                activityTitle: selectedActivity.title,
                activityDescription: selectedActivity.description,
                activityStartTime: selectedActivity.startTime,
            });
        }
    };

    const deleteSelectedActivity = async () => {
        if (selectedActivity) {
            const deleteRes = await ActivityService.deleteActivity(
                selectedActivity._id
            );
            const removeRes = await ActivityPackService.removeActivityFromPack(
                partyContext.getActivityPack()._id,
                //ActivityPackService.currentPack._id,
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
        paddingBottom: 80,
    },
});
