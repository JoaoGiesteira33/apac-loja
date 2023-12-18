import * as React from 'react';

import SpeedDial from '@mui/material/SpeedDial';
import CloseIcon from '@mui/icons-material/Close';
import ChatIcon from '@mui/icons-material/Chat';

import Chat from './experinecia_chat/Chat';


export function ChatWidget() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <>
      <SpeedDial
          ariaLabel="Icon fixo para chat"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          icon={open ? <CloseIcon /> : <ChatIcon />}
          onClick={handleOpen}
          open={open}
        >
      </SpeedDial>

      {open && <Chat />}
    </>
  );
}