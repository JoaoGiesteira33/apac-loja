import { TextField, Typography } from '@mui/material';
import { socket } from '../../socket';
import Button from '@mui/material/Button';

import { useState } from 'react';

export function ConnectionManager({ setUserID }: { setUserID: (userID: string) => void}) {
  const [username, setUsername] = useState("");
  function connect() {
    setUserID(username);
    socket.auth = { username, userID: username };
    socket.connect();
  }

  function disconnect() {
    localStorage.removeItem("sessionID");
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