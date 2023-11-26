import { TextField } from '@mui/material';
import { socket } from '../../socket';
import Button from '@mui/material/Button';

import { useState } from 'react';

export function ConnectionManager() {
  const [username, setUsername] = useState("");
  function connect() {
    socket.auth = { username };
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  return (
    <>
      <p>State: { '' + socket.connected }</p>
      
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

      <Button variant="outlined" onClick={ disconnect }>Disconnect</Button>
    </>
  );
}