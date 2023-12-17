import { Typography, Button } from '@mui/material';
import { TextField } from '@mui/material';
import React, { useState } from 'react';

import { IconButton } from '@mui/material';

import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

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

function MessagePanel({ user, onMessage }: MessagePanelProps) {
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

    const displaySender = (message: { fromSelf: boolean }, index: number) => {
        return (
            index === 0 ||
            user.messages[index - 1].fromSelf !== message.fromSelf
        );
    };

    const isValid = input.length > 0;

    return (
        <div>
            <ul className="messages">
                {user.messages.map((message, index) => (
                    <li key={index} className="message">
                        {displaySender(message, index) && (
                            <div className="sender">
                                <Typography
                                    sx={{
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        ml: 1,
                                    }}>
                                    {message.fromSelf
                                        ? '->  (yourself)'
                                        : '-> ' + user.username}
                                </Typography>
                            </div>
                        )}
                        <Typography sx={{ ml: 1 }}>
                            {message.date + ' :: ' + message.content}
                        </Typography>
                    </li>
                ))}
            </ul>

            <IconButton onClick={handleEmojisOpen}>
                <EmojiEmotionsIcon />
            </IconButton>

            {emojisOpen && (
                <Picker data={data} onEmojiSelect={handleEmojiSelect} />
            )}

            <TextField
                id="message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Your message..."
                multiline
            />
            <Button
                disabled={!isValid}
                variant="outlined"
                sx={{ ml: 0.5 }}
                onClick={onSubmit}>
                Send
            </Button>
        </div>
    );
}

export default MessagePanel;
