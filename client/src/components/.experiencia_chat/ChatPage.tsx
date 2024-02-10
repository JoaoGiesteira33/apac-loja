import { useState, useEffect, useRef } from 'react';

import { useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { Grid } from '@mui/material';
import { Divider } from '@mui/material';
import { TextField } from '@mui/material';
import { Typography } from '@mui/material';
import { List } from '@mui/material';
import { ListItem } from '@mui/material';
import { ListItemIcon } from '@mui/material';
import { ListItemText } from '@mui/material';
import { ListItemButton } from '@mui/material';
import { Avatar } from '@mui/material';
import { IconButton } from '@mui/material';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import { Badge } from '@mui/material';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import DraftsIcon from '@mui/icons-material/Drafts';
import CircleIcon from '@mui/icons-material/Circle';

// Chat Form Imports
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

// Chat Imports
import { socket } from '../../socket';
import MessagePanel from './MessagePanel';
import { ConnectionManager } from './ConnectionManager';

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

export default function ChatPage() {
    const theme = useTheme();

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }));

    const SmallAvatar = styled(Avatar)(({ theme }) => ({
        width: 22,
        height: 22,
        border: `2px solid ${theme.palette.background.paper}`,
    }));

    // Start Chat
    const defaultUser = {
        username: '',
        connected: false,
        self: false,
        messages: [],
        hasNewMessages: false,
    };
    const [selectedUser, setSelectedUser] = useState<User>(defaultUser);
    const [selected, setSelected] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
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
            selectedUser.messages.push({
                content,
                fromSelf: true,
                date: new Date().toLocaleString(),
            });
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
        if (sessionID) {
            console.log('--- INIT ---');
            console.log('sessionID: ' + sessionID);
            console.log('username: ' + username);
            console.log('--- ---- ---');
            // apenas é necessario enviar o sessionID pois o username esta ligado
            socket.auth = { sessionID };
            socket.connect();
        }

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

        return () => {
            // Cleanup socket event listeners when the component unmounts
            socket.off('connect');
            socket.off('disconnect');
            socket.off('users');
            socket.off('user connected');
            socket.off('user disconnected');
            socket.off('private message');
            socket.off('email sent');
        };
    }, [selectedUser, users]);
    // End Chat

    // Start ChatForm
    const [input, setInput] = useState('');
    const [emojisOpen, setEmojisOpen] = useState(false);

    const isValid = input.length > 0; // Check if input is not empty
    const handleEmojisOpen = () => setEmojisOpen(!emojisOpen);
    const handleEmojiSelect = (emoji) => {
        setInput(input + emoji.native);
    };
    const onSubmit = () => {
        onMessage(input);
        setInput('');
        // Close emoji picker on message
        if (emojisOpen) handleEmojisOpen();
        // Scroll to bottom of chat
        scrollToBottom();
    };

    // Scroll to bottom of chat
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(() => {
        scrollToBottom();
    }, [selectedUser]);
    // End ChatForm

    // Start Connection manager
    // End Connection manager

    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h4">Chat</Typography>
                </Grid>
            </Grid>

            <Grid container component={Paper} sx={{ height: '700px' }}>
                <Grid item xs={3} sx={{ minWidth: '150px' }}>
                    <List>
                        <ListItem key="RemySharp">
                            {socket.connected ? (
                                <ListItemIcon>
                                    {' '}
                                    <Avatar
                                        alt="Remy Sharp"
                                        src="https://material-ui.com/static/images/avatar/1.jpg"
                                    />{' '}
                                </ListItemIcon>
                            ) : (
                                <></>
                            )}

                            {socket.connected ? (
                                <ListItemText
                                    primary={username}
                                    secondary="online"></ListItemText>
                            ) : (
                                <ListItemText primary="offline"></ListItemText>
                            )}
                        </ListItem>

                        <ListItem>
                            <ConnectionManager
                                username={username}
                                setUsername={setUsername}
                                setSessionID={setSessionID}
                                unselectUser={unselectUser}
                            />
                        </ListItem>
                    </List>

                    <Divider />
                    <Grid item xs={12} style={{ padding: '10px' }}>
                        <TextField
                            id="outlined-basic-email"
                            label="Search"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Divider />

                    <List>
                        <Box component="div" sx={{ textOverflow: 'ellipsis' }}>
                            {socket.connected ? (
                                users.map((user) =>
                                    user.username != username ? (
                                        <ListItemButton
                                            key={user.username}
                                            selected={
                                                selectedUser.username ===
                                                user.username
                                            }
                                            onClick={() => onSelectUser(user)}>
                                            {user.hasNewMessages ? (
                                                <MarkunreadIcon
                                                    sx={{
                                                        color: 'green',
                                                        fontSize: 14,
                                                    }}
                                                />
                                            ) : (
                                                <DraftsIcon
                                                    sx={{
                                                        color: 'red',
                                                        fontSize: 12,
                                                    }}
                                                />
                                            )}
                                            <ListItemIcon>
                                                <StyledBadge
                                                    overlap="circular"
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'right',
                                                    }}
                                                    variant="dot">
                                                    <Avatar
                                                        alt="Remy Sharp"
                                                        src="https://material-ui.com/static/images/avatar/1.jpg"
                                                    />
                                                </StyledBadge>
                                            </ListItemIcon>

                                            <ListItemText
                                                primary={user.username}>
                                                {user.username}
                                            </ListItemText>
                                        </ListItemButton>
                                    ) : (
                                        <></>
                                    )
                                )
                            ) : (
                                <></>
                            )}
                        </Box>
                    </List>
                </Grid>

                <Grid item xs={9}>
                    <Box
                        component="div"
                        sx={{ overflow: 'auto', height: '600px' }}>
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

                    <Divider />
                    <Grid container style={{ padding: '20px' }}>
                        <Grid xs={2} align="right">
                            <IconButton>
                                <AttachFileIcon />
                            </IconButton>

                            <IconButton onClick={handleEmojisOpen}>
                                <EmojiEmotionsIcon />
                            </IconButton>
                        </Grid>

                        <Grid item xs={8}>
                            <TextField
                                id="message"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Aa"
                                multiline
                                fullWidth
                                maxRows={2}
                                sx={{
                                    flexGrow: 1,
                                    backgroundColor: theme.palette.primary.main,
                                    overflow: 'auto',
                                }}
                            />
                        </Grid>

                        <Grid xs={2} align="left">
                            <IconButton onClick={onSubmit} disabled={!isValid}>
                                <SendIcon />
                            </IconButton>
                        </Grid>

                        {emojisOpen && (
                            <Box
                                component="div"
                                sx={{
                                    position: 'fixed',
                                    bottom: '50%',
                                    right: '25%',
                                }}>
                                <Picker
                                    data={data}
                                    onEmojiSelect={handleEmojiSelect}
                                    theme={theme.palette.mode}
                                />
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
