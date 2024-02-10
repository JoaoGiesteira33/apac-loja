import { useContext, useEffect, useRef, useState } from 'react';
import { socket } from '../../socket';
import MessagePanel from './MessagePanel';

import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import { Box, useTheme } from '@mui/material';
import SpeedDial from '@mui/material/SpeedDial';

import { CurrentChatContext } from '../../contexts/chatContext';
import { ChatForm } from './ChatForm';

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

//function Chat({ userID }: { userID: string}) {
function Chat() {
    const theme = useTheme();
    const defaultUser = {
        username: '',
        connected: false,
        self: false,
        messages: [],
        hasNewMessages: false,
    };
    const { selectedUser, setSelectedUser, users, setUsers } =
        useContext(CurrentChatContext);
    const [selected, setSelected] = useState(false);
    const [username, setUsername] = useState(() => {
        const savedUsername = localStorage.getItem('username');
        return savedUsername ? savedUsername : '';
    });
    const [sessionID, setSessionID] = useState(() => {
        const savedSessionID = localStorage.getItem('sessionID');
        return savedSessionID ? savedSessionID : '';
    });

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const initReactiveProperties = (user: User) => {
        user.hasNewMessages = false;
    };

    const onMessage = (content: string) => {
        if (selected) {
            socket.emit('private message', {
                content,
                to: selectedUser.username,
            });

            const messages = selectedUser.messages;
            messages.push({
                content,
                fromSelf: true,
                date: new Date().toLocaleString(),
            });

            setSelectedUser({ ...selectedUser, messages });
            setUsers([...users]);

            if (!selectedUser.connected) {
                socket.emit('send email', {
                    email: 'fgoncalo061@gmail.com',
                    subject: selectedUser.username,
                    text: content,
                });
            }
        }
    };

    const onSelectUser = (user: User) => {
        setSelectedUser(user);
        setSelected(true);
        user.hasNewMessages = false;
    };

    const unselectUser = () => {
        setSelectedUser(defaultUser);
        setSelected(false);
    };

    useEffect(() => {
        //if (sessionID) {
        //  console.log("--- INIT ---")
        //  console.log("sessionID: " + sessionID);
        //  console.log("username: " + username);
        //  console.log("--- ---- ---")
        //  // apenas é necessario enviar o sessionID pois o username esta ligado
        //  socket.auth = { sessionID };
        //  socket.connect();
        //}

        socket.on('connect', () => {
            setUsers((prevUsers) =>
                prevUsers.map((user) => {
                    if (user.self) {
                        user.connected = true;
                    }
                    return user;
                })
            );
        });

        socket.on('disconnect', () => {
            setUsers((prevUsers) =>
                prevUsers.map((user) => {
                    if (user.self) {
                        user.connected = false;
                    }
                    return user;
                })
            );
        });

        socket.on('session', ({ sessionID }) => {
            // attach the session ID to the next reconnection attempts
            socket.auth = { sessionID };
            // store it in the localStorage
            localStorage.setItem('sessionID', sessionID);
            // save the ID of the session
            setSessionID(sessionID);
        });

        socket.on('users', (newUsers: User[]) => {
            console.log('Receiving users');
            const updatedUsers = newUsers.map((user) => {
                user.messages.forEach((message) => {
                    message.fromSelf = message.from === username;
                });
                const existingUserIndex = users.findIndex(
                    (existingUser) => existingUser.username === user.username
                );
                if (existingUserIndex !== -1) {
                    users[existingUserIndex] = {
                        ...users[existingUserIndex],
                        ...user,
                    };
                    return users[existingUserIndex];
                } else {
                    user.self = user.username === username;
                    initReactiveProperties(user);
                    return user;
                }
            });

            const sortedUsers = updatedUsers.slice().sort((a, b) => {
                if (a.self) return -1;
                if (b.self) return 1;
                if (a.username < b.username) return -1;
                return a.username > b.username ? 1 : 0;
            });

            console.log('sortedUsers: ', sortedUsers);
            setUsers(sortedUsers);
        });

        socket.on('user connected', (user: User) => {
            const existingUserIndex = users.findIndex(
                (existingUser) => existingUser.username === user.username
            );
            if (existingUserIndex !== -1) {
                users[existingUserIndex].connected = true;
                setUsers([...users]);
            } else {
                initReactiveProperties(user);
                setUsers([...users, user]);
            }
        });

        socket.on('user disconnected', (id: string) => {
            const existingUserIndex = users.findIndex(
                (user) => user.username === id
            );
            if (existingUserIndex !== -1) {
                users[existingUserIndex].connected = false;
                setUsers([...users]);
            }
        });

        socket.on('private message', ({ content, from, to, date }: Message) => {
            users.forEach((user) => {
                const fromSelf = username === from;
                if (user.username === (fromSelf ? to : from)) {
                    user.messages.push({
                        content,
                        fromSelf,
                        date,
                    });
                    if (user !== selectedUser) {
                        user.hasNewMessages = true;
                    }
                }
            });
            setUsers([...users]);
        });

        socket.on('email sent', () => {
            console.log('Email sent');
        });

        socket.on('connect_error', (err) => {
            // the reason of the error, for example "xhr poll error"
            console.log(err.message);

            // some additional description, for example the status code of the initial HTTP response
            console.log(err.description);

            // some additional context, for example the XMLHttpRequest object
            console.log(err.context);
        });

        return () => {
            // Cleanup socket event listeners when the component unmounts
            socket.off('connect');
            socket.off('disconnect');
            socket.off('users');
            socket.off('user connected');
            socket.off('user disconnected');
            socket.off('private message');
            socket.off('email sent');
            socket.off('connect_error');
        };
    }, [selectedUser, users]);

    // Scroll to bottom of chat
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    });

    return (
        <div>
            <SpeedDial
                ariaLabel="Icon fixo para chat"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
                icon={open ? <CloseIcon /> : <ChatIcon />}
                onClick={handleOpen}
                open={open}></SpeedDial>

            {open && (
                <>
                    <Box
                        component="div"
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            width: { xs: '90%', sm: '60%', md: '40%' },
                            height: { xs: '20%', sm: '15%', md: '15%' },
                            position: 'fixed',
                            bottom: { xs: '75%', sm: '74%', md: '72%' },
                            right: '5%',
                        }}>
                        {/*<ConnectionManager username={username} setUsername={setUsername} setSessionID={setSessionID} unselectUser={unselectUser} />*/}

                        {/*socket.connected ? users.map((user) => (
          user.username == username ? <></> :
            <Button 
              key={user.username}
              sx={{color: user.connected ? "green" : "red", border: selectedUser.username == user.username ? "2px solid black" : "none"}}
              onClick={() => onSelectUser(user)}>
                  { user.username + (user.hasNewMessages ? ' (+)' : '') }
            </Button>
        )) : <></>*/}
                    </Box>

                    <Box
                        component="div"
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            width: { xs: '90%', sm: '60%', md: '40%' },
                            height: { xs: '60%', sm: '60%', md: '60%' },
                            overflow: 'auto',
                            position: 'fixed',
                            bottom: { xs: '15%', sm: '15%', md: '15%' },
                            right: '5%',
                        }}>
                        {selected ? (
                            <MessagePanel
                                user={selectedUser}
                                onMessage={onMessage}
                            />
                        ) : (
                            <></>
                        )}

                        <div ref={messagesEndRef} />
                    </Box>

                    <ChatForm user={selectedUser} onMessage={onMessage} />
                </>
            )}
        </div>
    );
}

export default Chat;
