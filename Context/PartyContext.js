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
        _id: '',
        name: '',
    },
    hosts: [],
    guests: [],
    allActivities: [],
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
        setAllActivities: (allActivities) => {
            partyInfo.allActivities = allActivities;
        },
        getAllActivities: () => {
            return partyInfo.allActivities;
        },
        addGuest: (guest) => {
            partyInfo.guests.push(guest);
        },
        removeGuest: (guest) => {
            partyInfo.guests.splice(partyInfo.guests.indexOf(guest), 1);
        },
        addHost: (host) => {
            partyInfo.hosts.push(host);
        },
        removeHost: (host) => {
            partyInfo.hosts.splice(partyInfo.hosts.indexOf(host), 1);
        },
    };

    return (
        <PartyContext.Provider value={partyContextActions}>
            {props.children}
        </PartyContext.Provider>
    );
};
