import { useState, useEffect } from 'react';
import {socket} from '../../socket';
import MessagePanel from './MessagePanel';
import { Button } from '@mui/material';
import { ConnectionManager } from './ConnectionManager';

interface User {
  userID: string;
  username: string;
  connected: boolean;
  self: boolean;
  messages: Message[];
  hasNewMessages: boolean;
}

interface Message {
  content: string;
  fromSelf: boolean;
    from?: string;
    to?: string;
}

function Chat({ userID }: { userID: string}) {
  const [selectedUser, setSelectedUser] = useState<User>({ userID: '', username: '', connected: false, self: false, messages: [], hasNewMessages: false });
  const [selected, setSelected] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const initReactiveProperties = (user: User) => {
    user.hasNewMessages = false;
  };

  const onMessage = (content: string) => {
    if (selected) {
      socket.emit('private message', {
        content,
        to: selectedUser.userID,
      });
      selectedUser.messages.push({
        content,
        fromSelf: true,
      });
      setUsers([...users]);
    }
  };

  const onSelectUser = (user: User) => {
    setSelectedUser(user);
    setSelected(true);
    user.hasNewMessages = false;
  };

  useEffect(() => {
    socket.on('connect', () => {
      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user.self) {
            user.connected = true;
          }
          return user;
        })
      );
    });

    socket.on('disconnect', () => {
      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user.self) {
            user.connected = false;
          }
          return user;
        })
      );
    });

    socket.on('users', (newUsers: User[]) => {
      const updatedUsers = newUsers.map((user) => {
        user.messages.forEach((message) => {
          message.fromSelf = message.from === userID;
        });
        const existingUserIndex = users.findIndex(
          (existingUser) => existingUser.userID === user.userID
        );
        if (existingUserIndex !== -1) {
          users[existingUserIndex] = { ...users[existingUserIndex], ...user };
          return users[existingUserIndex];
        } else {
          user.self = user.userID === userID;
          initReactiveProperties(user);
          return user;
        }
      });

      const sortedUsers = updatedUsers.slice().sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      });

      setUsers(sortedUsers);
    });

    socket.on('user connected', (user: User) => {
      const existingUserIndex = users.findIndex(
        (existingUser) => existingUser.userID === user.userID
      );
      if (existingUserIndex !== -1) {
        users[existingUserIndex].connected = true;
        setUsers([...users]);
      } else {
        initReactiveProperties(user);
        setUsers([...users, user]);
      }
    });

    socket.on('user disconnected', (id: string) => {
      const existingUserIndex = users.findIndex((user) => user.userID === id);
      if (existingUserIndex !== -1) {
        users[existingUserIndex].connected = false;
        setUsers([...users]);
      }
    });

    socket.on('private message', ({ content, from, to }: Message) => {
      users.forEach((user) => {
        const fromSelf = userID === from;
        if (user.userID === (fromSelf ? to : from)) {
          user.messages.push({
            content,
            fromSelf,
          });
          if (user !== selectedUser) {
            user.hasNewMessages = true;
          }
        }
      });
      setUsers([...users]);
    });

    return () => {
      // Cleanup socket event listeners when the component unmounts
      socket.off('connect');
      socket.off('disconnect');
      socket.off('users');
      socket.off('user connected');
      socket.off('user disconnected');
      socket.off('private message');
    };
  }, [selectedUser, users]);

return (
    <div>
        <div>
          <>---CHAT----</>
          <ConnectionManager />
            {users.map((user) => (
                <Button key={user.userID} onClick={() => onSelectUser(user)}>{user.username}</Button>
            ))}
        </div>
        {(selected ? <MessagePanel user={selectedUser} onMessage={onMessage} /> : <></>)}
    </div>
);
}

export default Chat;
