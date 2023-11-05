import React, { useState } from 'react';

interface MessagePanelProps {
  user: {
    username: string;
    connected: boolean;
    messages: Array<{
      content: string;
      fromSelf: boolean;
    }>;
  };
  onMessage: (content: string) => void;
}

function MessagePanel({ user, onMessage }: MessagePanelProps) {
  const [input, setInput] = useState('');

  const onSubmit = () => {
    onMessage(input);
    setInput('');
  };

  const displaySender = (message: { fromSelf: boolean }, index: number) => {
    return index === 0 || user.messages[index - 1].fromSelf !== message.fromSelf;
  };

  const isValid = input.length > 0;

  return (
    <div>
      <div className="header">
        {user.connected ? 'Connected' : 'Disconnected'}
      </div>

      <ul className="messages">
        {user.messages.map((message, index) => (
          <li key={index} className="message">
            {displaySender(message, index) && (
              <div className="sender">
                {message.fromSelf ? '(yourself)' : user.username}
              </div>
            )}
            {message.content}
          </li>
        ))}
      </ul>

      <form onSubmit={onSubmit} className="form">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Your message..."
          className="input"
        />
        <button disabled={!isValid} type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default MessagePanel;
