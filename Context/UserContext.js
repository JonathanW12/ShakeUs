import React, { useContext, useEffect } from 'react';
import { PartyContext } from './PartyContext';

const userInfo = {
    isHost: false,
    userId: '',
    notificationToken: '',
    isPrimaryHost: false,
};

export const UserContext = React.createContext();

export const UserProvider = (props) => {
    const partyContext = React.useContext(PartyContext);

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
        getIsPrimaryHost: () => {
            return userInfo.isPrimaryHost;
        },
        setIsPrimaryHost: (isPrimaryHost) => {
            userInfo.isPrimaryHost = isPrimaryHost;
        },
        getIsHost: () => {
            return userInfo.isHost;
        },
        setIsHost: (isHost) => {
            userInfo.isHost = isHost;
        },
    };

    return (
        <UserContext.Provider value={userContextActions}>
            {props.children}
        </UserContext.Provider>
    );
};
