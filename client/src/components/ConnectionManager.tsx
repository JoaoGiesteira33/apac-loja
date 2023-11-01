import { socket } from '../socket';
import Button from '@mui/material/Button';

export function ConnectionManager() {
  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  return (
    <>
      <Button variant="contained" onClick={ connect } sx={{margin: 2}}>Connect</Button>
      <Button variant="outlined" onClick={ disconnect }>Disconnect</Button>
    </>
  );
}