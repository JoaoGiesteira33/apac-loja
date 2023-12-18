import { useState } from 'react';

import { Box } from '@mui/material';
import { IconButton } from '@mui/material';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';

import { TextField } from '@mui/material';

interface MessagePanelProps {
    user: {
        username: string;
        connected: boolean;
        messages: Array<{
            content: string;
            fromSelf: boolean;
            date: string;
        }>;
    };
    onMessage: (content: string) => void;
}

export function ChatForm({ user, onMessage }: MessagePanelProps) {

  const [input, setInput] = useState('');
  const [emojisOpen, setEmojisOpen] = useState(false);

  const handleEmojisOpen = () => setEmojisOpen(!emojisOpen);

  const handleEmojiSelect = (emoji) => {
      setInput(input + emoji.native);
  };

  const onSubmit = () => {
      onMessage(input);
      setInput('');
  };

  const isValid = input.length > 0;


  return (
    <Box
        component="div"
        sx={{
            display: 'inline-flex',
            flexGrow: 1,
            backgroundColor: '#f6f6f6',
            width: 2 / 5,
            position: 'fixed',
            bottom: 64,
            right: 16,
        }}>

        <Box
            component="div"
            sx={{
                display: 'inline',
                backgroundColor: '#ffffff',
                width: 1 / 4,
            }}>

            {emojisOpen && (
                <Picker data={data} onEmojiSelect={handleEmojiSelect} />
            )}

            <IconButton>
                <AttachFileIcon />
            </IconButton>

            <IconButton onClick={handleEmojisOpen}>
                <EmojiEmotionsIcon />
            </IconButton>


        </Box>


        <TextField
            id="message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Aa"
            multiline
            fullWidth
        />


        <Box
            component="div"
            sx={{
                display: 'inline',
                flexGrow: 1,
                backgroundColor: '#ffffff',
                width: 1 / 8,
            }}>

            <IconButton onClick={onSubmit} disabled={!isValid}>
                <SendIcon />
            </IconButton>

        </Box>
    </Box>
  );
}




