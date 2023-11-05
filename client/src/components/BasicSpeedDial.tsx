import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import Chat from '@mui/icons-material/Chat';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import { MyChat } from './MyChat';


export function BasicSpeedDial() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<Chat />}
          onClick={handleOpen}
          open={open}
        >
        </SpeedDial>
      </Box>

      {open && <MyChat />}
    </>
  );
}