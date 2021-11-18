import React, { useState } from "react";
import socketio from "socket.io-client";
import socketURL from "../Constants/URL";

// SocketContext = {Provider, Consumer}
const socket = socketio.connect(socketURL.socketURL);
export const SocketContext = React.createContext();

export const SocketProvider = (props) => {
  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};
