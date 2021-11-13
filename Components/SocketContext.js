import React, {useState} from 'react';

// SocketContext = {Provider, Consumer}
export const SocketContext = React.createContext(null); 

export const SocketProvider = (props) => {
    const [socket, setsocket] = useState(props)
    
    //console.log(socket);
    return (
        <SocketContext.Provider value={socket}>
            {props.children}
        </SocketContext.Provider>
    );
} 
        
