import { useState } from 'react';
import Avatar from '@mui/material/Avatar';

export function ChatAvatar(data: { username: string }) {
    const isMe = data.username == 'Eu';

    const [avatarImage, setAvatarImage] = useState(
        isMe
            ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            : 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    );

    return <Avatar alt={data.username} src={avatarImage} />;
}
