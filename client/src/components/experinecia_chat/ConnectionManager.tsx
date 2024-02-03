import { TextField, Typography, useTheme } from '@mui/material';
import { socket } from '../../socket';
import Button from '@mui/material/Button';

import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { useState } from 'react';
import { width } from '@mui/system';

export function ConnectionManager({
    username,
    setUsername,
    setSessionID,
    unselectUser,
}: {
    username: string;
    setUsername: (userID: string) => void;
    setSessionID: (sessionID: string) => void;
    unselectUser: () => void;
}) {
    function connect() {
        setUsername(username);
        localStorage.setItem('username', username);
        socket.auth = { username };
        socket.connect();
    }

    async function disconnect() {
        await localStorage.removeItem('sessionID');
        await localStorage.removeItem('username');
        setUsername('');
        setSessionID('');
        unselectUser();
        socket.disconnect();
    }

    const theme = useTheme();
    return (
        <>
            {!socket.connected ? ( // IF not connected show the connection form
                <>
                    <TextField
                        sx={{
                            width: { sm: 150, md: 200 },
                        }}
                        id="outlined-basic"
                        variant="outlined"
                        value={username}
                        placeholder="Nome"
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                            setUsername(event.target.value);
                        }}
                        disabled={socket.connected}
                    />
                    <Button
                        variant="contained"
                        onClick={connect}
                        sx={{ margin: 2 }}>
                        Connect
                    </Button>
                </>
            ) : (
                // ELSE show the disconnect button
                <Button variant="contained" onClick={disconnect}>
                    Disconnect
                </Button>
            )}
        </>
    );
}
