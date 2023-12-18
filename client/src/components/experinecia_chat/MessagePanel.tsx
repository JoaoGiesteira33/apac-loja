import { Typography, Button } from '@mui/material';
import { TextField } from '@mui/material';
import { useState } from 'react';

import { IconButton } from '@mui/material';
import { ChatAvatar } from '../ChatAvatar';

import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ChatMessage } from '../ChatMessage';

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
                            <div className="flex flex-row text-left">
                                <ChatAvatar
                                    username={
                                        message.fromSelf ? 'Eu' : user.username
                                    }
                                />
                            </div>
                        )}

                        <div className="flex flex-row text-left">
                            <ChatMessage
                                username={
                                    message.fromSelf ? 'Eu' : user.username
                                }
                                text={message.content}
                                date={message.date}
                            />
                        </div>
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
