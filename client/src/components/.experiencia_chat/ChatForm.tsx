import { useState } from 'react';

import { Box, useTheme } from '@mui/material';
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
    const theme = useTheme();
    const [input, setInput] = useState('');
    const [emojisOpen, setEmojisOpen] = useState(false);

    const handleEmojisOpen = () => setEmojisOpen(!emojisOpen);

    const handleEmojiSelect = (emoji) => {
        setInput(input + emoji.native);
    };

    const onSubmit = () => {
        onMessage(input);
        setInput('');

        // Close emoji picker on message
        if (emojisOpen) handleEmojisOpen();
    };

    const isValid = input.length > 0;

    return (
        <Box
            component="div"
            sx={{
                backgroundColor: theme.palette.primary.main,
                display: 'inline-flex',
                flexGrow: 1,
                width: { xs: '90%', sm: '60%', md: '40%' },
                height: { xs: '10%', sm: '10%', md: '10%' },
                position: 'fixed',
                bottom: '5%',
                right: '5%',
            }}>
            {emojisOpen && (
                // Fixed position flexible box
                <Box
                    component="div"
                    sx={{
                        display: 'inline-flex',
                        flexGrow: 1,
                        position: 'fixed',
                        bottom: { xs: '15%', sm: '14%', md: '13%' },
                        right: { xs: '5%', sm: '15%', md: '15%' },
                    }}>
                    <Picker
                        data={data}
                        onEmojiSelect={handleEmojiSelect}
                        theme={theme.palette.mode}
                    />
                </Box>
                // TODO: Handle On click outside (close emoji picker)
            )}

            <Box
                component="div"
                sx={{
                    display: 'inline',
                    backgroundColor: theme.palette.primary.main,
                    justifyContent: { xs: 'center', sm: 'space-between' },
                    width: 1 / 4,
                }}>
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
                maxRows={2}
                sx={{
                    flexGrow: 1,
                    backgroundColor: theme.palette.primary.main,
                    overflow: 'auto',
                }}
            />

            <Box
                component="div"
                sx={{
                    display: 'inline',
                    flexGrow: 1,
                    backgroundColor: theme.palette.primary.main,
                    width: 1 / 8,
                }}>
                <IconButton onClick={onSubmit} disabled={!isValid}>
                    <SendIcon />
                </IconButton>
            </Box>
        </Box>
    );
}
