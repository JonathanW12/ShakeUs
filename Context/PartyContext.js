import React from 'react';

const partyInfo = {
    _id: '',
    activityPack: {
        _id: '',
        title: '',
        description: '',
        activities: [],
    },
    primaryHost: {
        id: '',
        name: '',
    },
    hosts: [],
    guests: [],
};

export const PartyContext = React.createContext();

export default PartyProvider = (props) => {
    const partyContextActions = {
        getPartyId: () => {
            return partyInfo._id;
        },
        setPartyId: (id) => {
            partyInfo._id = id;
        },
        getActivityPack: () => {
            return partyInfo.activityPack;
        },
        setActivityPack: (activityPack) => {
            partyInfo.activityPack = activityPack;
        },
        getPrimaryHost: () => {
            return partyInfo.primaryHost;
        },
        setPrimaryHost: (primaryHost) => {
            partyInfo.primaryHost = primaryHost;
        },
        getHosts: () => {
            return partyInfo.hosts;
        },
        setHosts: (hosts) => {
            partyInfo.hosts = hosts;
        },
        getGuests: () => {
            return partyInfo.guests;
        },
        setGuests: (guests) => {
            partyInfo.guests = guests;
        },
    };

    return (
        <PartyContext.Provider value={partyContextActions}>
            {props.children}
        </PartyContext.Provider>
    );
};
