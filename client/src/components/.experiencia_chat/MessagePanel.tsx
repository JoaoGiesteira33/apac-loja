import { ChatMessage } from './ChatMessage';

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
    const displaySender = (message: { fromSelf: boolean }, index: number) => {
        return (
            index === 0 ||
            user.messages[index - 1].fromSelf !== message.fromSelf
        );
    };

    return (
        <ul className="messages">
            {user.messages.map((message, index) => (
                <li key={index} className="message">
                    <ChatMessage
                        username={message.fromSelf ? 'Eu' : user.username}
                        text={message.content}
                        date={message.date}
                    />
                </li>
            ))}
        </ul>
    );
}

export default MessagePanel;
