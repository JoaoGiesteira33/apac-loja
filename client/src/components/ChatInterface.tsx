import { Box } from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


import { ConnectionState } from './ConnectionState';
import { Events } from './Events';
import { ConnectionManager } from './ConnectionManager';
import { reverse } from 'dns';


import { ChatAvatars } from './ChatAvatars';
import { ChatMessageSender, ChatMessageReciever } from './ChatMessage';
import { ChatInputBar } from './ChatInputBar';



export function ChatInterface() {

    return (

        <>

            {/* TODO: 'bottom' e 'right' hardcoded, problemas responsivos? */}

            <Box component="div" 
                sx={{ backgroundColor: "#1976d2", width: 2/5, p: 1, position: 'fixed', bottom: 446, right: 16 }}>
                
                <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    {/* TODO: Butao Close nao fecha; adicionar butao menu; adicionar avatares admins online */}
                    <CloseIcon />
                </IconButton>

            </Box>



            <Box component="div" 
                sx={{ flexGrow: 1, backgroundColor: "#ffffff", width: 2/5, maxHeight: 350, overflow: 'auto', position: 'fixed', bottom: 96, right: 16, p: 2 }}>
                    
                    <ChatMessageReciever />
                    <ChatMessageSender />
                    <ChatMessageSender />
                    <ChatMessageReciever />
                    <ChatMessageReciever />
                    <ChatMessageReciever />

            </Box>


            <Box component="div" 
                sx={{ flexGrow: 1, backgroundColor: "#ffffff", width: 2/5, position: 'fixed', bottom: 64, right: 16 }}>

                <ChatInputBar />

            </Box>

        </>
    );
}