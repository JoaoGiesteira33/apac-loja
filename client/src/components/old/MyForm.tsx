import { useState } from 'react';
import { socket } from '../socket';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

export function MyForm() {
  const [value, setValue] = useState('');
  const [counter, setCounter] = useState(0);
  function onSubmit(event : any) {
    event.preventDefault();

    if (value) {
      // compute a unique offset

      const clientOffset = `${socket.id}-${counter+1}`;
      socket.emit('chat message', value, clientOffset);
      setValue('');
      setCounter(counter+1);
    }
  }

  return (
    <form onSubmit={ onSubmit }>
      <TextField sx={{margin: 2}} id="standard-basic" label="Chat" variant="standard" value={value} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setValue(event.target.value);}}/>

      <Button variant="contained" type="submit" >Submit</Button>
    </form>
  );
}