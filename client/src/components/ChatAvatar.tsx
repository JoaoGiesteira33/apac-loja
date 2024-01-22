import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { checkLink } from '../fetchers';

export function ChatAvatar(data: {
    text: string;
    date: string;
    username: string;
}) {
    const isMe = data.username == 'Eu';
    const [bgColor, setBgColor] = useState(isMe ? 'bg-white' : 'bg-black');
    const [boxStyle, setBoxStyle] = useState(
        ''.concat(
            'max-w-xs p-1 m-1 text-gray-500 ',
            bgColor,
            ' rounded-lg shadow dark:bg-gray-800 dark:text-gray-400'
        )
    );

    const [avatarImage, setAvatarImage] = useState(
        isMe
            ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            : 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    );

    return (
        <Avatar alt={data.username} src={checkLink(avatarImage)} />
    );
}
