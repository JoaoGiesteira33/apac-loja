import { ReactNode, createContext, useState } from 'react';
import { socket } from '../socket';

interface User {
    username: string;
    connected: boolean;
    self: boolean;
    messages: Message[];
    hasNewMessages: boolean;
}

interface Message {
    content: string;
    fromSelf: boolean;
    from?: string;
    to?: string;
    date: string;
}

export const CurrentChatContext = createContext({
    connect: () => {},
    disconnect: () => {},
    selectedUser: {
        username: '',
        connected: false,
        self: false,
        messages: [],
        hasNewMessages: false,
    },
    setSelectedUser: (selectedUser) => {},
    users: [] as User[],
    setUsers: (users: User[]) => {},
    setUsername: (username: string) => {},
    setSessionID: (sessionID: string) => {},
});

export const CurrentChatProvider = ({
    setUsername,
    setSessionID,
    username,
    sessionID,
    children,
}: {
    setUsername: (username: string) => void;
    setSessionID: (sessionID: string) => void;
    username: string;
    sessionID: string;
    children: ReactNode;
}) => {
    const [selectedUser, setSelectedUser] = useState({
        username: '',
        connected: false,
        self: false,
        messages: [],
        hasNewMessages: false,
    });
    const [users, setUsers] = useState<User[]>([]);

    function connect() {
        setUsername(username);
        setSessionID(sessionID);
        socket.auth = { username, sessionID };
        console.log('Connecting to socket...', socket);
        socket.connect();
    }

    async function disconnect() {
        setUsername('');
        setSessionID('');
        setUsers([]);
        setSelectedUser({
            username: '',
            connected: false,
            self: false,
            messages: [],
            hasNewMessages: false,
        });
        console.log('Disconnecting from socket...', socket);
        socket.disconnect();
    }

    return (
        <CurrentChatContext.Provider
            value={{
                connect,
                disconnect,
                selectedUser,
                setSelectedUser,
                users,
                setUsers,
                setUsername,
                setSessionID,
            }}>
            {children}
        </CurrentChatContext.Provider>
    );
};
