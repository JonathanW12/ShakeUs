import React, { useContext, useEffect } from 'react';
import { PartyContext } from './PartyContext';

const userInfo = {
    isHost: false,
    userId: '',
    notificationToken: '',
};

export const UserContext = React.createContext();

const setIsHost = (isHost) => {
    userInfo.isHost = isHost;
};

export const UserProvider = (props) => {
    const partyContext = React.useContext(PartyContext);

    useEffect(() => {
        partyContext.getHosts().includes(userInfo.userId)
            ? setIsHost(true)
            : setIsHost(false);
    }, [userInfo.userId, partyContext.getHosts()]);

    const userContextActions = {
        isHost: () => {
            return userInfo.isHost;
        },
        getUserId: () => {
            return userInfo.userId;
        },
        setUserId: (userId) => {
            userInfo.userId = userId;
        },
        getNotificationToken: () => {
            return userInfo.notificationToken;
        },
        setNotificationToken: (notificationToken) => {
            userInfo.notificationToken = notificationToken;
        },
    };

    return (
        <UserContext.Provider value={userContextActions}>
            {props.children}
        </UserContext.Provider>
    );
};
