import { useState } from 'react';

export function ChatMessage(data: {
    text: string;
    date: string;
    username: string;
}) {
    const isMe = data.username == 'Eu';
    const [bgColor, setBgColor] = useState(isMe ? 'bg-white' : 'bg-amber-500');
    const [boxStyle, setBoxStyle] = useState(
        ''.concat(
            'max-w-xs p-1 m-1 text-gray-500 ',
            bgColor,
            ' rounded-lg shadow dark:bg-gray-800 dark:text-gray-400'
        )
    );
    return (
        <div
            className={
                isMe
                    ? 'flex flex-row-reverse text-right'
                    : 'flex flex-row text-left'
            }>
            <div id="toast-message-cta" className={boxStyle} role="alert">
                <div className="mx-3 text-sm font-normal">
                    <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                        {data.username}
                    </span>
                    <div className="mb-2 text-sm font-normal">{data.text}</div>
                    <div className="mb-2 text-sm font-normal">{data.date}</div>
                </div>
            </div>
        </div>
    );
}
