import { useState } from 'react';
import { socket } from '../socket';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

export function MyForm() {
  const [value, setValue] = useState('');

  function onSubmit(event : any) {
    event.preventDefault();

    socket.emit('chat message', value);
    socket.emit('message', value);
    setValue('');
  }

  return (
    <form onSubmit={ onSubmit }>
      <TextField sx={{margin: 2}} id="standard-basic" label="Chat" variant="standard" value={value} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setValue(event.target.value);}}/>

      <Button variant="contained" type="submit" >Submit</Button>
    </form>
  );
}