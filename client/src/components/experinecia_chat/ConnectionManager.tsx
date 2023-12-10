import { TextField, Typography } from '@mui/material';
import { socket } from '../../socket';
import Button from '@mui/material/Button';

import { useState } from 'react';

export function ConnectionManager({ username, setUsername, setSessionID, unselectUser }:
                                  { username: string ,
                                    setUsername: (userID: string) => void, 
                                    setSessionID: (sessionID: string) => void,
                                    unselectUser: () => void}) {
  function connect() {
    setUsername(username);
    localStorage.setItem("username", username);
    socket.auth = { username };
    socket.connect();
  }

  async function disconnect() {
    await localStorage.removeItem("sessionID");
    await localStorage.removeItem("username");
    setUsername("");
    setSessionID("");
    unselectUser();
    socket.disconnect();
  }

  return (
    <>
      <Typography variant="h4">{(socket.connected ? "Connected as " + username : "Disconnected") }</Typography>
      
      {
        !socket.connected ? // IF not connected show the connection form 
          <>
            <TextField 
                id="outlined-basic" 
                variant="outlined" 
                value={username} 
                placeholder='Nome de utilizador' 
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setUsername(event.target.value);
                }}
                disabled={socket.connected}
            />
            <Button variant="contained" onClick={ connect } sx={{margin: 2}}>Connect</Button>
          </>
        : // ELSE show the disconnect button
          <Button variant="outlined" onClick={ disconnect }>Disconnect</Button>
      }
    </>
  );
}