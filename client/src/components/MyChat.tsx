import { Box } from '@mui/material';

import { ConnectionState } from './ConnectionState';
import { Events } from './Events';
import { ConnectionManager } from './ConnectionManager';
import { ChatAvatars } from './ChatAvatars';
import { Toast } from './Toast';
import { MyForm } from './MyForm';


export function MyChat() {

    return (

        <Box component="div" sx={{ 
            flexGrow: 1, 
            backgroundColor: "#f2f2f2",
            width: 1/4,
            height: 1/2,
            }}>

                <>
                    {/* <ConnectionState isConnected={ isConnected } /> */}
                    {/* <Events events={ chatMessages } /> */}
                    {/* <ConnectionManager /> */}
                    <ChatAvatars />
                    <Toast />
                    <MyForm />
                </>

        </Box>

    );
}